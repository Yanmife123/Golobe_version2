-- Run this once in the Supabase SQL editor after database-schema.sql /
-- enable-rls.sql have already been applied.
--
-- Adds:
--   1. Owner-scoped RLS policies for profiles/bookings/flight_bookings/
--      hotel_bookings (enable-rls.sql intentionally left these with no
--      policies — "inaccessible until real auth-scoped policies are added").
--   2. A `payment_methods` table for saved cards. Only display data is
--      stored (brand, last4, expiry, holder name) — there is no column for
--      a full card number or CVC, and the app never sends them here.
--   3. A `create_flight_booking` RPC that atomically inserts one `bookings`
--      row + one `flight_bookings` row using auth.uid() (never a
--      client-supplied id), so a booking can't half-write.

-- =========================================================================
-- 1. Owner-scoped RLS policies
-- =========================================================================

create policy "Owner read" on profiles for select using (auth.uid() = id);
create policy "Owner update" on profiles for update using (auth.uid() = id);

create policy "Owner read" on bookings for select using (auth.uid() = user_id);
create policy "Owner insert" on bookings for insert with check (auth.uid() = user_id);

create policy "Owner read" on flight_bookings for select using (
  exists (
    select 1 from bookings b
    where b.id = flight_bookings.booking_id and b.user_id = auth.uid()
  )
);
create policy "Owner insert" on flight_bookings for insert with check (
  exists (
    select 1 from bookings b
    where b.id = flight_bookings.booking_id and b.user_id = auth.uid()
  )
);

create policy "Owner read" on hotel_bookings for select using (
  exists (
    select 1 from bookings b
    where b.id = hotel_bookings.booking_id and b.user_id = auth.uid()
  )
);
create policy "Owner insert" on hotel_bookings for insert with check (
  exists (
    select 1 from bookings b
    where b.id = hotel_bookings.booking_id and b.user_id = auth.uid()
  )
);

-- =========================================================================
-- 2. payment_methods — display data only, never the PAN or CVC
-- =========================================================================

create table payment_methods (
    id             uuid primary key default gen_random_uuid(),
    user_id        uuid not null references profiles(id) on delete cascade,
    brand          text not null,
    last4          char(4) not null,
    exp_month      smallint not null check (exp_month between 1 and 12),
    exp_year       smallint not null,
    holder_name    text not null,
    created_at     timestamptz not null default now()
);

create index idx_payment_methods_user on payment_methods (user_id);

alter table payment_methods enable row level security;

create policy "Owner read" on payment_methods for select using (auth.uid() = user_id);
create policy "Owner insert" on payment_methods for insert with check (auth.uid() = user_id);
create policy "Owner delete" on payment_methods for delete using (auth.uid() = user_id);

-- =========================================================================
-- 3. Atomic flight booking creation
-- =========================================================================

create or replace function create_flight_booking(
    p_flight_id           uuid,
    p_pay_plan            text,
    p_base_fare_cents     int,
    p_discount_cents      int,
    p_taxes_cents         int,
    p_service_fee_cents   int,
    p_total_cents         int,
    p_fare_class          text default 'Economy'
) returns table (
    id           uuid,
    booking_ref  text,
    seat         text,
    gate         text,
    created_at   timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
    v_booking_id uuid;
    v_ref        text;
    v_seat       text;
    v_gate       text;
    v_created_at timestamptz;
begin
    if auth.uid() is null then
        raise exception 'Not authenticated';
    end if;

    v_ref  := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 8));
    v_seat := (1 + floor(random() * 30))::int || chr(65 + floor(random() * 6)::int);
    v_gate := 'A' || (1 + floor(random() * 20))::int;

    insert into bookings (
        user_id, booking_type, status, booking_ref, pay_plan,
        base_fare_cents, discount_cents, taxes_cents, service_fee_cents, total_cents
    ) values (
        auth.uid(), 'flight', 'upcoming', v_ref, p_pay_plan,
        p_base_fare_cents, p_discount_cents, p_taxes_cents, p_service_fee_cents, p_total_cents
    )
    returning bookings.id, bookings.created_at into v_booking_id, v_created_at;

    insert into flight_bookings (booking_id, flight_id, fare_class, gate, seat)
    values (v_booking_id, p_flight_id, p_fare_class, v_gate, v_seat);

    return query select v_booking_id, v_ref, v_seat, v_gate, v_created_at;
end;
$$;

grant execute on function create_flight_booking(uuid, text, int, int, int, int, int, text) to authenticated;

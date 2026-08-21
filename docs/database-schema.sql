-- Golobe database schema (draft — see database-schema.md for rationale)
-- Postgres. Not wired to any ORM yet; review before implementing.

create extension if not exists pgcrypto; -- for gen_random_uuid()

-- =========================================================================
-- 1. Users & auth (Supabase Auth — Google/Facebook/Apple OAuth built in)
-- =========================================================================

create table profiles (
    id                  uuid primary key references auth.users(id) on delete cascade,
    name                text,
    phone               text,
    address             text,
    date_of_birth       date,
    profile_image_url   text,
    cover_image_url     text,
    created_at          timestamptz not null default now(),
    updated_at          timestamptz not null default now()
);

-- Auto-create a profile row whenever a new Supabase auth user signs up.
create function handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id) values (new.id);
    return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure handle_new_user();

-- No user_emails / accounts / sessions / verification_tokens tables —
-- auth.users + auth.identities (multi-provider linking) already cover this.

-- =========================================================================
-- 2. Flights
-- =========================================================================

create table airlines (
    id              uuid primary key default gen_random_uuid(),
    name            text not null unique,
    brand_color     text not null
);

create table airports (
    code        char(3) primary key,
    city        text not null,
    country     text not null
);

create table flights (
    id                      uuid primary key default gen_random_uuid(),
    airline_id              uuid not null references airlines(id) on delete restrict,
    aircraft                text not null,
    from_airport            char(3) not null references airports(code),
    to_airport               char(3) not null references airports(code),
    base_price_cents        int not null,
    original_price_cents    int not null,
    rating                  numeric(2,1) not null default 0,
    rating_label            text,
    review_count            int not null default 0,
    hero_image_url          text,
    created_at              timestamptz not null default now()
);

create table flight_segments (
    id                  uuid primary key default gen_random_uuid(),
    flight_id           uuid not null references flights(id) on delete cascade,
    label               text not null check (label in ('Depart', 'Return')),
    segment_date        date not null,
    duration_minutes    int not null,
    aircraft            text not null,
    depart_time         time not null,
    depart_airport      char(3) not null references airports(code),
    arrive_time         time not null,
    arrive_airport      char(3) not null references airports(code)
);

create table flight_gallery (
    id          uuid primary key default gen_random_uuid(),
    flight_id   uuid not null references flights(id) on delete cascade,
    image_url   text not null,
    sort_order  int not null default 0
);

create table flight_policies (
    id          uuid primary key default gen_random_uuid(),
    flight_id   uuid not null references flights(id) on delete cascade,
    body        text not null,
    sort_order  int not null default 0
);

-- =========================================================================
-- 3. Hotels
-- =========================================================================

create table hotels (
    id                          uuid primary key default gen_random_uuid(),
    name                        text not null,
    category                    text not null check (category in ('Hotels', 'Motels', 'Resorts')),
    star_rating                 smallint not null check (star_rating between 1 and 5),
    address                     text not null,
    city                        text not null,
    country                     text not null,
    price_per_night_cents       int not null,
    rating                      numeric(2,1) not null default 0,
    rating_label                text,
    review_count                int not null default 0,
    overview                    text,
    created_at                  timestamptz not null default now()
);

create table hotel_images (
    id          uuid primary key default gen_random_uuid(),
    hotel_id    uuid not null references hotels(id) on delete cascade,
    image_url   text not null,
    sort_order  int not null default 0
);

create table hotel_highlights (
    id          uuid primary key default gen_random_uuid(),
    hotel_id    uuid not null references hotels(id) on delete cascade,
    label       text not null,
    sort_order  int not null default 0
);

create table hotel_rooms (
    id                      uuid primary key default gen_random_uuid(),
    hotel_id                uuid not null references hotels(id) on delete cascade,
    name                    text not null,
    image_url               text,
    price_per_night_cents   int not null
);

create table hotel_reviews (
    id              uuid primary key default gen_random_uuid(),
    hotel_id        uuid not null references hotels(id) on delete cascade,
    user_id         uuid references profiles(id) on delete set null,
    reviewer_name   text not null,
    avatar_url      text,
    score           numeric(2,1) not null,
    score_label     text,
    body            text not null,
    created_at      timestamptz not null default now()
);

create table features (
    id          uuid primary key default gen_random_uuid(),
    name        text not null unique,
    category    text not null check (category in ('amenity', 'freebie'))
);

create table hotel_features (
    hotel_id    uuid not null references hotels(id) on delete cascade,
    feature_id  uuid not null references features(id) on delete cascade,
    primary key (hotel_id, feature_id)
);

-- =========================================================================
-- 4. Bookings
-- =========================================================================

create table bookings (
    id                      uuid primary key default gen_random_uuid(),
    user_id                 uuid not null references profiles(id) on delete cascade,
    booking_type            text not null check (booking_type in ('flight', 'hotel')),
    status                  text not null default 'upcoming' check (status in ('upcoming', 'past', 'cancelled')),
    booking_ref             text not null unique,
    pay_plan                text not null check (pay_plan in ('full', 'partial')),
    base_fare_cents         int not null,
    discount_cents          int not null default 0,
    taxes_cents             int not null default 0,
    service_fee_cents       int not null default 0,
    total_cents             int not null,
    created_at              timestamptz not null default now()
);

create table flight_bookings (
    booking_id  uuid primary key references bookings(id) on delete cascade,
    flight_id   uuid not null references flights(id) on delete restrict,
    fare_class  text not null check (fare_class in ('Economy', 'Business', 'First Class')),
    gate        text,
    seat        text
);

create table hotel_bookings (
    booking_id      uuid primary key references bookings(id) on delete cascade,
    hotel_id        uuid not null references hotels(id) on delete restrict,
    room_id         uuid not null references hotel_rooms(id) on delete restrict,
    check_in        date not null,
    check_out       date not null,
    rooms_count     smallint not null default 1,
    guests_count    smallint not null default 1,
    check (check_out > check_in)
);

-- =========================================================================
-- Helpful indexes
-- =========================================================================

create index idx_flights_route on flights (from_airport, to_airport);
create index idx_hotels_city on hotels (city, category);
create index idx_bookings_user on bookings (user_id, status);
create index idx_hotel_reviews_hotel on hotel_reviews (hotel_id);

-- =========================================================================
-- Row Level Security
-- =========================================================================
-- Flight/hotel catalog data is public (no login needed to browse results),
-- so it gets an open "anyone can read" policy. profiles/bookings/
-- flight_bookings/hotel_bookings get RLS enabled with NO policies for now —
-- they're inaccessible until real auth-scoped policies are added later.

alter table profiles enable row level security;
alter table airlines enable row level security;
alter table airports enable row level security;
alter table flights enable row level security;
alter table flight_segments enable row level security;
alter table flight_gallery enable row level security;
alter table flight_policies enable row level security;
alter table hotels enable row level security;
alter table hotel_images enable row level security;
alter table hotel_highlights enable row level security;
alter table hotel_rooms enable row level security;
alter table hotel_reviews enable row level security;
alter table features enable row level security;
alter table hotel_features enable row level security;
alter table bookings enable row level security;
alter table flight_bookings enable row level security;
alter table hotel_bookings enable row level security;

create policy "Public read access" on airlines for select using (true);
create policy "Public read access" on airports for select using (true);
create policy "Public read access" on flights for select using (true);
create policy "Public read access" on flight_segments for select using (true);
create policy "Public read access" on flight_gallery for select using (true);
create policy "Public read access" on flight_policies for select using (true);
create policy "Public read access" on hotels for select using (true);
create policy "Public read access" on hotel_images for select using (true);
create policy "Public read access" on hotel_highlights for select using (true);
create policy "Public read access" on hotel_rooms for select using (true);
create policy "Public read access" on hotel_reviews for select using (true);
create policy "Public read access" on features for select using (true);
create policy "Public read access" on hotel_features for select using (true);

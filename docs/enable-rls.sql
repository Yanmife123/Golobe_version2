-- Run this once against an existing database that was set up with an older
-- version of database-schema.sql (before RLS policies were added to it).
-- Safe to run standalone — matches the RLS block at the bottom of
-- database-schema.sql exactly.

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

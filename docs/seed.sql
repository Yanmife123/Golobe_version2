-- Golobe seed data — flights & hotels only.
-- Run AFTER database-schema.sql. Safe to re-run: truncates its own tables first.
--
-- Deliberately does NOT touch: profiles, bookings, flight_bookings,
-- hotel_bookings — those all need a real auth.users row and get created
-- through the app, not seeded.

truncate table
    flight_gallery, flight_policies, flight_segments, flights,
    airlines, airports,
    hotel_features, features, hotel_reviews, hotel_rooms,
    hotel_highlights, hotel_images, hotels
restart identity cascade;

-- =========================================================================
-- Source pools (Cloudinary, from docs/pics)
-- =========================================================================

create temporary table _plane_pics (url text) on commit drop;
insert into _plane_pics (url) values
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787347922/1845136_1785728163_ndxebp.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787347921/pexels-tarik-sami-2136439315-37501019_hwmhp6.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787347921/pexels-oktay-koseoglu-42034955-37644602_hfd71h.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787347920/tobiasrehbein-airplane-4974678_1920_ukffxl.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787347920/612897_1785732200_hv17r4.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787347919/john-mcarthur-8KLLgqHMAv4-unsplash_nxda1r.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787347916/1968326_9bab6ffff6_280_uemw55.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787348322/oskar-kadaksoo-DDBDkz0p918-unsplash_rskfme.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787348322/pascal-meier-UYiesSO4FiM-unsplash_tdct0x.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787348320/ivan-shimko-tCp2K2sYpFg-unsplash_ym5uq5.jpg');

create temporary table _hotel_pics (url text) on commit drop;
insert into _hotel_pics (url) values
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787348504/sreesanth-p-NHVI1dkl6WU-unsplash_ajvi2c.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787348503/yuliya-pankevich-oyxsG2Lh_uA-unsplash_iujmmq.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787348499/sasha-kaunas-TAgGZWz6Qg8-unsplash_bgkyhy.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787348498/valeriia-bugaiova-_pPHgeHz1uk-unsplash_hboqod.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787348495/vojtech-bruzek-Yrxr3bsPdS0-unsplash_hxu18j.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787348494/point3d-commercial-imaging-ltd-oxeCZrodz78-unsplash_m1skgx.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787348494/toa-heftiba-bnoPZ9aTyWQ-unsplash_t6bctd.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787348485/sasha-kaunas-67-sOi7mVIk-unsplash_hxoa2f.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787348477/roberto-nickson-emqnSQwQQDo-unsplash_hn4jpf.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787348478/ciudad-maderas-MXbM1NrRqtI-unsplash_gn6yas.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787348471/manuel-moreno-DGa0LQ0yDPc-unsplash_s3bwnx.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787348470/louis-hansel-wVoP_Q2Bg_A-unsplash_bpmvns.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787348469/rhema-kallianpur-uocSnWMhnAs-unsplash_gvdaag.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787348462/marcus-loke-WQJvWU_HZFo-unsplash_dnl6uo.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787348461/fernando-alvarez-rodriguez-M7GddPqJowg-unsplash_yu1rwf.jpg'),
    ('https://res.cloudinary.com/duyhha3mz/image/upload/v1787348450/francesca-saraco-_dS27XGgRyQ-unsplash_k7qc0k.jpg');

-- =========================================================================
-- Airlines & airports (reference data — fixed, not randomized)
-- =========================================================================

insert into airlines (name, brand_color)
values
    ('Emirates',        '#D71921'),
    ('Flydubai',        '#0072CE'),
    ('Qatar Airways',   '#5C0632'),
    ('Etihad',          '#BE8B3E'),
    ('Turkish Airlines','#C70A0C'),
    ('British Airways', '#075AAA'),
    ('Delta',           '#003366'),
    ('Lufthansa',       '#05164D'),
    ('Singapore Airlines','#F99F1C'),
    ('American Airlines','#0078D2');

insert into airports (code, city, country)
values
    ('EWR', 'Newark',    'United States'),
    ('BNA', 'Nashville', 'United States'),
    ('JFK', 'New York',  'United States'),
    ('LAX', 'Los Angeles','United States'),
    ('IST', 'Istanbul',  'Turkey'),
    ('AYT', 'Antalya',   'Turkey'),
    ('LHR', 'London',    'United Kingdom'),
    ('CDG', 'Paris',     'France'),
    ('FRA', 'Frankfurt', 'Germany'),
    ('DXB', 'Dubai',     'United Arab Emirates'),
    ('DOH', 'Doha',      'Qatar'),
    ('SIN', 'Singapore', 'Singapore');

-- =========================================================================
-- Flights — 3 per airline, random route/aircraft/price/rating/hero image
-- =========================================================================

with aircraft_pool (aircraft) as (
    values ('A380 Airbus'), ('Boeing 787 Dreamliner'), ('Airbus A350'),
           ('Boeing 777'), ('Airbus A320'), ('Boeing 737 MAX')
),
routes as (
    select
        a.id as airline_id,
        gs as seq,
        (select code from airports order by random() limit 1) as from_airport,
        (select aircraft from aircraft_pool order by random() limit 1) as aircraft,
        (select url from _plane_pics order by random() limit 1) as hero_image_url,
        (200 + floor(random() * 900))::int as base_price_cents_hundreds,
        round((3.5 + random() * 1.5)::numeric, 1) as rating,
        (20 + floor(random() * 480))::int as review_count
    from airlines a
    cross join generate_series(1, 3) as gs
),
routes_with_dest as (
    select
        r.*,
        (select code from airports where code <> r.from_airport order by random() limit 1) as to_airport
    from routes r
),
inserted_flights as (
    insert into flights (airline_id, aircraft, from_airport, to_airport, base_price_cents, original_price_cents, rating, rating_label, review_count, hero_image_url)
    select
        airline_id,
        aircraft,
        from_airport,
        to_airport,
        base_price_cents_hundreds * 100,
        round(base_price_cents_hundreds * 100 * (1 + random() * 0.35))::int,
        rating,
        case
            when rating >= 4.5 then 'Excellent'
            when rating >= 4.0 then 'Very Good'
            when rating >= 3.5 then 'Good'
            else 'Fair'
        end,
        review_count,
        hero_image_url
    from routes_with_dest
    returning id, aircraft, base_price_cents
)
select count(*) as flights_inserted from inserted_flights;

-- Depart + Return segment per flight
insert into flight_segments (flight_id, label, segment_date, duration_minutes, aircraft, depart_time, depart_airport, arrive_time, arrive_airport)
select
    f.id,
    seg.label,
    (current_date + (floor(random() * 60) || ' days')::interval)::date,
    dur,
    f.aircraft,
    dep_time,
    case seg.label when 'Depart' then f.from_airport else f.to_airport end,
    (dep_time + (dur || ' minutes')::interval)::time,
    case seg.label when 'Depart' then f.to_airport else f.from_airport end
from flights f
cross join (values ('Depart'), ('Return')) as seg(label)
cross join lateral (
    select
        (90 + floor(random() * 600))::int as dur,
        (time '05:00' + (floor(random() * 17) || ' hours')::interval + (floor(random() * 60) || ' minutes')::interval) as dep_time
) as gen;

-- 4 random gallery images per flight
insert into flight_gallery (flight_id, image_url, sort_order)
select f.id, p.url, p.rn - 1
from flights f
cross join lateral (
    select url, row_number() over () as rn
    from (select url from _plane_pics order by random() limit 4) as x
) as p;

-- 2 fixed policy bullets per flight
insert into flight_policies (flight_id, body, sort_order)
select f.id, body, ord - 1
from flights f
cross join (values
    (1, 'Pre-flight cleaning, installation of cabin HEPA filters.'),
    (2, 'Pre-flight health screening questions.')
) as pol(ord, body);

-- =========================================================================
-- Hotels — named list (from existing mock data) + randomized stats/images
-- =========================================================================

with hotel_seed (name, category, address, city, country) as (
    values
        ('CVK Park Bosphorus Hotel Istanbul', 'Hotels',  'Gümüşsuyu Mah. İnönü Cad. No:8, Istanbul 34437', 'Istanbul', 'Turkey'),
        ('Eresin Hotels Sultanahmet - Boutique Class', 'Hotels', 'Kucukayasofya No. 40 Sultanahmet, Istanbul 34022', 'Istanbul', 'Turkey'),
        ('Golobe Grand Resort & Spa', 'Resorts', 'Belek Turizm Merkezi, Antalya 07506', 'Antalya', 'Turkey'),
        ('Golobe Roadside Motel', 'Motels', 'Route 66, Nashville, TN 37201', 'Nashville', 'United States'),
        ('Blue Lagoon Beach Resort', 'Resorts', 'Coral Bay Road, Nashville, TN 37201', 'Nashville', 'United States'),
        ('Seraphine Paris Champs-Élysées', 'Hotels', '15 Rue de Berri, Paris 75008', 'Paris', 'France'),
        ('The Dorchester Collection Suites', 'Hotels', 'Park Lane, London W1K 1QA', 'London', 'United Kingdom'),
        ('Frankfurt Riverside Inn', 'Motels', 'Mainkai 12, Frankfurt 60311', 'Frankfurt', 'Germany'),
        ('Palm Jumeirah Beachfront Resort', 'Resorts', 'Crescent Road, Dubai', 'Dubai', 'United Arab Emirates'),
        ('Doha Corniche Grand Hotel', 'Hotels', 'Corniche Street, Doha', 'Doha', 'Qatar'),
        ('Marina Bay Skyline Hotel', 'Hotels', '10 Bayfront Ave, Singapore 018956', 'Singapore', 'Singapore'),
        ('Sunset Cove Motel', 'Motels', '4 Ocean Drive, Los Angeles, CA 90291', 'Los Angeles', 'United States')
),
inserted_hotels as (
    insert into hotels (name, category, star_rating, address, city, country, price_per_night_cents, rating, rating_label, review_count, overview)
    select
        h.name,
        h.category,
        (3 + floor(random() * 3))::int,
        h.address,
        h.city,
        h.country,
        (60 + floor(random() * 300)) * 100,
        round((3.5 + random() * 1.5)::numeric, 1),
        (array['Good', 'Very Good', 'Excellent', 'Amazing'])[1 + floor(random() * 4)],
        (20 + floor(random() * 480))::int,
        'A well-appointed stay in ' || h.city || ', ' || h.country || ' with easy access to local attractions and modern amenities throughout.'
    from hotel_seed h
    returning id, city
)
select count(*) as hotels_inserted from inserted_hotels;

-- 5 random gallery images per hotel
insert into hotel_images (hotel_id, image_url, sort_order)
select h.id, p.url, p.rn - 1
from hotels h
cross join lateral (
    select url, row_number() over () as rn
    from (select url from _hotel_pics order by random() limit 5) as x
) as p;

-- highlights (one randomly chosen set per hotel)
insert into hotel_highlights (hotel_id, label, sort_order)
select h.id, label, ord - 1
from hotels h
cross join lateral (
    select unnest(labels) as label, generate_subscripts(labels, 1) as ord
    from (
        select labels
        from (values
            (array['Near park', 'Near nightlife', 'Near theater', 'Clean Hotel']),
            (array['Near beach', 'Great breakfast', 'Family friendly', 'Clean Hotel']),
            (array['Near airport', 'Quiet area', 'Great views', 'Clean Hotel'])
        ) as sets(labels)
        order by random() limit 1
    ) as chosen
) as expanded;

-- 4 rooms per hotel, priced off the hotel's base price
insert into hotel_rooms (hotel_id, name, image_url, price_per_night_cents)
select h.id, room.name, img.image_url, h.price_per_night_cents + room.bump
from hotels h
cross join lateral (
    select image_url from hotel_images where hotel_id = h.id order by random() limit 1
) as img
cross join (values
    ('Superior room - 1 double bed or 2 twin beds', 0),
    ('Superior room - City view - 1 double bed or 2 twin beds', 4000),
    ('Deluxe room - City view - 1 double bed or 2 twin beds', 8000),
    ('Deluxe suite - City view - 1 king bed', 11000)
) as room(name, bump);

-- 6-14 reviews per hotel, no user_id (seeded, not tied to a real account)
insert into hotel_reviews (hotel_id, reviewer_name, avatar_url, score, score_label, body)
select
    h.id,
    review.reviewer_name,
    review.avatar,
    5.0,
    'Amazing',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
from hotels h
cross join lateral (
    select
        (array['Omar Siphron', 'Cristofer Ekstrom Bothman', 'Kaiya Lubin', 'Erin Septimus',
               'Terry George', 'Alina Novak', 'Marcus Bell', 'Priya Anand'])[1 + floor(random() * 8)] as reviewer_name,
        (select url from _hotel_pics order by random() limit 1) as avatar,
        generate_series(1, 6 + floor(random() * 9)::int)
) as review(reviewer_name, avatar, gs);

-- Amenities / freebies lookup + random assignment per hotel
insert into features (name, category)
values
    ('Outdoor pool', 'amenity'),
    ('Indoor pool', 'amenity'),
    ('Spa and wellness center', 'amenity'),
    ('Restaurant', 'amenity'),
    ('Room service', 'amenity'),
    ('Fitness center', 'amenity'),
    ('Bar/Lounge', 'amenity'),
    ('Free Wi-Fi', 'amenity'),
    ('Tea/coffee machine', 'amenity'),
    ('24hr front desk', 'amenity'),
    ('Air-conditioned', 'amenity'),
    ('Laundry service', 'amenity'),
    ('Non-smoking rooms', 'amenity'),
    ('Airport shuttle', 'amenity'),
    ('Business center', 'amenity'),
    ('Concierge', 'amenity'),
    ('Free breakfast', 'freebie'),
    ('Free parking', 'freebie'),
    ('Free internet', 'freebie'),
    ('Free cancellation', 'freebie'),
    ('Free airport shuttle', 'freebie');

insert into hotel_features (hotel_id, feature_id)
select h.id, f.id
from hotels h
cross join lateral (
    select id from features where category = 'amenity' order by random() limit 8
) as f
union
select h.id, f.id
from hotels h
cross join lateral (
    select id from features where category = 'freebie' order by random() limit 3
) as f;

# Golobe — Database Schema (draft for review)

This reflects the data models the app already has (flight results/detail, hotel
results/detail, booking flow, profile/account, tickets & bookings history) and
turns the mock data in `src/static-data/*` into a real relational schema.

Nothing here is wired up yet — this is the proposal to review before I touch
any code or add an ORM. Companion DDL: [`database-schema.sql`](./database-schema.sql).

**Conventions**

- Postgres, `uuid` primary keys (`gen_random_uuid()`), `timestamptz` for all timestamps.
- Money stored as integer **cents** (`price_cents`), not floats — the UI can keep
  showing dollars, conversion happens at the edge.
- `snake_case` columns, plural table names.

---

## 1. Users & auth

**Using Supabase Auth** (not NextAuth) — Google, Facebook, and Apple OAuth are
all built-in providers, and `@supabase/ssr` handles session cookies + access/
refresh token rotation automatically. Supabase owns its own `auth.users` and
`auth.identities` (multi-provider linking) tables internally, so we don't
model auth at all — we only keep an app-specific profile table.

### `profiles`

One row per Supabase auth user. Matches the Account tab (`accountSection.tsx`).

| column                  | type        | notes                                                           |
| ----------------------- | ----------- | --------------------------------------------------------------- |
| id                      | uuid PK     | same value as `auth.users.id` (FK, not independently generated) |
| name                    | text        |                                                                 |
| phone                   | text        |                                                                 |
| address                 | text        | free-form, matches current UI (not split into fields)           |
| date_of_birth           | date        |                                                                 |
| profile_image_url       | text        |                                                                 |
| cover_image_url         | text        |                                                                 |
| created_at / updated_at | timestamptz |                                                                 |

No `email` or `password_hash` column — email lives on `auth.users` (Supabase
manages it, including verification). A `handle_new_user` trigger on
`auth.users` inserts the matching `profiles` row on signup.

No `user_emails` table — `auth.identities` already links multiple OAuth
providers (and Supabase's email-change flow) to one account.

---

## 2. Flights

### `airlines`

Normalizes the `airline` + `brandColor` repeated on every `FlightDeal`. No
`logo_url` — the app renders a text wordmark, never an image. Rating lives on
`flights`, not here: the mock data has the same airline (Emirates) at
different ratings across different deals, so rating is per-flight.

| column      | type        | notes                       |
| ----------- | ----------- | ---------------------------- |
| id          | uuid PK     |                              |
| name        | text unique | "Emirates", "Flydubai", ...  |
| brand_color | text        | hex, drives `AirlineLogo`    |

### `airports`

| column  | type       | notes                 |
| ------- | ---------- | --------------------- |
| code    | char(3) PK | IATA code, e.g. "EWR" |
| city    | text       |                       |
| country | text       |                       |

### `flights`

One bookable fare (what `FlightDetail` represents today).

| column               | type                       | notes                                                                                       |
| -------------------- | -------------------------- | ------------------------------------------------------------------------------------------- |
| id                   | uuid PK                    |                                                                                             |
| airline_id           | uuid FK → airlines.id      |                                                                                             |
| aircraft             | text                       | "A380 Airbus"                                                                               |
| from_airport         | char(3) FK → airports.code |                                                                                             |
| to_airport           | char(3) FK → airports.code |                                                                                             |
| base_price_cents     | int                        | Economy baseline; other classes computed at booking time (see `flight_bookings.fare_class`) |
| original_price_cents | int                        | strike-through price                                                                        |
| rating                | numeric(2,1)               | per-flight, not per-airline (see `airlines` note above)                                     |
| rating_label          | text                       | "Very Good", "Excellent", ...                                                               |
| review_count          | int                        |                                                                                              |
| hero_image_url       | text                       |                                                                                             |
| created_at           | timestamptz                |                                                                                             |

### `flight_segments`

Each `flights` row has a Depart + Return segment today.

| column           | type                       | notes                              |
| ---------------- | -------------------------- | ---------------------------------- |
| id               | uuid PK                    |                                    |
| flight_id        | uuid FK → flights.id       |                                    |
| label            | text                       | "Depart" / "Return"                |
| segment_date     | date                       |                                    |
| duration_minutes | int                        |                                    |
| aircraft         | text                       |                                    |
| depart_time      | time                       |                                    |
| depart_airport   | char(3) FK → airports.code |                                    |
| arrive_time      | time                       |                                    |
| arrive_airport   | char(3) FK → airports.code |                                    |

### `flight_gallery`

| column     | type                 | notes |
| ---------- | -------------------- | ----- |
| id         | uuid PK              |       |
| flight_id  | uuid FK → flights.id |       |
| image_url  | text                 |       |
| sort_order | int                  |       |

### `flight_policies`

| column     | type                 | notes              |
| ---------- | -------------------- | ------------------ |
| id         | uuid PK              |                    |
| flight_id  | uuid FK → flights.id |                    |
| body       | text                 | one bullet per row |
| sort_order | int                  |                    |

---

## 3. Hotels

### `hotels`

Matches `Hotel` in `hotelData.ts`.

| column                | type                                        | notes                                                 |
| --------------------- | ------------------------------------------- | ----------------------------------------------------- |
| id                    | uuid PK                                     |                                                       |
| name                  | text                                        |                                                       |
| category              | text check in ('Hotels','Motels','Resorts') |                                                       |
| star_rating           | smallint                                    |                                                       |
| address               | text                                        |                                                       |
| city                  | text                                        |                                                       |
| country               | text                                        |                                                       |
| price_per_night_cents | int                                         | cheapest room; source of truth is still `hotel_rooms` |
| rating                | numeric(2,1)                                |                                                       |
| rating_label          | text                                        |                                                       |
| review_count          | int                                         | denormalized, kept in sync from `hotel_reviews`       |
| overview              | text                                        |                                                       |
| created_at            | timestamptz                                 |                                                       |

### `hotel_images`

| column     | type                | notes |
| ---------- | ------------------- | ----- |
| id         | uuid PK             |       |
| hotel_id   | uuid FK → hotels.id |       |
| image_url  | text                |       |
| sort_order | int                 |       |

### `hotel_highlights`

The "Near park / Near nightlife / Clean Hotel" badges.

| column     | type                | notes |
| ---------- | ------------------- | ----- |
| id         | uuid PK             |       |
| hotel_id   | uuid FK → hotels.id |       |
| label      | text                |       |
| sort_order | int                 |       |

### `hotel_rooms`

| column                | type                | notes                             |
| --------------------- | ------------------- | --------------------------------- |
| id                    | uuid PK             |                                   |
| hotel_id              | uuid FK → hotels.id |                                   |
| name                  | text                | "Superior room - City view - ..." |
| image_url             | text                |                                   |
| price_per_night_cents | int                 |                                   |

### `hotel_reviews`

| column        | type                            | notes                                                            |
| ------------- | ------------------------------- | ---------------------------------------------------------------- |
| id            | uuid PK                         |                                                                  |
| hotel_id      | uuid FK → hotels.id             |                                                                  |
| user_id       | uuid FK → profiles.id, nullable | null for seeded/mock reviews                                     |
| reviewer_name | text                            | denormalized so a review still reads fine if the user is deleted |
| avatar_url    | text                            |                                                                  |
| score         | numeric(2,1)                    |                                                                  |
| score_label   | text                            | "Amazing"                                                        |
| body          | text                            |                                                                  |
| created_at    | timestamptz                     |                                                                  |

### `features` (shared amenities/freebies lookup)

Both the hotel filter sidebar ("Free breakfast", "Outdoor pool", ...) and the
detail page's amenities grid draw from the same concept, so one lookup table
backs both instead of two near-duplicate enums.

No `icon` column — `amenitiesGrid.tsx` maps icons by amenity name in a
hardcoded client-side lookup, it never reads an icon key from data.

| column   | type                                | notes                                  |
| -------- | ----------------------------------- | --------------------------------------- |
| id       | uuid PK                             |                                         |
| name     | text unique                         | "Outdoor pool", "Free breakfast", ...   |
| category | text check in ('amenity','freebie') |                                         |

### `hotel_features` (join)

| column     | type                  |
| ---------- | --------------------- |
| hotel_id   | uuid FK → hotels.id   |
| feature_id | uuid FK → features.id |

PK: `(hotel_id, feature_id)`

---

## 4. Bookings

One `bookings` parent row per checkout (covers the login → payment-plan →
card → confirmation flow that's identical for flights and hotels), with a
type-specific child table for the details unique to each.

### `bookings`

| column            | type                                          | notes                                                         |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------- |
| id                | uuid PK                                       |                                                               |
| user_id           | uuid FK → profiles.id                         |                                                               |
| booking_type      | text check in ('flight','hotel')              |                                                               |
| status            | text check in ('upcoming','past','cancelled') | default 'upcoming', drives the profile History filter         |
| booking_ref       | text unique                                   | shown as "Boarding Pass N°..." / "Booking Confirmation N°..." |
| pay_plan          | text check in ('full','partial')              | from `PaymentPlanSelector`                                    |
| base_fare_cents   | int                                           |                                                               |
| discount_cents    | int                                           |                                                               |
| taxes_cents       | int                                           |                                                               |
| service_fee_cents | int                                           |                                                               |
| total_cents       | int                                           |                                                               |
| created_at        | timestamptz                                   |                                                               |

### `flight_bookings`

| column     | type                                               | notes |
| ---------- | -------------------------------------------------- | ----- |
| booking_id | uuid PK FK → bookings.id                           |       |
| flight_id  | uuid FK → flights.id                               |       |
| fare_class | text check in ('Economy','Business','First Class') |       |
| gate       | text                                               |       |
| seat       | text                                               |       |

### `hotel_bookings`

| column       | type                     | notes     |
| ------------ | ------------------------ | --------- |
| booking_id   | uuid PK FK → bookings.id |           |
| hotel_id     | uuid FK → hotels.id      |           |
| room_id      | uuid FK → hotel_rooms.id |           |
| check_in     | date                     |           |
| check_out    | date                     |           |
| rooms_count  | smallint                 | default 1 |
| guests_count | smallint                 | default 1 |

---

No `favorite_flights` / `favorite_hotels` tables — the heart icon on flight
and hotel cards (`flightList.tsx`, `hostelList.tsx`) is currently just local
`useState(false)`, not wired to any persistence. Add these back if/when
favoriting actually gets built.

## Open questions before I implement this

1. **ORM** — Prisma or Drizzle? (Neither is in `package.json` yet.) Drizzle plays
   a bit more naturally with the existing `next-auth` v4 setup if we stay on it.
2. **DB host** — Postgres somewhere specific (Neon/Supabase/RDS/local), or should
   I default to a local Postgres + Docker Compose for dev?
3. **Rooms/dates in search** — right now the results/booking pages use fixed
   mock dates ("Fri 12/2" etc.). Real availability would need a
   `room_availability` or inventory table (per room, per date) — I left that out
   since nothing in the UI depends on it yet, but flag if you want it now vs. later.
4. **Reviews auth** — should only users with a completed `hotel_bookings` row for
   that hotel be allowed to review it (verified-review pattern), or open to anyone?

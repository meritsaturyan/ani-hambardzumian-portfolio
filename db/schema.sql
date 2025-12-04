DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS pavilions;

CREATE TABLE pavilions (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price_per_hour NUMERIC(10, 2) NOT NULL,
  area_sqm NUMERIC(10, 2),
  ceiling_height NUMERIC(10, 2),
  capacity INTEGER,
  location TEXT,
  features TEXT,
  main_image_url TEXT,
  gallery_image_urls TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  pavilion_id INTEGER NOT NULL REFERENCES pavilions(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  notes TEXT,
  extras TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bookings_pavilion_date
  ON bookings (pavilion_id, date);

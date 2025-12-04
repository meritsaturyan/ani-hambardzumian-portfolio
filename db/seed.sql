INSERT INTO pavilions (
  slug,
  name,
  description,
  price_per_hour,
  area_sqm,
  ceiling_height,
  capacity,
  location,
  features,
  main_image_url,
  gallery_image_urls
) VALUES
(
  'studio-1-khorenatsi',
  'Studio 1 — Khorenatsi',
  'Bright, versatile pavilion perfect for fashion, portrait and commercial shoots. Clean walls, large windows and neutral color palette.',
  20000.00,
  120.0,
  4.5,
  15,
  'Khorenatsi street, central Yerevan',
  '{
    "naturalLight": true,
    "makeupRoom": true,
    "parking": true,
    "soundSystem": false,
    "includedEquipment": ["3 light stands", "2 softboxes", "background support system"]
  }',
  'https://cdn.fotores.ru/5f03b9a872a946c0a940a11f3e8ab775/e6e479f225a0de3c0a69a3ca1fb103c1.jpeg',
  '[
    "https://cdn.fotores.ru/5f03b9a872a946c0a940a11f3e8ab775/e6e479f225a0de3c0a69a3ca1fb103c1.jpeg",
    "https://cdn.fotores.ru/5f03b9a872a946c0a940a11f3e8ab775/2735bae424272760dae20fb28b412641.jpeg",
    "https://cdn.fotores.ru/bc829876619d41b4b45b22dbb306438b/fa433cc6344f575beb497e5fa8b77a30.jpeg"
  ]'
),
(
  'studio-2-loft',
  'Studio 2 — Loft Vibes',
  'Loft-style pavilion with textured walls and industrial details, perfect for editorial and content shooting.',
  25000.00,
  150.0,
  5.0,
  20,
  'Downtown Yerevan',
  '{
    "naturalLight": false,
    "makeupRoom": true,
    "parking": true,
    "soundSystem": true,
    "includedEquipment": ["4 LED panels", "C-stands", "smoke machine (on request)"]
  }',
  'https://cdn.fotores.ru/5f03b9a872a946c0a940a11f3e8ab775/2735bae424272760dae20fb28b412641.jpeg',
  '[
    "https://cdn.fotores.ru/5f03b9a872a946c0a940a11f3e8ab775/2735bae424272760dae20fb28b412641.jpeg",
    "https://cdn.fotores.ru/5f03b9a872a946c0a940a11f3e8ab775/e6e479f225a0de3c0a69a3ca1fb103c1.jpeg",
    "https://cdn.fotores.ru/bc829876619d41b4b45b22dbb306438b/fa433cc6344f575beb497e5fa8b77a30.jpeg"
  ]'
),
(
  'studio-3-mini',
  'Studio 3 — Compact Content Room',
  'Small but well-equipped pavilion for content creators, product shoots and online projects.',
  15000.00,
  60.0,
  3.2,
  8,
  'Near city center',
  '{
    "naturalLight": true,
    "makeupRoom": false,
    "parking": true,
    "soundSystem": false,
    "includedEquipment": ["2 LED panels", "tripod", "tabletop setup"]
  }',
  'https://cdn.fotores.ru/bc829876619d41b4b45b22dbb306438b/fa433cc6344f575beb497e5fa8b77a30.jpeg',
  '[
    "https://cdn.fotores.ru/bc829876619d41b4b45b22dbb306438b/fa433cc6344f575beb497e5fa8b77a30.jpeg",
    "https://cdn.fotores.ru/5f03b9a872a946c0a940a11f3e8ab775/e6e479f225a0de3c0a69a3ca1fb103c1.jpeg",
    "https://cdn.fotores.ru/5f03b9a872a946c0a940a11f3e8ab775/2735bae424272760dae20fb28b412641.jpeg"
  ]'
);

-- bookings можешь оставить как есть
INSERT INTO bookings (
  pavilion_id,
  date,
  start_time,
  end_time,
  total_price,
  customer_name,
  phone,
  email,
  notes,
  extras,
  status
)
VALUES
(
  1,
  CURRENT_DATE + 1,
  '10:00',
  '13:00',
  60000.00,
  'Sample Client',
  '+374 00 000000',
  'client@example.com',
  'Test booking for dashboard.',
  '{
    "lightingPackage": true,
    "extraBackdrop": false
  }',
  'confirmed'
),
(
  2,
  CURRENT_DATE + 2,
  '14:00',
  '17:00',
  75000.00,
  'Fashion Brand',
  '+374 11 111111',
  'brand@example.com',
  'Editorial lookbook.',
  '{
    "lightingPackage": true
  }',
  'pending'
);

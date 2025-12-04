import { query } from "./db";

export async function getAllPavilions() {
  const res = await query(
    `
    SELECT
      id,
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
    FROM pavilions
    ORDER BY id ASC;
  `
  );
  return res.rows.map((row) => ({
    ...row,
    features: row.features ? JSON.parse(row.features) : null,
    gallery_image_urls: row.gallery_image_urls
      ? JSON.parse(row.gallery_image_urls)
      : []
  }));
}

export async function getPavilionBySlug(slug) {
  const res = await query(
    `
    SELECT
      id,
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
    FROM pavilions
    WHERE slug = $1
    LIMIT 1;
  `,
    [slug]
  );

  if (res.rows.length === 0) return null;

  const row = res.rows[0];

  return {
    ...row,
    features: row.features ? JSON.parse(row.features) : null,
    gallery_image_urls: row.gallery_image_urls
      ? JSON.parse(row.gallery_image_urls)
      : []
  };
}

export async function getPavilionBookingsUpcoming(pavilionId, daysAhead = 30) {
  const res = await query(
    `
    SELECT
      id,
      date,
      start_time,
      end_time,
      status
    FROM bookings
    WHERE pavilion_id = $1
      AND date >= CURRENT_DATE
      AND date <= CURRENT_DATE + $2::integer
    ORDER BY date ASC, start_time ASC;
  `,
    [pavilionId, daysAhead]
  );

  return res.rows;
}

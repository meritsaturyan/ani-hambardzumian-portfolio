import { query } from "./db";

const isProd = process.env.NODE_ENV === "production";

const demoPavilions = [
  {
    id: 1,
    slug: "white-hall",
    name: "White Hall",
    location: "Center, Yerevan",
    description:
      "Bright white studio with cyclorama, perfect for fashion and beauty shoots.",
    base_price: 50000,
    area_sqm: 90,
    capacity_min: 2,
    capacity_max: 8,
    supports_photo: true,
    supports_video: true,
    supports_content: true
  },
  {
    id: 2,
    slug: "dark-loft",
    name: "Dark Loft",
    location: "Center, Yerevan",
    description:
      "Atmospheric dark loft with textured walls and controlled lighting.",
    base_price: 55000,
    area_sqm: 80,
    capacity_min: 2,
    capacity_max: 12,
    supports_photo: true,
    supports_video: true,
    supports_content: false
  }
];

/**
 * Все павильоны (страница /pavilions и блок на главной)
 */
export async function getAllPavilions() {
  try {
    const res = await query(
      `SELECT
         id,
         slug,
         name,
         location,
         description,
         base_price,
         area_sqm,
         capacity_min,
         capacity_max,
         supports_photo,
         supports_video,
         supports_content
       FROM pavilions
       ORDER BY id ASC`
    );

    // В проде, если БД нет или она пустая — показываем демо
    if (isProd && (!res || res.rowCount === 0)) {
      return demoPavilions;
    }

    return res.rows;
  } catch (err) {
    console.error("getAllPavilions error:", err);

    // На Vercel при любой ошибке тоже показываем демо
    if (isProd) {
      return demoPavilions;
    }

    throw err;
  }
}

/**
 * Один павильон по slug (для /pavilions/[slug] и API /api/pavilions/[slug])
 */
export async function getPavilionBySlug(slug) {
  try {
    const res = await query(
      "SELECT * FROM pavilions WHERE slug = $1 LIMIT 1",
      [slug]
    );

    if (res && res.rows && res.rows.length > 0) {
      return res.rows[0];
    }

    if (isProd) {
      return demoPavilions.find((p) => p.slug === slug) || null;
    }

    return null;
  } catch (err) {
    console.error("getPavilionBySlug error:", err);

    if (isProd) {
      return demoPavilions.find((p) => p.slug === slug) || null;
    }

    throw err;
  }
}

/**
 * Будущие бронирования павильона (для /pavilions/[slug])
 */
export async function getPavilionBookingsUpcoming(pavilionId, daysAhead = 30) {
  try {
    const res = await query(
      `
      SELECT *
      FROM bookings
      WHERE pavilion_id = $1
        AND date >= CURRENT_DATE
        AND date <= CURRENT_DATE + $2::interval
      ORDER BY date ASC, time_from ASC
    `,
      [pavilionId, `${daysAhead} days`]
    );

    if (!res) return [];

    return res.rows;
  } catch (err) {
    console.error("getPavilionBookingsUpcoming error:", err);

    // В демо-режиме просто не показываем брони
    if (isProd) {
      return [];
    }

    throw err;
  }
}

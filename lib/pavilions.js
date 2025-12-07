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

// ---------- список павильонов ----------

export async function getAllPavilions() {
  const fullSql = `
    SELECT
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
    ORDER BY id ASC
  `;

  const legacySql = `
    SELECT
      id,
      slug,
      name,
      location,
      description
    FROM pavilions
    ORDER BY id ASC
  `;

  try {
    // сначала пробуем новый запрос (под расширенную схему)
    const res = await query(fullSql);
    if (!res || res.rowCount === 0) {
      if (isProd) return demoPavilions;
      return [];
    }
    return res.rows;
  } catch (err) {
    console.error("getAllPavilions full query failed, fallback to legacy:", err);

    // если нет каких-то колонок — пробуем старую схему
    try {
      const res = await query(legacySql);

      if ((!res || res.rowCount === 0) && isProd) {
        return demoPavilions;
      }

      const rows = res?.rows || [];

      // достраиваем отсутствующие поля дефолтами,
      // чтобы фронт не ломался
      return rows.map((row, idx) => ({
        ...row,
        base_price: row.base_price ?? (idx === 0 ? 50000 : 55000),
        area_sqm: row.area_sqm ?? null,
        capacity_min: row.capacity_min ?? null,
        capacity_max: row.capacity_max ?? null,
        supports_photo:
          typeof row.supports_photo === "boolean" ? row.supports_photo : true,
        supports_video:
          typeof row.supports_video === "boolean" ? row.supports_video : true,
        supports_content:
          typeof row.supports_content === "boolean"
            ? row.supports_content
            : true
      }));
    } catch (err2) {
      console.error("getAllPavilions legacy query failed:", err2);

      if (isProd) {
        // на Vercel никогда не падаем – показываем демо
        return demoPavilions;
      }

      // в dev пусть ошибка видна
      throw err2;
    }
  }
}

// ---------- один павильон по slug ----------

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

// ---------- будущие брони павильона ----------

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

    // в демо режиме просто не показываем брони
    if (isProd) {
      return [];
    }

    throw err;
  }
}

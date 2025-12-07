import { NextResponse } from "next/server";
import { query } from "../../../lib/db";

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
    // поля для фильтров на странице
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

export async function GET() {
  try {
    // Пытаемся взять реальные данные из БД
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

    // В проде, если БД выключена или таблица пустая — используем демо
    if (isProd && (!res || res.rowCount === 0)) {
      return NextResponse.json({ pavilions: demoPavilions });
    }

    return NextResponse.json({ pavilions: res.rows });
  } catch (err) {
    console.error("GET /api/pavilions error:", err);

    // В продакшене при ошибке тоже отдаём демо, чтобы страница не была пустой
    if (isProd) {
      return NextResponse.json({ pavilions: demoPavilions });
    }

    return NextResponse.json(
      { error: "Failed to load pavilions" },
      { status: 500 }
    );
  }
}

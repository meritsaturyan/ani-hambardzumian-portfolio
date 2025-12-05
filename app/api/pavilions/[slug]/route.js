import { NextResponse } from "next/server";
import { query } from "@/lib/db";

const demoPavilions = [
  {
    id: 1,
    slug: "white-hall",
    name: "White Hall",
    location: "Center, Yerevan",
    description: "Bright white studio with cyclorama, perfect for fashion and beauty shoots.",
    base_price: 50000,
    area_sqm: 90
  },
  {
    id: 2,
    slug: "dark-loft",
    name: "Dark Loft",
    location: "Center, Yerevan",
    description: "Atmospheric dark loft with textured walls and controlled lighting.",
    base_price: 55000,
    area_sqm: 80
  }
];

export async function GET() {
  try {
    // Пытаемся сходить в БД
    const res = await query(
      "SELECT id, slug, name, description, base_price FROM pavilions ORDER BY id ASC"
    );

    // Если в проде БД выключена или таблица пустая — показываем демо-павильоны
    if (process.env.NODE_ENV === "production" && (!res || res.rowCount === 0)) {
      return NextResponse.json({ pavilions: demoPavilions });
    }

    return NextResponse.json({ pavilions: res.rows });
  } catch (err) {
    console.error("GET /api/pavilions error:", err);

    // В проде при ошибке тоже даём демо, чтобы сайт не ломался и не был пустым
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ pavilions: demoPavilions });
    }

    return NextResponse.json(
      { error: "Failed to load pavilions" },
      { status: 500 }
    );
  }
}

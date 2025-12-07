import { NextResponse } from "next/server";
import { query } from "../../../lib/db"; // ВАЖНО: относительный путь, без "@/"

const demoPavilions = [
  {
    id: 1,
    slug: "white-hall",
    name: "White Hall",
    location: "Center, Yerevan",
    description:
      "Bright white studio with cyclorama, perfect for fashion and beauty shoots.",
    base_price: 50000,
    area_sqm: 90
  },
  {
    id: 2,
    slug: "dark-loft",
    name: "Dark Loft",
    location: "Center, Yerevan",
    description:
      "Atmospheric dark loft with textured walls and controlled lighting.",
    base_price: 55000,
    area_sqm: 80
  }
];

export async function GET() {
  const isProd = process.env.NODE_ENV === "production";

  try {
    // БЕЗ base_price, чтобы не падать, если колонки нет
    const res = await query(
      "SELECT id, slug, name, location, description FROM pavilions ORDER BY id ASC"
    );

    // Если в проде база пустая — показываем демо
    if (isProd && (!res || res.rowCount === 0)) {
      return NextResponse.json({ pavilions: demoPavilions });
    }

    const rows = res?.rows || [];

    // Достраиваем base_price и area_sqm дефолтами (чтобы фронт не ломался)
    const pavilions = rows.map((row, index) => {
      const fallback = demoPavilions[index] || demoPavilions[0];

      return {
        ...row,
        base_price:
          typeof row.base_price === "number"
            ? row.base_price
            : fallback.base_price,
        area_sqm:
          typeof row.area_sqm === "number" ? row.area_sqm : fallback.area_sqm
      };
    });

    return NextResponse.json({ pavilions });
  } catch (err) {
    console.error("GET /api/pavilions error:", err);

    // В проде при любой ошибке — тоже демо, чтобы сайт не был пустым
    if (isProd) {
      return NextResponse.json({ pavilions: demoPavilions });
    }

    return NextResponse.json(
      { error: "Failed to load pavilions" },
      { status: 500 }
    );
  }
}

// app/api/pavilions/[slug]/route.js
import { NextResponse } from "next/server";
import {
  getPavilionBySlug,
  getPavilionBookingsUpcoming,
} from "../../../../lib/pavilions";

// Демо-данные на случай, если БД не настроена (например, на Vercel без DATABASE_URL)
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
  },
];

export async function GET(request, { params }) {
  const { slug } = params;

  // Если нет DATABASE_URL — работаем в демо-режиме
  if (!process.env.DATABASE_URL) {
    const pavilion =
      demoPavilions.find((p) => p.slug === slug) ||
      {
        id: 999,
        slug,
        name: "Demo Pavilion",
        location: "Center, Yerevan",
        description:
          "This is a demo pavilion used for preview when the database is not configured.",
        base_price: 50000,
        area_sqm: 80,
      };

    const demoBookings = [
      // можешь добавить пример бронирований, если нужно
      // {
      //   id: 1,
      //   pavilion_id: pavilion.id,
      //   date: "2025-01-01",
      //   time_from: "10:00",
      //   time_to: "12:00",
      //   status: "confirmed",
      // },
    ];

    return NextResponse.json({
      pavilion,
      upcomingBookings: demoBookings,
    });
  }

  // Обычный режим — когда база настроена
  try {
    const pavilion = await getPavilionBySlug(slug);

    if (!pavilion) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const bookings = await getPavilionBookingsUpcoming(pavilion.id, 30);

    return NextResponse.json({
      pavilion,
      upcomingBookings: bookings,
    });
  } catch (err) {
    console.error("GET /api/pavilions/[slug] error:", err);
    return NextResponse.json(
      { error: "Failed to load pavilion" },
      { status: 500 }
    );
  }
}

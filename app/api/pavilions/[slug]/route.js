import { NextResponse } from "next/server";
import {
  getPavilionBySlug,
  getPavilionBookingsUpcoming
} from "../../../../lib/pavilions";

export async function GET(request, { params }) {
  const { slug } = params;

  // Демо-режим, если базы нет (например, на Vercel без DATABASE_URL)
  if (!process.env.DATABASE_URL) {
    const demoPavilion = {
      id: 1,
      name: "Demo Pavilion",
      slug,
      description:
        "This is a demo pavilion used for preview when the database is not configured.",
      base_price: 50000
    };

    const demoBookings = [
      // при желании можешь добавить пример бронирований
      // {
      //   id: 1,
      //   pavilion_id: 1,
      //   date: "2025-01-01",
      //   time_from: "10:00",
      //   time_to: "12:00",
      //   status: "confirmed"
      // }
    ];

    return NextResponse.json({
      pavilion: demoPavilion,
      upcomingBookings: demoBookings
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
      upcomingBookings: bookings
    });
  } catch (err) {
    console.error("GET /api/pavilions/[slug] error:", err);
    return NextResponse.json(
      { error: "Failed to load pavilion" },
      { status: 500 }
    );
  }
}

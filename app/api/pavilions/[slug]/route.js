import { NextResponse } from "next/server";
import { getPavilionBySlug, getPavilionBookingsUpcoming } from "../../../../lib/pavilions";

export async function GET(request, { params }) {
  const { slug } = params;
  try {
    const pavilion = await getPavilionBySlug(slug);
    if (!pavilion) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const bookings = await getPavilionBookingsUpcoming(pavilion.id, 30);
    return NextResponse.json({ pavilion, upcomingBookings: bookings });
  } catch (err) {
    console.error("GET /api/pavilions/[slug] error:", err);
    return NextResponse.json(
      { error: "Failed to load pavilion" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { getPavilionBySlug } from "../../../lib/pavilions";
import { hasBookingConflict, createBooking, listBookings } from "../../../lib/bookings";
import { parseAdminFromRequest } from "../../../lib/auth";

const bookingSchema = z.object({
  pavilionSlug: z.string().min(1),
  date: z.string().min(1),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  customerName: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  notes: z.string().optional(),
  extras: z.record(z.any()).optional()
});

export async function GET(request) {
  const isAdmin = parseAdminFromRequest(request.headers);
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from") || undefined;
  const to = searchParams.get("to") || undefined;
  const pavilionId = searchParams.get("pavilionId") || undefined;

  try {
    const bookings = await listBookings({
      fromDate: from,
      toDate: to,
      pavilionId: pavilionId ? Number(pavilionId) : undefined
    });
    return NextResponse.json({ bookings });
  } catch (err) {
    console.error("GET /api/bookings error:", err);
    return NextResponse.json(
      { error: "Failed to load bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      pavilionSlug,
      date,
      startTime,
      endTime,
      customerName,
      phone,
      email,
      notes,
      extras
    } = parsed.data;

    const pavilion = await getPavilionBySlug(pavilionSlug);
    if (!pavilion) {
      return NextResponse.json(
        { error: "Pavilion not found" },
        { status: 404 }
      );
    }

    const conflict = await hasBookingConflict({
      pavilionId: pavilion.id,
      date,
      startTime,
      endTime
    });

    if (conflict) {
      return NextResponse.json(
        { error: "This time slot is not available" },
        { status: 409 }
      );
    }

    const startHour = Number(startTime.split(":")[0]);
    const endHour = Number(endTime.split(":")[0]);
    const hours = Math.max(0, endHour - startHour);
    const basePrice = Number(pavilion.price_per_hour) * hours;

    let extrasTotal = 0;
    if (extras) {
      if (extras.lightingPackage) extrasTotal += 10000;
      if (extras.extraBackdrop) extrasTotal += 5000;
    }

    const totalPrice = basePrice + extrasTotal;

    const booking = await createBooking({
      pavilionId: pavilion.id,
      date,
      startTime,
      endTime,
      totalPrice,
      customerName,
      phone,
      email,
      notes,
      extras
    });

    return NextResponse.json({ booking });
  } catch (err) {
    console.error("POST /api/bookings error:", err);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

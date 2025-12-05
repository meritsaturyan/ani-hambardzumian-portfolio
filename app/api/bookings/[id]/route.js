import { NextResponse } from "next/server";
import { z } from "zod";
import { updateBookingStatus } from "../../../../lib/bookings";
import { parseAdminFromRequest } from "../../../../lib/auth";

const schema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled"])
});

export async function PATCH(request, { params }) {
  const isAdmin = parseAdminFromRequest(request.headers);
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = Number(params.id);
  if (!id) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    // 1️⃣ Если базы нет (например на Vercel, где ты не задала DATABASE_URL),
    // просто возвращаем "фейковый" объект брони, чтобы админка не ломалась.
    if (!process.env.DATABASE_URL) {
      const demoBooking = {
        id,
        status: parsed.data.status,
        // любые поля, если хочешь, можно добавить здесь
        demo: true
      };

      return NextResponse.json({ booking: demoBooking });
    }

    // 2️⃣ Обычный режим — когда подключена настоящая база
    const booking = await updateBookingStatus(id, parsed.data.status);
    if (!booking) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ booking });
  } catch (err) {
    console.error("PATCH /api/bookings/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

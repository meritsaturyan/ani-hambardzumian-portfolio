import { query } from "./db";

const isProd = process.env.NODE_ENV === "production";

const demoBookings = [
  {
    id: 1,
    client_name: "Demo Client",
    client_email: "demo@example.com",
    client_phone: "+374 94 000000",
    pavilion_id: 1,
    date: "2025-01-05",
    time_from: "10:00",
    time_to: "12:00",
    status: "pending",
    comment: "Test booking",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    client_name: "Test Client",
    client_email: "test@example.com",
    client_phone: "+374 94 111111",
    pavilion_id: 2,
    date: "2025-01-06",
    time_from: "14:00",
    time_to: "16:00",
    status: "confirmed",
    comment: "",
    created_at: new Date().toISOString()
  }
];

/**
 * Список бронирований (используется в /api/bookings и админке).
 * Сейчас сделано максимально просто: без сложной фильтрации.
 */
export async function listBookings() {
  try {
    const res = await query(
      "SELECT * FROM bookings ORDER BY created_at DESC"
    );

    if (isProd && (!res || res.rowCount === 0)) {
      return demoBookings;
    }

    return res.rows;
  } catch (err) {
    console.error("listBookings error:", err);
    if (isProd) {
      return demoBookings;
    }
    throw err;
  }
}

/**
 * Создание бронирования (используется при BookingForm).
 * В проде без базы просто возвращаем фейковый объект.
 */
export async function createBooking(data) {
  try {
    const {
      client_name,
      client_email,
      client_phone,
      pavilion_id,
      date,
      time_from,
      time_to,
      status = "pending",
      comment = ""
    } = data;

    const res = await query(
      `INSERT INTO bookings
       (client_name, client_email, client_phone, pavilion_id, date, time_from, time_to, status, comment)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [
        client_name,
        client_email,
        client_phone,
        pavilion_id,
        date,
        time_from,
        time_to,
        status,
        comment
      ]
    );

    return res.rows[0];
  } catch (err) {
    console.error("createBooking error:", err);
    if (isProd) {
      return {
        id: Math.floor(Math.random() * 1e9),
        ...data,
        status: data.status || "pending",
        created_at: new Date().toISOString()
      };
    }
    throw err;
  }
}

/**
 * Проверка конфликта по времени для павильона.
 * В демо-режиме на Vercel всегда возвращаем false (нет конфликта).
 */
export async function hasBookingConflict(pavilionId, date, timeFrom, timeTo) {
  try {
    const res = await query(
      `SELECT 1
       FROM bookings
       WHERE pavilion_id = $1
         AND date = $2
         AND NOT ($3 >= time_to OR $4 <= time_from)
       LIMIT 1`,
      [pavilionId, date, timeFrom, timeTo]
    );

    return res.rowCount > 0;
  } catch (err) {
    console.error("hasBookingConflict error:", err);
    if (isProd) {
      return false;
    }
    throw err;
  }
}

/**
 * Обновление статуса брони (используется в /api/bookings/[id]).
 */
export async function updateBookingStatus(id, status) {
  try {
    const res = await query(
      `UPDATE bookings
       SET status = $2, updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [id, status]
    );

    return res.rows[0] || null;
  } catch (err) {
    console.error("updateBookingStatus error:", err);

    if (isProd) {
      const existing = demoBookings.find(b => b.id === id);
      if (existing) {
        return { ...existing, status };
      }
      return null;
    }

    throw err;
  }
}

/**
 * (на всякий) Получить одну бронь по id.
 */
export async function getBookingById(id) {
  try {
    const res = await query("SELECT * FROM bookings WHERE id = $1 LIMIT 1", [
      id
    ]);
    if (res && res.rows && res.rows.length > 0) {
      return res.rows[0];
    }

    if (isProd) {
      return demoBookings.find(b => b.id === id) || null;
    }

    return null;
  } catch (err) {
    console.error("getBookingById error:", err);
    if (isProd) {
      return demoBookings.find(b => b.id === id) || null;
    }
    throw err;
  }
}

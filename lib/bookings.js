import { query } from "./db";

export async function hasBookingConflict({
  pavilionId,
  date,
  startTime,
  endTime
}) {
  const res = await query(
    `
    SELECT 1
    FROM bookings
    WHERE pavilion_id = $1
      AND date = $2
      AND NOT (
        end_time <= $3
        OR start_time >= $4
      )
    LIMIT 1;
  `,
    [pavilionId, date, startTime, endTime]
  );

  return res.rows.length > 0;
}

export async function createBooking({
  pavilionId,
  date,
  startTime,
  endTime,
  totalPrice,
  customerName,
  phone,
  email,
  notes,
  extras
}) {
  const res = await query(
    `
    INSERT INTO bookings (
      pavilion_id,
      date,
      start_time,
      end_time,
      total_price,
      customer_name,
      phone,
      email,
      notes,
      extras,
      status
    )
    VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9, $10, 'pending'
    )
    RETURNING *;
  `,
    [
      pavilionId,
      date,
      startTime,
      endTime,
      totalPrice,
      customerName,
      phone,
      email,
      notes || "",
      extras ? JSON.stringify(extras) : null
    ]
  );

  return res.rows[0];
}

export async function listBookings({ fromDate, toDate, pavilionId } = {}) {
  const conditions = [];
  const params = [];
  let idx = 1;

  if (fromDate) {
    conditions.push(`date >= $${idx++}`);
    params.push(fromDate);
  }
  if (toDate) {
    conditions.push(`date <= $${idx++}`);
    params.push(toDate);
  }
  if (pavilionId) {
    conditions.push(`pavilion_id = $${idx++}`);
    params.push(pavilionId);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  const res = await query(
    `
    SELECT
      b.*,
      p.name AS pavilion_name,
      p.slug AS pavilion_slug
    FROM bookings b
    JOIN pavilions p ON p.id = b.pavilion_id
    ${whereClause}
    ORDER BY b.date DESC, b.start_time DESC;
  `,
    params
  );

  return res.rows.map((row) => ({
    ...row,
    extras: row.extras ? JSON.parse(row.extras) : null
  }));
}

export async function updateBookingStatus(id, status) {
  const res = await query(
    `
    UPDATE bookings
    SET status = $2,
        updated_at = NOW()
    WHERE id = $1
    RETURNING *;
  `,
    [id, status]
  );

  if (res.rows.length === 0) return null;

  const row = res.rows[0];
  return {
    ...row,
    extras: row.extras ? JSON.parse(row.extras) : null
  };
}

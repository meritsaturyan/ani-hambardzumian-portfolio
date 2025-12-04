"use client";

import Button from "../ui/Button";

export default function BookingDetailModal({ booking, onClose }) {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-brand-bg border border-white/15 rounded-2xl shadow-soft max-w-md w-full mx-4 p-5 text-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Booking details</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white/60 hover:text-white text-xs"
          >
            Close
          </button>
        </div>
        <div className="space-y-2 text-xs md:text-sm">
          <Row label="Pavilion">
            {booking.pavilion_name} (#{booking.pavilion_id})
          </Row>
          <Row label="Date">
            {new Date(booking.date).toLocaleDateString("en-GB")} ·{" "}
            {booking.start_time}–{booking.end_time}
          </Row>
          <Row label="Customer">{booking.customer_name}</Row>
          <Row label="Phone">{booking.phone}</Row>
          <Row label="Email">{booking.email}</Row>
          <Row label="Total">
            {new Intl.NumberFormat("hy-AM", {
              style: "currency",
              currency: "AMD",
              maximumFractionDigits: 0
            }).format(booking.total_price || 0)}
          </Row>
          <Row label="Status" valueClass="capitalize">
            {booking.status}
          </Row>
          {booking.notes && (
            <Row label="Notes">{booking.notes}</Row>
          )}
          {booking.extras && (
            <Row label="Extras">
              <pre className="whitespace-pre-wrap text-xs">
                {JSON.stringify(booking.extras, null, 2)}
              </pre>
            </Row>
          )}
        </div>
        <div className="mt-4 text-right">
          <Button size="sm" variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children, valueClass }) {
  return (
    <div className="flex gap-2">
      <div className="w-24 text-white/50 text-xs uppercase tracking-[0.16em]">
        {label}
      </div>
      <div className={`flex-1 ${valueClass || ""}`}>{children}</div>
    </div>
  );
}

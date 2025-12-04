"use client";

import Button from "../ui/Button";

export default function BookingTable({
  bookings,
  loading,
  onSelectBooking,
  onStatusChanged
}) {
  async function changeStatus(id, status) {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (!res.ok) {
        console.error("Failed to update status");
      } else {
        onStatusChanged?.();
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="max-h-[480px] overflow-auto">
        <table className="w-full text-xs md:text-sm">
          <thead className="bg-white/5 text-white/60">
            <tr>
              <th className="px-3 py-2 text-left">Date</th>
              <th className="px-3 py-2 text-left">Time</th>
              <th className="px-3 py-2 text-left">Pavilion</th>
              <th className="px-3 py-2 text-left">Customer</th>
              <th className="px-3 py-2 text-left">Contacts</th>
              <th className="px-3 py-2 text-left">Total</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={8} className="px-3 py-4 text-center text-white/60">
                  Loading...
                </td>
              </tr>
            )}
            {!loading && bookings.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-4 text-center text-white/60">
                  No bookings found.
                </td>
              </tr>
            )}
            {bookings.map((b) => (
              <tr key={b.id} className="border-t border-white/10">
                <td className="px-3 py-2">
                  {new Date(b.date).toLocaleDateString("en-GB")}
                </td>
                <td className="px-3 py-2">
                  {b.start_time} – {b.end_time}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {b.pavilion_name} (#{b.pavilion_id})
                </td>
                <td className="px-3 py-2">{b.customer_name}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <div>{b.phone}</div>
                  <div className="text-white/60">{b.email}</div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {new Intl.NumberFormat("hy-AM", {
                    style: "currency",
                    currency: "AMD",
                    maximumFractionDigits: 0
                  }).format(b.total_price || 0)}
                </td>
                <td className="px-3 py-2 capitalize">
                  {b.status}
                </td>
                <td className="px-3 py-2 text-right space-x-1">
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => onSelectBooking?.(b)}
                  >
                    View
                  </Button>
                  <Button
                    size="xs"
                    variant={b.status === "confirmed" ? "ghost" : "outline"}
                    onClick={() => changeStatus(b.id, "confirmed")}
                  >
                    Confirm
                  </Button>
                  <Button
                    size="xs"
                    variant={b.status === "cancelled" ? "ghost" : "outline"}
                    onClick={() => changeStatus(b.id, "cancelled")}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

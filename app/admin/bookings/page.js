"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BookingFilters from "../../../components/admin/BookingFilters";
import BookingTable from "../../../components/admin/BookingTable";
import BookingDetailModal from "../../../components/admin/BookingDetailModal";
import Alert from "../../../components/ui/Alert";

export default function AdminBookingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  async function loadBookings() {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams(searchParams.toString());
      const res = await fetch(`/api/bookings?${params.toString()}`, {
        credentials: "include"
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed to load bookings");
        return;
      }
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (err) {
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Bookings</h1>
        <p className="text-white/60 mt-1">
          Manage studio bookings, confirm or cancel requests.
        </p>
      </div>

      <BookingFilters />

      {error && <Alert variant="error">{error}</Alert>}

      <BookingTable
        bookings={bookings}
        loading={loading}
        onSelectBooking={setSelectedBooking}
        onStatusChanged={loadBookings}
      />

      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
}

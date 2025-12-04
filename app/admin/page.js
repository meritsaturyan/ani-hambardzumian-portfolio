import Link from "next/link";

export default function AdminIndexPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
      <p className="text-white/60">
        Welcome to the admin area. Use the link below to manage bookings.
      </p>
      <Link href="/admin/bookings" className="btn-primary">
        Go to Bookings
      </Link>
    </div>
  );
}

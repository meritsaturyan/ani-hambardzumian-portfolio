import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="container-page flex items-center justify-between h-16">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-brand.primary" />
          <div className="leading-tight">
            <div className="font-display font-semibold text-sm">
              Ani Hambardzumian
            </div>
            <div className="text-[11px] text-white/60">Admin</div>
          </div>
        </Link>
        <nav className="flex items-center gap-4 text-xs">
          <Link href="/admin/bookings" className="hover:text-brand.primary">
            Bookings
          </Link>
          <Link href="/" className="text-white/60 hover:text-white">
            Back to site
          </Link>
        </nav>
      </div>
    </header>
  );
}

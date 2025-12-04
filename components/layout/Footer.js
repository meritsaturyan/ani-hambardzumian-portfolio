import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contacts" className="bg-black text-slate-100 mt-16">
      <div className="container-page py-10 md:py-14 grid gap-10 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black font-semibold">
              AH
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-sm">Ani Hambardzumian Studios</p>
              <p className="text-xs text-slate-400">
                Professional photo &amp; video pavilions
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Natural light, cycloramas, dressing rooms and professional
            equipment — everything for your next shoot in the center of Yerevan.
          </p>
          <div className="flex gap-3 text-sm text-slate-300">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="mailto:hello@anistudios.am">Email</a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm text-white">Pavilions</h4>
          <ul className="space-y-1 text-sm text-slate-400">
            <li>Studio #1 (Khorenatsi)</li>
            <li>Studio #2 (Khorenatsi)</li>
            <li>Studio #3 (Armenakyan)</li>
            <li>Studio #4 (Armenakyan)</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm text-white">Contacts</h4>
          <ul className="space-y-1 text-sm text-slate-400">
            <li>33 Movses Khorenatsi St, Yerevan</li>
            <li>9 Armenak Armenakyan St, Yerevan</li>
            <li>
              <a href="mailto:hello@anistudios.am">hello@anistudios.am</a>
            </li>
            <li>
              <a href="tel:+37494000000">+374 94 000000</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-4 flex items-center justify-between text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Ani Hambardzumian Studios.</span>
          <Link href="/privacy" className="hover:text-slate-300">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

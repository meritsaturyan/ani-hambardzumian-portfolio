"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pavilions", label: "Studios" },
  { href: "/#about", label: "About Us" },
  { href: "/#contacts", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-40">
      <div className="container-page flex items-center justify-between h-16 md:h-20 gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary text-white font-semibold">
            AH
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-sm sm:text-base text-brand-dark">
              Ani Hambardzumian
            </span>
            <span className="text-xs text-slate-500">
              Photo &amp; Video Studios
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href.replace("/#", "/"));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  active
                    ? "text-brand-primary"
                    : "text-slate-600 hover:text-brand-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/pavilions" className="btn-secondary text-sm">
            View Pavilions
          </Link>
          <Link
            href="/pavilions/studio-1-khorenatsi"
            className="btn-primary text-sm"
          >
            Book a Studio
          </Link>
        </div>

        {/* mobile burger */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-full border border-slate-200 w-9 h-9"
          onClick={() => setOpen((x) => !x)}
          aria-label="Toggle menu"
        >
          <span className="block w-4 h-[2px] bg-slate-800 rounded-sm" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="container-page py-3 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-1 text-sm text-slate-700"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link href="/pavilions" className="btn-secondary text-sm">
                View Pavilions
              </Link>
              <Link
                href="/pavilions/studio-1-khorenatsi"
                className="btn-primary text-sm"
              >
                Book a Studio
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

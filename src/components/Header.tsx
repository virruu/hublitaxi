"use client";

import Link from "next/link";
import { useState } from "react";
import { site, telLink } from "@/data/site";
import { Phone } from "@/components/Icons";

const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#routes", label: "Routes" },
  { href: "/#fleet", label: "Fleet" },
  { href: "/#how", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/5 bg-white/85 backdrop-blur-md">
      <div className="container-px flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label={site.name}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-lg font-black text-ink-900">
            H
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            Hubli<span className="text-brand-600">Taxi</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-700 transition-colors hover:text-ink-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={telLink} className="hidden btn-dark sm:inline-flex">
            <Phone className="h-4 w-4" />
            Call now
          </a>
          <Link href="/#book" className="hidden btn-primary md:inline-flex">
            Book a cab
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-900/10 lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-ink-900" />
              <span className="block h-0.5 w-5 bg-ink-900" />
              <span className="block h-0.5 w-5 bg-ink-900" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink-900/5 bg-white lg:hidden">
          <nav className="container-px flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-medium text-ink-800 hover:bg-gray-50"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#book"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              Book a cab
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

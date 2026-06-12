"use client";

import { useState } from "react";
import services from "@/data/services.json";
import routes from "@/data/routes.json";
import fleet from "@/data/fleet.json";
import { trackBookingLead } from "@/lib/analytics";
import { site, telLink, whatsappLink } from "@/data/site";
import { Phone, WhatsApp, Check } from "@/components/Icons";

const tripTypes = ["Outstation", "Local / City", "Airport", "Railway"];

export function BookingForm({ defaultRoute }: { defaultRoute?: string }) {
  const [trip, setTrip] = useState(tripTypes[0]);
  const [pickup, setPickup] = useState("Hubli");
  const [drop, setDrop] = useState(defaultRoute ?? "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [cab, setCab] = useState(services[0].title);
  const [vehicle, setVehicle] = useState("Any / Not sure");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const message = [
    `New booking request for ${site.name}`,
    `Name: ${name || "—"}`,
    `Phone: ${phone || "—"}`,
    `Trip type: ${trip}`,
    `Pickup: ${pickup || "—"}`,
    `Drop: ${drop || "—"}`,
    `Date/Time: ${date || "—"} ${time || ""}`.trim(),
    `Service: ${cab}`,
    `Vehicle: ${vehicle}`,
  ].join("\n");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackBookingLead({
      tripType: trip,
      service: cab,
      vehicle,
      hasPhone: phone.trim().length > 0,
    });
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };

  const field =
    "w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30";
  const label = "mb-1.5 block text-xs font-semibold text-ink-700";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-ink-900/10 bg-white p-5 shadow-card sm:p-6"
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {tripTypes.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTrip(t)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              trip === t
                ? "bg-ink-900 text-white"
                : "bg-gray-100 text-ink-700 hover:bg-gray-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 [&>div]:min-w-0">
        <div>
          <label className={label} htmlFor="pickup">
            Pickup
          </label>
          <input
            id="pickup"
            className={field}
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="e.g. Hubli"
          />
        </div>
        <div>
          <label className={label} htmlFor="drop">
            Drop
          </label>
          <input
            id="drop"
            className={field}
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            placeholder="e.g. Goa"
            list="route-list"
          />
          <datalist id="route-list">
            {routes.map((r) => (
              <option key={r.slug} value={r.to} />
            ))}
          </datalist>
        </div>
        <div>
          <label className={label} htmlFor="date">
            Date
          </label>
          <input
            id="date"
            type="date"
            className={field}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label className={label} htmlFor="time">
            Time
          </label>
          <input
            id="time"
            type="time"
            className={field}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div>
          <label className={label} htmlFor="cab">
            Service
          </label>
          <select
            id="cab"
            className={field}
            value={cab}
            onChange={(e) => setCab(e.target.value)}
          >
            {services.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="vehicle">
            Preferred vehicle
          </label>
          <select
            id="vehicle"
            className={field}
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
          >
            <option>Any / Not sure</option>
            {fleet.map((f) => (
              <option key={f.slug}>{f.name}</option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label className={label} htmlFor="name">
            Your name
          </label>
          <input
            id="name"
            className={field}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
          />
        </div>
        <div className="col-span-2">
          <label className={label} htmlFor="phone">
            Mobile number
          </label>
          <input
            id="phone"
            type="tel"
            className={field}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit mobile number"
          />
        </div>
      </div>

      <button type="submit" className="btn-whatsapp mt-5 w-full">
        <WhatsApp className="h-5 w-5" />
        Get instant quote on WhatsApp
      </button>
      <a
        href={telLink}
        className="btn-outline mt-3 w-full"
        data-analytics="call"
        data-analytics-location="booking_form"
      >
        <Phone className="h-4 w-4" />
        Or call {site.phone}
      </a>

      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-ink-700">
        <Check className="h-4 w-4 text-green-600" />
        No advance payment · Free cancellation · 24/7 support
      </p>
    </form>
  );
}

import fleet from "@/data/fleet.json";

/** Outstation route fares are quoted for round trip (there and back). */
export const ROUND_TRIP_MULTIPLIER = 2;

/** Total km billed for a round trip on a route. */
export const routeTripKm = (distanceKm: number) =>
  distanceKm * ROUND_TRIP_MULTIPLIER;

/** Round-trip fare from distance and per-km rate. */
export const routeFare = (distanceKm: number, perKm: number) =>
  Math.round(routeTripKm(distanceKm) * perKm);

/** Lowest fleet per-km rate (entry-level sedan). */
export const lowestPerKm = () =>
  Math.min(...fleet.map((car) => car.perKm));

/**
 * Computed sedan round-trip fare (distance × 2 × lowest per-km).
 * Use when adding a route without a manual fromPrice.
 */
export const computedSedanRoundTrip = (distanceKm: number) =>
  routeFare(distanceKm, lowestPerKm());

/**
 * Display “from” price for a route — `fromPrice` is the sedan round-trip
 * anchor in routes.json (matches home / routes cards).
 */
export const routeFromPrice = (distanceKm: number, fromPrice?: number) =>
  fromPrice ?? computedSedanRoundTrip(distanceKm);

/**
 * Round-trip fares for every fleet type. Sedan matches `fromPrice`; other
 * vehicles scale by their per-km rate relative to sedan.
 */
export const fleetFaresForRoute = (fromPrice: number) => {
  const basePerKm = lowestPerKm();
  return fleet
    .map((car) => ({
      ...car,
      fare: Math.round(fromPrice * (car.perKm / basePerKm)),
    }))
    .sort((a, b) => a.fare - b.fare);
};

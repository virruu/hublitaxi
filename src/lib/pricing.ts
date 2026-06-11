import fleet from "@/data/fleet.json";

/** Outstation route fares are quoted for round trip (there and back). */
export const ROUND_TRIP_MULTIPLIER = 2;

/** Total km billed for a round trip on a route. */
export const routeTripKm = (distanceKm: number) =>
  distanceKm * ROUND_TRIP_MULTIPLIER;

/** Round-trip approx. fare for a vehicle (trip km × per-km rate). */
export const routeFare = (distanceKm: number, perKm: number) =>
  Math.round(routeTripKm(distanceKm) * perKm);

/** Lowest fleet per-km rate (entry-level sedan). */
export const lowestPerKm = () =>
  Math.min(...fleet.map((car) => car.perKm));

/** “From” price on route cards — cheapest fleet option, round trip. */
export const routeFromPrice = (distanceKm: number) =>
  routeFare(distanceKm, lowestPerKm());

/** Per-vehicle round-trip fares for a route, sorted cheapest first. */
export const fleetFaresForRoute = (distanceKm: number) =>
  fleet
    .map((car) => ({
      ...car,
      fare: routeFare(distanceKm, car.perKm),
    }))
    .sort((a, b) => a.fare - b.fare);

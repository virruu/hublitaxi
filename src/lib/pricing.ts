import fleet from "@/data/fleet.json";

/** One-way approx. fare for a vehicle on a route (distance × per-km rate). */
export const routeFare = (distanceKm: number, perKm: number) =>
  Math.round(perKm * distanceKm);

/** Lowest fleet per-km rate (entry-level sedan). */
export const lowestPerKm = () =>
  Math.min(...fleet.map((car) => car.perKm));

/** “From” price shown on route cards — cheapest fleet option for the distance. */
export const routeFromPrice = (distanceKm: number) =>
  routeFare(distanceKm, lowestPerKm());

/** Per-vehicle approx. fares for a route, sorted cheapest first. */
export const fleetFaresForRoute = (distanceKm: number) =>
  fleet
    .map((car) => ({
      ...car,
      fare: routeFare(distanceKm, car.perKm),
    }))
    .sort((a, b) => a.fare - b.fare);

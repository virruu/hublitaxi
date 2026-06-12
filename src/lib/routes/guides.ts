import guides from "@/data/route-guides.json";

export type RoutePlace = {
  name: string;
  detail: string;
};

export type RouteGuide = {
  title: string;
  intro: string;
  bestTime: string;
  routeNote: string;
  mustVisit: RoutePlace[];
  hiddenGems: RoutePlace[];
  travelTips: string[];
  foodStops?: RoutePlace[];
};

const guideMap = guides as Record<string, RouteGuide>;

export function getRouteGuide(slug: string): RouteGuide | undefined {
  return guideMap[slug];
}

export function hasRouteGuide(slug: string): boolean {
  return slug in guideMap;
}

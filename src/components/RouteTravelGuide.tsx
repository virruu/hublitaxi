import { Check, MapPin } from "@/components/Icons";
import { RelatedRoutes } from "@/components/RelatedRoutes";
import type { RouteGuide } from "@/lib/routes/guides";
import type { RelatedRoute } from "@/lib/routes/links";

type RouteTravelGuideProps = {
  destination: string;
  guide: RouteGuide;
  relatedRoutes?: RelatedRoute[];
  comboTip?: string;
};

export function RouteTravelGuide({
  destination,
  guide,
  relatedRoutes = [],
  comboTip,
}: RouteTravelGuideProps) {
  return (
    <section className="section bg-gray-50">
      <div className="container-px">
        <div className="mx-auto max-w-4xl">
          <span className="eyebrow">Travel guide</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {guide.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-700">
            {guide.intro}
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-ink-900/10 bg-white p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-700">
                Best time to visit
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">
                {guide.bestTime}
              </p>
            </div>
            <div className="rounded-2xl border border-ink-900/10 bg-white p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-700">
                On the road from Hubli
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">
                {guide.routeNote}
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-extrabold text-ink-900">
              Must-visit in {destination}
            </h3>
            <ul className="mt-5 space-y-4">
              {guide.mustVisit.map((place) => (
                <li
                  key={place.name}
                  className="rounded-2xl border border-ink-900/10 bg-white p-5"
                >
                  <p className="font-semibold text-ink-900">{place.name}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
                    {place.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {guide.hiddenGems.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-extrabold text-ink-900">
                Hidden gems most travellers miss
              </h3>
              <p className="mt-2 text-sm text-ink-700">
                Local favourites and quieter spots — worth a detour if you have
                extra time.
              </p>
              <ul className="mt-5 space-y-4">
                {guide.hiddenGems.map((place) => (
                  <li
                    key={place.name}
                    className="rounded-2xl border border-brand-500/25 bg-brand-50/60 p-5"
                  >
                    <p className="flex items-center gap-2 font-semibold text-ink-900">
                      <MapPin className="h-4 w-4 shrink-0 text-brand-600" />
                      {place.name}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
                      {place.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {guide.foodStops && guide.foodStops.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-extrabold text-ink-900">
                Worth a stop on the way
              </h3>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {guide.foodStops.map((stop) => (
                  <li
                    key={stop.name}
                    className="rounded-2xl border border-ink-900/10 bg-white p-4 text-sm"
                  >
                    <span className="font-semibold text-ink-900">
                      {stop.name}
                    </span>
                    <span className="text-ink-700"> — {stop.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-12 rounded-2xl border border-ink-900/10 bg-white p-6">
            <h3 className="text-lg font-extrabold text-ink-900">
              Practical tips for your cab trip
            </h3>
            <ul className="mt-4 space-y-2.5">
              {guide.travelTips.map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-2 text-sm text-ink-700"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <RelatedRoutes routes={relatedRoutes} comboTip={comboTip} />
        </div>
      </div>
    </section>
  );
}

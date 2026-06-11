import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-px flex min-h-[40vh] flex-col items-center justify-center text-center">
        <span className="text-6xl font-black text-brand-500">404</span>
        <h1 className="mt-4 text-2xl font-extrabold">Page not found</h1>
        <p className="mt-2 max-w-md text-ink-700">
          The page you are looking for does not exist. Let&apos;s get you back on
          the road.
        </p>
        <Link href="/" className="btn-primary mt-6">
          Back to home
        </Link>
      </div>
    </section>
  );
}

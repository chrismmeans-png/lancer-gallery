import Link from "next/link";

export default function SiteNav() {
  return (
    <nav className="sticky top-0 z-10 border-b border-gold/40 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="font-display text-lg tracking-widest text-gold"
        >
          LANCER PHOTOS
        </Link>
        <Link
          href="/"
          className="text-sm text-gray-300 transition hover:text-gold"
        >
          Home
        </Link>
      </div>
    </nav>
  );
}
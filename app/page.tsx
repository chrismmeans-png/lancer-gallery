import Image from "next/image";
import Link from "next/link";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import { getSports, prettyName } from "../lib/cloudinary";

// Change this ONE line if your image file has a different name
const MASCOT = "/lancer.webp.jpg";

export default async function Home() {
  const sports = await getSports();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />

      <header className="relative overflow-hidden px-4 py-14 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(201,162,39,0.12),transparent_60%)]" />
        <div className="fade-up relative mx-auto flex max-w-3xl flex-col items-center gap-6">
          <Image
            src={MASCOT}
            alt="Lafayette Lancers mascot"
            width={320}
            height={320}
            priority
            className="h-auto w-56 rounded-2xl shadow-[0_0_60px_rgba(201,162,39,0.35)] transition duration-500 hover:scale-105 sm:w-72"
          />
          <h1 className="font-display bg-linear-to-r from-[#ffd24a] via-[#fff6d6] to-[#ffd24a] bg-clip-text px-4 pb-1 text-4xl font-bold tracking-wide text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-6xl">
            LANCER SPORTS PHOTOS
          </h1>
          <p className="max-w-xl text-gray-300">
            A fan celebration of Lafayette High School sports.
          </p>
        </div>
      </header>

      <main id="sports" className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        <h2 className="font-display mb-6 text-3xl tracking-wide text-gold">
          Pick a sport
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {sports.map((sport, i) => (
            <Link
              key={sport}
              href={`/${sport}`}
              style={{ animationDelay: `${i * 150}ms` }}
              className="fade-up group rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_0_30px_rgba(201,162,39,0.3)]"
            >
              <h3 className="font-display text-2xl tracking-wide text-white group-hover:text-gold">
                {prettyName(sport)}
              </h3>
              <span className="mt-4 inline-block rounded-full border border-gold/50 px-3 py-1 text-xs text-gold">
                View photos →
              </span>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
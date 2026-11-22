import Image from "next/image";

// Change this ONE line if your image file has a different name
const MASCOT = "/lancer.webp.jpg";

const sports = [
  { name: "Swim", note: "Meets, relays and championships" },
  { name: "Ice Hockey", note: "Games, rivalries and playoff runs" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="sticky top-0 z-10 border-b border-gold/40 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <span className="font-display text-lg tracking-widest text-gold">
            LANCER PHOTOS
          </span>
          <a
            href="#sports"
            className="text-sm text-gray-300 transition hover:text-gold"
          >
            Sports
          </a>
        </div>
      </nav>

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
            <div
              key={sport.name}
              style={{ animationDelay: `${i * 150}ms` }}
              className="fade-up group rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_0_30px_rgba(201,162,39,0.3)]"
            >
              <h3 className="font-display text-2xl tracking-wide text-white group-hover:text-gold">
                {sport.name}
              </h3>
              <p className="mt-1 text-gray-400">{sport.note}</p>
              <span className="mt-4 inline-block rounded-full border border-gold/50 px-3 py-1 text-xs text-gold">
                Photos coming soon
              </span>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-gold/40 bg-black px-4 py-8 text-center text-sm text-gray-400">
        <p className="mx-auto max-w-3xl">
          This is an unofficial fan site. It is not affiliated with Lafayette
          High School or the Rockwood School District. It is simply a
          celebration of Lafayette sports.
        </p>
        <p className="mt-2">
          To request a photo be removed, email{" "}
          <span className="text-gold">your-email@example.com</span>.
        </p>
      </footer>
    </div>
  );
}
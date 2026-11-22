import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "../../components/Gallery";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import {
  getSports,
  getSeasons,
  getPhotos,
  prettyName,
} from "../../lib/cloudinary";

async function SportContent({ params }: { params: Promise<{ sport: string }> }) {
  const { sport } = await params;
  const sports = await getSports();
  if (!sports.includes(sport)) notFound();

  const seasons = await getSeasons(sport);
  const groups = await Promise.all(
    seasons.map(async (season) => ({
      season,
      photos: await getPhotos(sport, season),
    }))
  );

  return (
    <>
      <Link href="/" className="text-sm text-gray-400 hover:text-gold">
        ← All sports
      </Link>
      <h1 className="font-display mt-2 text-4xl tracking-wide text-gold">
        {prettyName(sport)}
      </h1>
      {groups.length === 0 && (
        <p className="mt-6 text-gray-400">No photos yet.</p>
      )}
      {groups.map(({ season, photos }) => (
        <section key={season} className="mt-10">
          <h2 className="font-display mb-4 text-2xl tracking-wide text-white">
            {season} season{" "}
            <span className="text-sm text-gray-500">({photos.length} photos)</span>
          </h2>
          <Gallery photos={photos} />
        </section>
      ))}
    </>
  );
}

export default function SportPage({
  params,
}: {
  params: Promise<{ sport: string }>;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Suspense fallback={<p className="text-gray-400">Loading photos…</p>}>
          <SportContent params={params} />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
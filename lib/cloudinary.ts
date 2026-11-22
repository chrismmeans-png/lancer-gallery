import { v2 as cloudinary } from "cloudinary";
import { cacheLife } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export type Photo = {
  id: string;
  thumb: string;
  full: string;
  width: number;
  height: number;
};

export function prettyName(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function getSports(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  const res = await cloudinary.api.root_folders();
  return (res.folders as { name: string }[]).map((f) => f.name).sort();
}

export async function getSeasons(sport: string): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  const res = await cloudinary.api.sub_folders(sport);
  return (res.folders as { name: string }[])
    .map((f) => f.name)
    .sort()
    .reverse();
}

export async function getPhotos(
  sport: string,
  season: string
): Promise<Photo[]> {
  "use cache";
  cacheLife("hours");
  const res = await cloudinary.search
    .expression(`folder:"${sport}/${season}" OR asset_folder:"${sport}/${season}"`)
    .sort_by("created_at", "asc")
    .max_results(500)
    .execute();
  return (
    res.resources as {
      public_id: string;
      secure_url: string;
      width: number;
      height: number;
    }[]
  ).map((r) => ({
    id: r.public_id,
    thumb: r.secure_url.replace(
      "/upload/",
      "/upload/c_fill,w_500,h_400,g_auto,q_auto,f_auto/"
    ),
    full: r.secure_url.replace(
      "/upload/",
      "/upload/c_limit,w_2000,q_auto,f_auto/"
    ),
    width: r.width,
    height: r.height,
  }));
}
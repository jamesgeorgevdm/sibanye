import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";
import { videoShowcase } from "./data/gallery";

// Served at /sitemap.xml. Lists the public, indexable pages only —
// /leave-review is intentionally excluded (token-gated utility page).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Google video sitemap extension entries for the Gallery's Video Showcase.
  const galleryVideos = videoShowcase.videos
    .filter((v) => v.description && v.poster)
    .map((v) => ({
      title: v.title,
      thumbnail_loc: `${SITE_URL}${v.poster}`,
      description: v.description as string,
      content_loc: `${SITE_URL}${v.src}`,
    }));

  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    {
      url: `${SITE_URL}/gallery`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
      videos: galleryVideos,
    },
  ];
}

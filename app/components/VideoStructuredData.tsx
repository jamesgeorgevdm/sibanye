// Emits schema.org VideoObject JSON-LD for each video in the showcase so Google
// can index them for Video search and video rich results. Rendered on the Gallery
// page. Absolute URLs are required by Google, so poster/content paths are prefixed
// with SITE_URL.
import type { VideoShowcase } from "../data/gallery";
import { SITE_URL } from "../lib/site";

const abs = (path: string) => `${SITE_URL}${path}`;

export default function VideoStructuredData({
  showcase,
}: {
  showcase: VideoShowcase;
}) {
  const videos = showcase.videos.filter((v) => v.description && v.poster);

  if (videos.length === 0) return null;

  const data = videos.map((video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: video.poster ? [abs(video.poster)] : undefined,
    uploadDate: video.uploadDate,
    contentUrl: abs(video.src),
    embedUrl: `${SITE_URL}/gallery#${showcase.id}`,
    isFamilyFriendly: true,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
    },
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

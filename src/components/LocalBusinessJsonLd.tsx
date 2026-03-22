import { absoluteUrl, SITE_URL } from "@/config/site";

/**
 * Invisible structured data for search engines (no UI).
 * @see https://schema.org/RecordingStudio
 */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "RecordingStudio",
    name: "Unknown Faces Studio",
    description:
      "Professional audio recording studio in Kaunas, Lithuania. Recording sessions, mixing, creative space for artists.",
    url: SITE_URL,
    image: absoluteUrl("/unknown_faces_logo%20512x512.png"),
    telephone: "+37060623373",
    email: "unknownfacesnotes@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "99 Laisvės alėja",
      addressLocality: "Kaunas",
      postalCode: "44291",
      addressRegion: "Kauno apskritis",
      addressCountry: "LT",
    },
    sameAs: ["https://www.instagram.com/unknownfaces_studio/"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

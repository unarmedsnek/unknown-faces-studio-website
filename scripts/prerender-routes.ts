import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPageSeo, SEO_PATHS, type SeoPageId } from "../src/data/seo-pages";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const sourceIndexPath = path.join(distDir, "index.html");

if (!existsSync(sourceIndexPath)) {
  throw new Error(`Missing build artifact: ${sourceIndexPath}`);
}

const SITE_URL = "https://www.unknownfacesstudio.lt";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "RecordingStudio",
  name: "Unknown Faces Studio",
  description: "Professional audio recording studio in Kaunas, Lithuania. Recording sessions, mixing, creative space for artists.",
  url: SITE_URL,
  image: `${SITE_URL}/unknown_faces_logo%20512x512.png`,
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What equipment do you have in the studio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We use reliable, professional recording equipment that meets high standards. For work, we use the Studio Projects B1 microphone, Beyerdynamic DT 770 PRO headphones, and Yamaha HS7 monitor speakers, which ensure accurate and clear sound. Our equipment is suitable for both vocal recordings and music creation, mixing, or other creative projects – from first demos to serious releases.",
      },
    },
    {
      "@type": "Question",
      name: "Can I bring my own producer or engineer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Studio time belongs to you, so you can bring your own producer, sound engineer, or other creative team members. Whoever has reserved the time is the responsible host in the studio. Also, if needed, we can offer our producer or team members who will help with recording, creative, or technical questions.",
      },
    },
    {
      "@type": "Question",
      name: "What's included in a session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard session includes only studio time – professional equipment, a welcoming environment, and completely uninterrupted creativity. When booking a session, you can additionally choose vocal recording, vocal processing (Mix/master), individual instrumental creation, or creative and technical consultations.",
      },
    },
    {
      "@type": "Question",
      name: "How do I book a session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book a session through our website by filling out a booking request for your chosen date and time. We will contact you by email and confirm the time. Payment is made in cash before or after the session. No advance payments – everything is simple and transparent.",
      },
    },
    {
      "@type": "Question",
      name: "What's your cancellation policy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When booking any studio package, the reservation can be cancelled no less than 12 hours before the scheduled time. If you don't notify us in time, a symbolic penalty of €10 will be applied, which will be added to your next studio package purchase.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer mixing and mastering services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We work with our producer prod.EDTA, who has more than 4 years of experience in music creation. He can record and process vocals, as well as create an instrumental according to your vision and preferences.",
      },
    },
    {
      "@type": "Question",
      name: "Can I purchase additional studio time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can add one EXTRA hour to your existing package, and if other times are not booked you can upgrade your package and use the studio for a longer period. Contact us by email so we can check studio availability and confirm the possibility.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide instruments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The studio has an electric and acoustic guitar, DDJ-400 DJ controller, MIDI controller, headphones, microphone, and speakers – all included in the studio package. Please note that if equipment is damaged, the damage will be assessed and must be covered.",
      },
    },
  ],
};

const routeByPage = Object.entries(SEO_PATHS) as Array<[Exclude<SeoPageId, "notFound">, string]>;
const indexHtml = readFileSync(sourceIndexPath, "utf8");

function escapeHtmlAttribute(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function injectJsonLd(html: string, data: object): string {
  const scriptTag = `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
  return html.replace("</head>", `${scriptTag}\n</head>`);
}

function injectSeo(
  html: string,
  title: string,
  description: string,
  jsonLd?: object
): string {
  let result = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${title}</title>`
  );

  result = result.replace(
    /<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="description" content="${escapeHtmlAttribute(description)}" />`
  );

  if (result === html) {
    throw new Error("Failed to inject SEO tags: placeholders not found.");
  }

  if (jsonLd) {
    result = injectJsonLd(result, jsonLd);
  }

  return result;
}

const schemaByPage: Partial<Record<Exclude<SeoPageId, "notFound">, object>> = {
  home: localBusinessJsonLd,
  location: localBusinessJsonLd,
  faq: faqJsonLd,
};

for (const [pageId, route] of routeByPage) {
  const { title, description } = getPageSeo(pageId, "en");
  const jsonLd = schemaByPage[pageId];
  const routeHtml = injectSeo(indexHtml, title, description, jsonLd);

  if (route === "/") {
    writeFileSync(sourceIndexPath, routeHtml, "utf8");
    continue;
  }

  const cleanRoute = route.replace(/^\/+|\/+$/g, "");
  const routeDir = path.join(distDir, cleanRoute);
  const routeIndexPath = path.join(routeDir, "index.html");

  mkdirSync(routeDir, { recursive: true });
  writeFileSync(routeIndexPath, routeHtml, "utf8");
}
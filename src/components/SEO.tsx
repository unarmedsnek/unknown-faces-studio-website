import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { absoluteUrl, SITE_URL } from "@/config/site";
import { getPageSeo, SEO_PATHS, type SeoPageId } from "@/data/seo-pages";

/** Public path; space encoded for OG URLs */
const DEFAULT_OG_IMAGE_PATH = "/unknown_faces_logo%20512x512.png";
const DEFAULT_OG_IMAGE_WIDTH = "512";
const DEFAULT_OG_IMAGE_HEIGHT = "512";
const DEFAULT_OG_IMAGE_ALT = "Unknown Faces Studio logo";

type Props = {
  page: SeoPageId;
};

export function SEO({ page }: Props) {
  const { language } = useLanguage();
  const location = useLocation();
  const { title, description } = getPageSeo(page, language);
  const imageUrl = absoluteUrl(DEFAULT_OG_IMAGE_PATH);
  const isNotFound = page === "notFound";
  const path = isNotFound ? location.pathname : SEO_PATHS[page];
  const pageUrl = isNotFound ? `${SITE_URL}${location.pathname}` : absoluteUrl(path);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {!isNotFound && <link rel="canonical" href={absoluteUrl(path)} />}
      {isNotFound && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Unknown Faces Studio" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={DEFAULT_OG_IMAGE_WIDTH} />
      <meta property="og:image:height" content={DEFAULT_OG_IMAGE_HEIGHT} />
      <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
      <meta property="og:locale" content={language === "lt" ? "lt_LT" : "en_US"} />
      <meta property="og:locale:alternate" content={language === "lt" ? "en_US" : "lt_LT"} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}

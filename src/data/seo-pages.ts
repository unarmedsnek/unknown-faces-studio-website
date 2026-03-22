export type SeoPageId =
  | "home"
  | "booking"
  | "faq"
  | "about"
  | "location"
  | "rules"
  | "privacy"
  | "notFound";

type Lang = "en" | "lt";

const PAGE_SEO: Record<SeoPageId, Record<Lang, { title: string; description: string }>> = {
  home: {
    en: {
      title: "Unknown Faces Audio Studio | Recording Studio in Kaunas",
      description:
        "Professional recording studio in Kaunas, Lithuania. Book sessions, high-quality gear, acoustically treated rooms. From unknown to known faces.",
    },
    lt: {
      title: "Unknown Faces | Įrašų studija Kaune",
      description:
        "Profesionali įrašų studija Kaune. Studijos laikas, įranga, akustiškai paruoštos patalpos. Užsisakykite sesiją internetu.",
    },
  },
  booking: {
    en: {
      title: "Book a Session | Unknown Faces Studio",
      description:
        "Reserve studio time in Kaunas. Choose a package, pick an available slot, and confirm your recording session online.",
    },
    lt: {
      title: "Rezervacija | Unknown Faces studija",
      description:
        "Užsisakykite studijos laiką Kaune. Pasirinkite paketą ir laisvą laiką, patvirtinkite rezervaciją internetu.",
    },
  },
  faq: {
    en: {
      title: "FAQ | Unknown Faces Recording Studio",
      description:
        "Answers about booking, studio equipment, sessions, pricing, and rules at Unknown Faces recording studio in Kaunas.",
    },
    lt: {
      title: "DUK | Unknown Faces įrašų studija",
      description:
        "Atsakymai apie rezervaciją, studijos įrangą, sesijas, kainas ir taisykles Unknown Faces studijoje Kaune.",
    },
  },
  about: {
    en: {
      title: "About Us | Unknown Faces Studio",
      description:
        "Learn about Unknown Faces: a creative recording space in Kaunas for artists, podcasts, DJ sets, and collaboration.",
    },
    lt: {
      title: "Apie mus | Unknown Faces studija",
      description:
        "Sužinokite apie Unknown Faces: kūrybinę įrašų erdvę Kaune menininkams, podkastams ir bendradarbiavimui.",
    },
  },
  location: {
    en: {
      title: "Location & Contact | Unknown Faces Studio",
      description:
        "Find Unknown Faces at 99 Laisvės alėja, Kaunas. Opening hours, phone, email, and directions to the studio.",
    },
    lt: {
      title: "Vieta ir kontaktai | Unknown Faces",
      description:
        "Unknown Faces studija: Laisvės al. 99, Kaunas. Darbo laikas, telefonas, el. paštas ir kaip mus rasti.",
    },
  },
  rules: {
    en: {
      title: "Studio Rules | Unknown Faces",
      description:
        "Studio usage rules, safety, booking terms, and consent for Unknown Faces recording studio in Kaunas, Lithuania.",
    },
    lt: {
      title: "Studijos taisyklės | Unknown Faces",
      description:
        "Studijos naudojimo taisyklės, sauga, rezervacijos sąlygos ir sutikimas Unknown Faces įrašų studijoje Kaune.",
    },
  },
  privacy: {
    en: {
      title: "Privacy Policy | Unknown Faces Studio",
      description:
        "How Unknown Faces handles your personal data when you use our website and booking services.",
    },
    lt: {
      title: "Privatumo politika | Unknown Faces",
      description:
        "Kaip Unknown Faces tvarko jūsų asmens duomenis naudojantis svetaine ir rezervacijos paslaugomis.",
    },
  },
  notFound: {
    en: {
      title: "Page Not Found | Unknown Faces Studio",
      description: "The page you are looking for does not exist. Return to Unknown Faces studio homepage.",
    },
    lt: {
      title: "Puslapis nerastas | Unknown Faces",
      description: "Ieškomas puslapis neegzistuoja. Grįžkite į Unknown Faces studijos pradžią.",
    },
  },
};

export const SEO_PATHS: Record<Exclude<SeoPageId, "notFound">, string> = {
  home: "/",
  booking: "/booking",
  faq: "/faq",
  about: "/about",
  location: "/location",
  rules: "/rules",
  privacy: "/privacy",
};

export function getPageSeo(page: SeoPageId, lang: Lang) {
  return PAGE_SEO[page][lang];
}

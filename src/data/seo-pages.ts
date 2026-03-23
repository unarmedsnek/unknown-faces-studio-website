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
      title: "Recording Studio | Home | Unknown Faces Studio",
      description:
        "Professional recording studio in Kaunas, Lithuania. Book sessions, high-quality gear, acoustically treated rooms. From unknown to known faces.",
    },
    lt: {
      title: "Įrašų studija | Pradžia | Unknown Faces Studio",
      description:
        "Profesionali įrašų studija Kaune. Studijos laikas, įranga, akustiškai paruoštos patalpos. Užsisakykite sesiją internetu.",
    },
  },
  booking: {
    en: {
      title: "Studio Booking | Booking | Unknown Faces Studio",
      description:
        "Reserve studio time in Kaunas. Choose a package, pick an available slot, and confirm your recording session online.",
    },
    lt: {
      title: "Studijos laikas | Rezervacija | Unknown Faces Studio",
      description:
        "Užsisakykite studijos laiką Kaune. Pasirinkite paketą ir laisvą laiką, patvirtinkite rezervaciją internetu.",
    },
  },
  faq: {
    en: {
      title: "Studio FAQ | FAQ | Unknown Faces Studio",
      description:
        "Answers about booking, studio equipment, sessions, pricing, and rules at Unknown Faces recording studio in Kaunas.",
    },
    lt: {
      title: "DUK | Klausimai | Unknown Faces Studio",
      description:
        "Atsakymai apie rezervaciją, studijos įrangą, sesijas, kainas ir taisykles Unknown Faces studijoje Kaune.",
    },
  },
  about: {
    en: {
      title: "Recording Studio | About | Unknown Faces Studio",
      description:
        "Learn about Unknown Faces: a creative recording space in Kaunas for artists, podcasts, DJ sets, and collaboration.",
    },
    lt: {
      title: "Įrašų studija | Apie mus | Unknown Faces Studio",
      description:
        "Sužinokite apie Unknown Faces: kūrybinę įrašų erdvę Kaune menininkams, podkastams ir bendradarbiavimui.",
    },
  },
  location: {
    en: {
      title: "Studio Location | Contact | Unknown Faces Studio",
      description:
        "Find Unknown Faces at 99 Laisvės alėja, Kaunas. Opening hours, phone, email, and directions to the studio.",
    },
    lt: {
      title: "Kontaktai | Vieta | Unknown Faces Studio",
      description:
        "Unknown Faces studija: Laisvės al. 99, Kaunas. Darbo laikas, telefonas, el. paštas ir kaip mus rasti.",
    },
  },
  rules: {
    en: {
      title: "Studio Rules | Policies | Unknown Faces Studio",
      description:
        "Studio usage rules, safety, booking terms, and consent for Unknown Faces recording studio in Kaunas, Lithuania.",
    },
    lt: {
      title: "Taisyklės | Studija | Unknown Faces Studio",
      description:
        "Studijos naudojimo taisyklės, sauga, rezervacijos sąlygos ir sutikimas Unknown Faces įrašų studijoje Kaune.",
    },
  },
  privacy: {
    en: {
      title: "Privacy Policy | Privacy | Unknown Faces Studio",
      description:
        "How Unknown Faces handles your personal data when you use our website and booking services.",
    },
    lt: {
      title: "Privatumas | Politika | Unknown Faces Studio",
      description:
        "Kaip Unknown Faces tvarko jūsų asmens duomenis naudojantis svetaine ir rezervacijos paslaugomis.",
    },
  },
  notFound: {
    en: {
      title: "Page Not Found | 404 | Unknown Faces Studio",
      description: "The page you are looking for does not exist. Return to Unknown Faces studio homepage.",
    },
    lt: {
      title: "Puslapis nerastas | 404 | Unknown Faces Studio",
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

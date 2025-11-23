export default {
  nav: {
    home: "Pradžia",
    booking: "Rezervacija",
    faq: "DUK",
    about: "Apie Mus",
    location: "Kur Mus Rasti",
  },
  
  home: {
    hero: {
      title: "UNKNOWN FACES",
      subtitle: "iš nežinomų į žinomus veidus",
      bookNow: "REZERVUOK DABAR",
    },
    studio: {
      title: "Mūsų Studija",
      professional: {
        title: "Profesionali Įranga",
        description: "Naujausios kartos įrašymo įranga ir akustiškai apdorotos patalpos aukščiausios kokybės garsui. Mūsų studija aprūpinta pramonės standartu atitinkančia įranga, kad įgyvendintume jūsų viziją.",
      },
      creative: {
        title: "Kūrybinė Erdvė",
        description: "Jaukus ir įkvepiantis aplinka, sukurta padėti menininkams pasirodyti geriausiai. Mūsų erdvė skatina kūrybiškumą ir bendradarbiavimą.",
      },
    },
    packages: {
      title: "Įrašymo Paketai",
      subtitle: "Pasirink tobulą sesiją savo projektui",
      viewAll: "Peržiūrėk Visus Paketus ir Rezervuok",
    },
    instagram: {
      title: "Sekite Mus Instagram",
      post: "Instagram Įrašas",
      handle: "@unknownfaces_studio",
    },
    about: {
      title: "Apie Unknown Faces",
      description1: "Unknown Faces – tai profesionali įrašų studija, skirta padėti menininkams įgyvendinti savo muzikinę viziją. Esame miesto širdyje ir siūlome kūrybinę erdvę su aukščiausios klasės įranga bei patyrusia komanda.",
      description2: "Nesvarbu, ar įrašinėji savo pirmąjį demo, ar dirbi prie viso albumo – mes čia, kad palaikytume tave visame kelyje iš nežinomo į žinomą.",
      learnMore: "Sužinok Daugiau Apie Mus",
    },
  },
  
  booking: {
    title: "Rezervuok Savo Sesiją",
    subtitle: "Pasirink paketą ir užpildyk formą",
    availablePackages: "Galimi Paketai",
    clickToBook: "Paspausk ant paketo, kad rezervuotum sesiją",
    modal: {
      title: "Rezervuoji:",
      timezone: "Laiko juosta: Europos/Vilnius (Lietuva)",
      selectDateTime: "Pasirink Datą ir Laiką",
      availableTimes: "Laisvi Laikai",
      loadingAvailability: "Kraunama prieinamumas...",
      noSlots: "Šiai datai nėra laisvų laikų.",
      packageInfo: "Paketo Info",
      duration: "Trukmė:",
      price: "Kaina:",
      enterInfo: "Įvesk Savo Informaciją",
      fullName: "Vardas ir Pavardė",
      phone: "Telefono Numeris",
      email: "El. paštas",
      selectedPackage: "Pasirinktas Paketas",
      addExtraHour: "Pridėk papildomą valandą (+50$)",
      selectedBooking: "Pasirinkta Rezervacija:",
      at: "",
      completeBooking: "Patvirtinti Rezervaciją",
      creatingBooking: "Kuriama Rezervacija...",
      confirmationNote: "Jūsų rezervacija bus sukurta ir gausite patvirtinimo laišką",
    },
    packages: {
      basic: {
        name: "Pagrindinė Sesija",
        duration: "1 valanda",
        description: "Geriausiai tinka solo atlikėjams ir demo",
      },
      standard: {
        name: "Standartinė Sesija",
        duration: "4 valandos",
        description: "Geriausiai tinka visoms dainoms ir mažoms grupėms",
      },
      premium: {
        name: "Premium Sesija",
        duration: "8 valandos",
        description: "Geriausiai tinka albumams ir profesionaliems projektams",
      },
      fullDay: {
        name: "Visos Dienos Sesija",
        duration: "12 valandų",
        description: "Geriausiai tinka dideliems projektams ir kelioms dainoms",
      },
    },
    toasts: {
      noPackage: {
        title: "Nepasirinktas paketas",
        description: "Prašome pirmiausia pasirinkti paketą.",
      },
      missingInfo: {
        title: "Trūksta Informacijos",
        description: "Prašome užpildyti vardą ir el. paštą.",
      },
      missingDateTime: {
        title: "Trūksta Datos/Laiko",
        description: "Prašome pasirinkti datą ir laisvą laiko langą.",
      },
      success: {
        title: "Rezervacija Patvirtinta! 🎉",
        description: "Jūsų {package} {date} {time} patvirtinta. Tikrinkite el. paštą!",
      },
      failed: {
        title: "Rezervacija Nepavyko",
        description: "Nepavyko sukurti rezervacijos. Bandykite dar kartą.",
      },
      loadFailed: {
        title: "Nepavyko įkelti prieinamumo",
        description: "Nepavyko gauti laisvų laikų. Bandykite dar kartą.",
      },
    },
  },
  
  faq: {
    title: "Dažnai Užduodami Klausimai",
    subtitle: "Visa, ką reikia žinoti apie rezervaciją ir įrašymą",
    questions: [
      {
        question: "Kokia įranga yra studijoje?",
        answer: "Turime pramonės standartus atitinkančią įrašymo įrangą, įskaitant aukštos klasės mikrofonus, preampus, audio sąsajas ir monitoringo sistemas. Mūsų studija aprūpinta analogine ir skaitmenine įrašymo įranga, tinkančia bet kokiam gamybos stiliui.",
      },
      {
        question: "Ar galiu atsivesti savo prodiuserį ar inžinierių?",
        answer: "Žinoma! Galite atsivesti savo prodiuserį ar inžinierių. Taip pat turime patyrusių inžinierių, jei jų reikia.",
      },
      {
        question: "Kas įeina į sesiją?",
        answer: "Kiekviena sesija apima studijos laiką, inžinierių, visą studijos įrangą ir instrumentus bei pagrindinį miksavimą. Galutinis masteringas yra papildoma paslauga.",
      },
      {
        question: "Kaip rezervuoti sesiją?",
        answer: "Galite rezervuoti sesiją per mūsų rezervacijos puslapį užpildydami formą arba naudodami kalendoriaus integraciją. Atsakysime per 24 valandas ir patvirtinsime jūsų rezervaciją.",
      },
      {
        question: "Kokia jūsų atšaukimo politika?",
        answer: "Prašome pranešti apie atšaukimą bent 48 valandas prieš sesiją. Atšaukimai, padaryti mažiau nei 48 valandas iki sesijos, gali būti apmokestinami atšaukimo mokesčiu.",
      },
      {
        question: "Ar teikiate miksavimo ir masteringo paslaugas?",
        answer: "Taip, teikiame ir miksavimo, ir masteringo paslaugas. Šias paslaugas galima pridėti prie jūsų įrašymo sesijos arba užsakyti atskirai dainoms, įrašytoms kitur.",
      },
      {
        question: "Ar galiu įsigyti papildomo studijos laiko?",
        answer: "Taip, galite pridėti papildomų valandų prie savo sesijos. Tiesiog pasirinkite šią parinktį rezervuodami arba praneškite mums sesijos metu, jei reikia daugiau laiko.",
      },
      {
        question: "Ar teikiate instrumentus?",
        answer: "Turime įvairių instrumentų, įskaitant būgnus, gitaras, bosą ir klavišinius. Pasiteiraukite apie konkrečius instrumentus rezervuodami.",
      },
    ],
  },
  
  about: {
    title: "Apie Unknown Faces",
    subtitle: "Mūsų misija, istorija ir skambesys",
    intro1: "Unknown Faces – tai daugiau nei įrašų studija. Tai kūrybinė šventovė, kurioje menininkai paverčia savo viziją realybe. Įkurta tikint, kad kiekvienas balsas vertas būti išgirstas, sukūrėme erdvę, jungiančią profesionalią įrangą su svetinga, menininką pirmaujančia atmosfera.",
    intro2: "Mūsų studija gimė iš paprastos idėjos: sujungti nežinomus menininkus su jų svajonėmis tapti žinomiems. Suprantame iššūkius, su kuriais susiduria pradedantys menininkai, ir esame įsipareigoję teikti prieinamas, aukštos kokybės įrašymo paslaugas, kurios nekompromisuoja su puikumu.",
    intro3: "Nesvarbu, ar įrašote savo pirmąjį demo, ar dešimtą albumą, mūsų komanda kiekvienam projektui skiria tą patį aistrą ir profesionalumą. Tikime bendradarbiavimu, kūrybiškumu ir muzikos galia sujungti žmones.",
    philosophy: {
      title: "Mūsų Filosofija",
      description: "Tikime, kad kiekvienas menininkas ir kiekvienas projektas turi būti vertinami su pagarba ir atsidavimu. Mūsų požiūris – bendradarbiaujantis: dirbame su jumis, kad užfiksuotume tiksliai tokį skambesį, kurį girdite savo galvoje. Jokių šablonų, tik autentiškas menas.",
    },
    space: {
      title: "Erdvė",
      description: "Mūsų studija turi akustiškai apdorotas įrašymo patalpas, patogią poilsio zoną ir naujausios kartos įrangą. Sukūrėme kiekvieną erdvės aspektą taip, kad įkvėptų kūrybiškumą ir užfiksuotų nepriekaištingą audio kokybę.",
    },
    mission: {
      title: "Mūsų Misija",
      quote: "Įgalinti menininkus kiekviename jų kelio etape, teikiant profesionalias įrašymo paslaugas aplinkoje, vertinančioje kūrybiškumą, autentiškumą ir meninį augimą. Iš nežinomo į žinomą – esame čia kiekviename jūsų muzikinės evoliucijos žingsnyje.",
    },
    values: {
      title: "Už Ką Mes Pasisakome",
      quality: {
        title: "Kokybė",
        description: "Profesionali įranga ir patyrę inžinieriai užtikrina, kad kiekvienas įrašas atitinka pramonės standartus.",
      },
      accessibility: {
        title: "Prieinamumas",
        description: "Lankstūs paketai ir kainodara daro profesionalų įrašymą pasiekiamą menininkams visais lygiais.",
      },
      community: {
        title: "Bendruomenė",
        description: "Kuriame palaikančią menininkų bendruomenę, kuri įkvepia ir kelia vienas kitą.",
      },
    },
  },
  
  location: {
    title: "Kur Mus Rasti",
    subtitle: "Aplankyk mus studijos adresu",
    address: {
      title: "Studijos Adresas",
      line1: "Laisvės alėja 99",
      line2: "Kaunas",
      line3: "Kauno apskritis 44291",
      line4: "Lietuva",
    },
    hours: {
      title: "Darbo Laikas",
      weekdays: "Pirmadienis - Penktadienis: 10:00 - 22:00",
      saturday: "Šeštadienis: 12:00 - 20:00",
      sunday: "Sekmadienis: Tik Su Susitarimu",
    },
    email: {
      title: "El. paštas",
    },
    phone: {
      title: "Telefonas",
    },
    directions: {
      title: "Kaip Mus Pasiekti",
      car: {
        title: "Automobiliu:",
        description: "Turime dedikuotą parkavimo vietą už pastato. Įeikite pro pagrindinį įėjimą ir sekite rodykles.",
      },
    },
    mapNote: "📍 Pakeiskite žemėlapio URL į tikrąją studijos vietą",
  },
  
  footer: {
    copyright: "© {year} Unknown Faces. Visos teisės saugomos.",
  },
};


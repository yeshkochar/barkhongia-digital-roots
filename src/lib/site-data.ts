// Central content source for Barkhongia Higher Secondary School.
// Realistic placeholder content — safe to later replace with Lovable Cloud data.

import { getGlobalLanguage } from "./language-state";

function getLocalStorageData(key: string, defaultValue: any) {
  if (typeof window === "undefined") return defaultValue;
  const saved = localStorage.getItem(`barkhongia_db_${key}`);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
}

// Proxy Helpers for localization & dynamic database updates
function createProxy<T extends object>(target: T, dbKey?: string): T {
  return new Proxy(target, {
    get(t, prop) {
      const activeTarget = dbKey ? getLocalStorageData(dbKey, t) : t;
      if (typeof prop === "string") {
        const lang = getGlobalLanguage();
        if (lang === "as") {
          const asProp = `${prop}As`;
          if (asProp in activeTarget) {
            return (activeTarget as any)[asProp];
          }
        }
      }
      return (activeTarget as any)[prop];
    }
  }) as T;
}

function createArrayProxy<T extends object>(target: T[], dbKey?: string): T[] {
  return new Proxy(target, {
    get(t, prop) {
      const currentArray = dbKey ? getLocalStorageData(dbKey, t) : t;
      if (typeof prop === "string" && (prop === "map" || prop === "filter" || prop === "slice" || prop === "find" || prop === "forEach" || prop === "length" || !isNaN(Number(prop)))) {
        if (typeof (currentArray as any)[prop] === "function") {
          return function(this: any, ...args: any[]) {
            const result = (currentArray as any)[prop].apply(currentArray, args);
            if (Array.isArray(result)) {
              return result.map(item => typeof item === "object" && item !== null ? createProxy(item) : item);
            }
            if (typeof result === "object" && result !== null) {
              return createProxy(result);
            }
            return result;
          };
        }
        const val = (currentArray as any)[prop];
        if (typeof val === "object" && val !== null) {
          return createProxy(val);
        }
        return val;
      }
      return (currentArray as any)[prop];
    }
  });
}

function createStringArrayProxy(enArr: readonly string[], asArr: readonly string[], dbKey?: string): readonly string[] {
  return new Proxy(enArr, {
    get(t, prop) {
      const lang = getGlobalLanguage();
      let activeArray = lang === "as" ? asArr : enArr;
      if (dbKey) {
        const stored = getLocalStorageData(dbKey, null);
        if (stored && Array.isArray(stored)) {
          if (stored.length > 0 && typeof stored[0] === "object") {
            activeArray = stored.map(item => lang === "as" ? (item.as || item.en) : item.en);
          } else {
            activeArray = stored;
          }
        }
      }
      if (typeof prop === "string" && (prop === "map" || prop === "filter" || prop === "slice" || prop === "find" || prop === "forEach" || prop === "length" || !isNaN(Number(prop)))) {
        return function(this: any, ...args: any[]) {
          return (activeArray as any)[prop].apply(activeArray, args);
        };
      }
      return (activeArray as any)[prop];
    }
  }) as any;
}

// Raw Data Definitions

const rawSchool = {
  name: "Barkhongia Higher Secondary School",
  nameAs: "বৰখঙীয়া উচ্চতৰ মাধ্যমিক বিদ্যালয়",
  shortName: "Barkhongia HS",
  shortNameAs: "বৰখঙীয়া উঃ মাঃ",
  tagline: "Knowledge \u00b7 Discipline \u00b7 Excellence",
  taglineAs: "জ্ঞান · শৃংখলা · উৎকৰ্ষতা",
  established: 1986,
  location: "Khangia, Jorhat District, Assam, India",
  locationAs: "খঙীয়া, যোৰহাট জিলা, অসম, ভাৰত",
  managedBy: "Department of Education, Government of Assam",
  managedByAs: "শিক্ষা বিভাগ, অসম চৰকাৰ",
  type: "Government Higher Secondary School",
  typeAs: "চৰকাৰী উচ্চতৰ মাধ্যমিক বিদ্যালয়",
  medium: "Assamese",
  mediumAs: "অসমীয়া",
  session: "April",
  sessionAs: "এপ্ৰিল",
  phone: "+91 98640 12345",
  email: "office@barkhongiahs.edu.in",
  address: "Khangia, Dahotia, Jorhat, Assam 785631",
  addressAs: "খঙীয়া, ডহোতীয়া, যোৰহাট, অসম ৭৮৫৬৩১",
  motto: "\u09A4\u09AE\u09B8\u09CB \u09AE\u09BE \u099C\u09CD\u09AF\u09CB\u09A4\u09BF\u09B0\u09CD\u0997\u09AE\u09AF\u09BC", // Tamaso ma jyotirgamaya
  mottoEn: "Lead me from darkness to light",
  mottoEnAs: "অন্ধকাৰৰ পৰা পোহৰলৈ লৈ যাওক",
};

const rawNav = [
  { label: "Home", labelAs: "মুখ্য পৃষ্ঠা", to: "/" },
  { label: "About", labelAs: "বিদ্যালয়ৰ বিষয়ে", to: "/about" },
  { label: "Academics", labelAs: "শৈক্ষিক", to: "/academics" },
  { label: "Faculty", labelAs: "শিক্ষক কৰ্মচাৰী", to: "/faculty" },
  { label: "Facilities", labelAs: "সুবিধা-সমূহ", to: "/facilities" },
  { label: "Gallery", labelAs: "আলোকচিত্ৰ", to: "/gallery" },
  { label: "Achievements", labelAs: "সাফল্যসমূহ", to: "/achievements" },
  { label: "Notices", labelAs: "জাননীসমূহ", to: "/notices" },
  { label: "Events", labelAs: "অনুষ্ঠানসমূহ", to: "/events" },
  { label: "Contact", labelAs: "যোগাযোগ", to: "/contact" },
];

const rawStats = [
  { label: "Established", labelAs: "স্থাপিত", value: 1986, prefix: "", suffix: "", display: "1986", displayAs: "১৯৮৬" },
  { label: "Students Enrolled", labelAs: "নামভৰ্তি কৰা ছাত্ৰ-ছাত্ৰী", value: 640, suffix: "+", suffixAs: "+" },
  { label: "Qualified Teachers", labelAs: "যোগ্যতাসম্পন্ন শিক্ষক", value: 28, suffix: "" },
  { label: "Board Pass Rate", labelAs: "বোৰ্ড পৰীক্ষা উত্তীৰ্ণ হাৰ", value: 97, suffix: "%", suffixAs: "%" },
];

const rawWhyChooseUs = [
  {
    title: "Experienced Teachers",
    titleAs: "অভিজ্ঞ শিক্ষক",
    body: "A dedicated faculty of TET-qualified educators mentoring every student with patience and rigour.",
    bodyAs: "টেট (TET) উত্তীৰ্ণ আৰু অভিজ্ঞ শিক্ষকসকলৰ দ্বাৰা প্ৰতিগৰাকী ছাত্ৰ-ছাত্ৰীক ধৈৰ্য্য আৰু যত্নৰে মাৰ্গদৰ্শন কৰা হয়।",
    icon: "GraduationCap",
  },
  {
    title: "Government Institution",
    titleAs: "চৰকাৰী প্ৰতিষ্ঠান",
    body: "Established in 1986 under the Department of Education, Government of Assam \u2014 recognised and trusted.",
    bodyAs: "অসম চৰকাৰৰ শিক্ষা বিভাগৰ অধীনত ১৯৮৬ চনত স্থাপিত — এটি বিশ্বস্ত আৰু স্বীকৃতিপ্ৰাপ্ত প্ৰতিষ্ঠান।",
    icon: "Landmark",
  },
  {
    title: "Affordable Quality",
    titleAs: "সুলভ মূল্যৰ মানদণ্ড",
    body: "Free, high-standard education that keeps learning accessible to every family in the region.",
    bodyAs: "বিনামূলীয়া তথা উচ্চ মানদণ্ডৰ শিক্ষা যিয়ে অঞ্চলটোৰ প্ৰতিটো পৰিয়ালৰ বাবে শিক্ষা সুলভ কৰি তোলে।",
    icon: "HandCoins",
  },
  {
    title: "Digital Learning",
    titleAs: "ডিজিটেল শিক্ষা",
    body: "Computer-aided classrooms and an ICT lab bringing modern tools into everyday teaching.",
    bodyAs: "কম্পিউটাৰ সহায়কাৰী শ্ৰেণীকোঠা আৰু আই.চি.টি. (ICT) লেবে আধুনিক সঁজুলি শিক্ষাদানত ব্যৱহাৰ কৰে।",
    icon: "MonitorSmartphone",
  },
  {
    title: "Science Education",
    titleAs: "বিজ্ঞান শিক্ষা",
    body: "A working science curriculum with practical learning that builds curiosity and evidence-based thinking.",
    bodyAs: "ব্যৱহাৰিক শিক্ষাৰ সৈতে এক সক্ৰিয় বিজ্ঞান পাঠ্যক্ৰম যিয়ে কৌতুহল আৰু প্ৰমাণ-ভিত্তিক চিন্তা বৃদ্ধি কৰে।",
    icon: "FlaskConical",
  },
  {
    title: "Sports & Playground",
    titleAs: "ক্ৰীড়া আৰু খেলপথাৰ",
    body: "An open playground and inter-school competitions that build discipline, teamwork and fitness.",
    bodyAs: "খন খেলপথাৰ আৰু আন্তঃবিদ্যালয় প্ৰতিযোগিতাসমূহে অনুশাসন, দলীয় মনোভাৱ আৰু শাৰীৰিক সক্ষমতা গঢ়ি তোলে।",
    icon: "Trophy",
  },
  {
    title: "Safe Campus",
    titleAs: "সুৰক্ষিত চৌহদ",
    body: "A secure, walled campus with separate facilities and attentive staff supervision throughout the day.",
    bodyAs: "নিৰাপদ, পকী বেৰাৰে আবৃত চৌহদ য’ত দিনজুৰি শিক্ষক আৰু কৰ্মচাৰীসকলৰ মনোযোগ থাকে।",
    icon: "ShieldCheck",
  },
  {
    title: "Holistic Development",
    titleAs: "সৰ্বাংগীন বিকাশ",
    body: "Beyond exams \u2014 cultural programmes, morning assembly and community values shape well-rounded citizens.",
    bodyAs: "কেৱল পৰীক্ষাই নহয় — সাংস্কৃতিক কাৰ্যসূচী, ৰাতিপুৱাৰ প্ৰাৰ্থনা সভা আৰু সামাজিক মূল্যবোধে এজন সুনাগৰিক হিচাপে গঢ়ি তোলে।",
    icon: "Sprout",
  },
];

const rawFacilities = [
  { title: "Government Building", titleAs: "চৰকাৰী গৃহ", body: "A durable, purpose-built pucca campus maintained under state education infrastructure.", bodyAs: "ৰাজ্য চৰকাৰৰ শিক্ষা আন্তঃগাঁথনিৰ অধীনত ৰক্ষণাবেক্ষণ কৰা এক পকী তথা সুদৃঢ় চৌহদ।", icon: "Building2" },
  { title: "Computer Lab", titleAs: "কম্পিউটাৰ লেব", body: "An ICT@School laboratory equipping students with essential digital literacy.", bodyAs: "ছাত্ৰ-ছাত্ৰীসকলক প্ৰয়োজনীয় ডিজিটেল জ্ঞান প্ৰদান কৰিবলৈ আই.চি.টি. (ICT@School) লেবৰ সুবিধা।", icon: "Laptop" },
  { title: "Computer-Aided Learning", titleAs: "কম্পিউটাৰ সহায়কাৰী শিক্ষাদান", body: "Interactive lessons that make abstract concepts vivid and memorable.", bodyAs: "অভাৰহেড আৰু কম্পিউটাৰ সহায়ত পাঠদান কৰা হয় যাতে জটিল বিষয়সমূহ সহজতে বুজিব পাৰি।", icon: "MonitorPlay" },
  { title: "Science Education", titleAs: "বিজ্ঞান শিক্ষা", body: "Practical science learning that turns the syllabus into hands-on discovery.", bodyAs: "ব্যৱহাৰিক পৰীক্ষা-নিৰীক্ষাৰ জৰিয়তে বিজ্ঞানৰ তাত্বিক কথাবোৰ সহজে শিকোৱা হয়।", icon: "FlaskConical" },
  { title: "Playground", titleAs: "খেলপথাৰ", body: "Ample open ground for athletics, football and the annual sports meet.", bodyAs: "খেলাধুলা, ফুটবল খেল আৰু বাৰ্ষিক ক্ৰীড়া মহোৎসৱৰ বাবে সুপ্ৰশস্ত খেলপথাৰ।", icon: "Dumbbell" },
  { title: "Drinking Water", titleAs: "বিশুদ্ধ খোৱাপানী", body: "Safe, accessible drinking water available across the campus.", bodyAs: "সমগ্ৰ চৌহদত বিশুদ্ধ আৰু সুৰক্ষিত খোৱাপানীৰ সহজ উপলব্ধতা।", icon: "Droplets" },
  { title: "Electricity", titleAs: "বিদ্যুৎ সংযোগ", body: "Reliable power supporting classrooms, the lab and administrative work.", bodyAs: "শ্ৰেণীকোঠা, কম্পিউটাৰ লেব আৰু কাৰ্যালয়ৰ বাবে নিৰ্ভৰযোগ্য বিদ্যুৎ যোগান।", icon: "Zap" },
  { title: "Separate Toilets", titleAs: "পৃথক শৌচালয়", body: "Clean, separate sanitation facilities for girls and boys.", bodyAs: "ছাত্ৰ আৰু ছাত্ৰীসকলৰ বাবে পৰিষ্কাৰ আৰু সুকীয়া শৌচালয়ৰ ব্যৱস্থা।", icon: "Toilet" },
];

const rawFaculty = [
  { name: "Dr. Nabajyoti Bora", nameAs: "ড০ নৱজ্যোতি বৰা", role: "Principal", roleAs: "অধ্যক্ষ", subject: "Administration", subjectAs: "প্ৰশাসন", qual: "M.Sc., Ph.D. (Physics)", exp: "27 years", expAs: "২৭ বছৰ" },
  { name: "Mrs. Runima Saikia", nameAs: "শ্ৰীমতী ৰুণীমা শইকীয়া", role: "Vice Principal", roleAs: "উপাধ্যক্ষা", subject: "Assamese", subjectAs: "অসমীয়া", qual: "M.A., B.Ed.", exp: "22 years", expAs: "২২ বছৰ" },
  { name: "Mr. Pranjal Gogoi", nameAs: "শ্ৰী প্ৰাঞ্জল গগৈ", role: "Senior Teacher", roleAs: "জ্যেষ্ঠ শিক্ষক", subject: "Mathematics", subjectAs: "গণিত", qual: "M.Sc., B.Ed.", exp: "18 years", expAs: "১৮ বছৰ" },
  { name: "Ms. Anwesha Dutta", nameAs: "কুমাৰী অন্বেষা দত্ত", role: "Teacher", roleAs: "সহকাৰী শিক্ষয়িত্ৰী", subject: "General Science", subjectAs: "সাধাৰণ বিজ্ঞান", qual: "M.Sc., B.Ed.", exp: "12 years", expAs: "১২ বছৰ" },
  { name: "Mr. Hemanta Phukan", nameAs: "শ্ৰী হেমন্ত ফুকন", role: "Teacher", roleAs: "সহকাৰী শিক্ষক", subject: "Social Science", subjectAs: "সমাজ বিজ্ঞান", qual: "M.A. (History), B.Ed.", exp: "15 years", expAs: "১৫ বছৰ" },
  { name: "Mrs. Bhaswati Rajkhowa", nameAs: "শ্ৰীমতী ভস্মতী ৰাজখোৱা", role: "Teacher", roleAs: "সহকাৰী শিক্ষয়িত্ৰী", subject: "English", subjectAs: "ইংৰাজী", qual: "M.A. (English), B.Ed.", exp: "14 years", expAs: "১৪ বছৰ" },
  { name: "Mr. Diganta Hazarika", nameAs: "শ্ৰী দিগন্ত হাজৰিকা", role: "Teacher", roleAs: "সহকাৰী শিক্ষক", subject: "Computer Science", subjectAs: "কম্পিউটাৰ বিজ্ঞান", qual: "MCA", exp: "9 years", expAs: "৯ বছৰ" },
  { name: "Ms. Junmoni Konwar", nameAs: "কুমাৰী জুনমণি কোঁৱৰ", role: "Teacher", roleAs: "সহকাৰী শিক্ষয়িত্ৰী", subject: "Assamese", subjectAs: "অসমীয়া", qual: "M.A., B.Ed.", exp: "8 years", expAs: "৮ বছৰ" },
];

const rawSubjects = [
  { name: "English", nameAs: "ইংৰাজী", note: "Language, comprehension & communication", noteAs: "ভাষা, বুজশক্তি আৰু যোগাযোগ" },
  { name: "Assamese", nameAs: "অসমীয়া", note: "Mother-tongue literature & grammar", noteAs: "মাতৃভাষা সাহিত্য আৰু ব্যাকৰণ" },
  { name: "Mathematics", nameAs: "গণিত", note: "Algebra, geometry & problem solving", noteAs: "বীজগণিত, জ্যামিতি আৰু সমস্যা সমাধান" },
  { name: "General Science", nameAs: "সাধাৰণ বিজ্ঞান", note: "Physics, chemistry & biology fundamentals", noteAs: "পদাৰ্থ, ৰসায়ন আৰু জীৱ বিজ্ঞানৰ মৌলিক ধাৰণা" },
  { name: "Social Science", nameAs: "সমাজ বিজ্ঞান", note: "History, geography, civics & economics", noteAs: "ইতিহাস, ভূগোল, নাগৰিক শাস্ত্ৰ আৰু অৰ্থনীতি" },
];

const rawNotices = [
  { id: "n1", title: "Admission open for Class IX \u2014 Academic Session 2026", titleAs: "নৱম শ্ৰেণীৰ নামভৰ্তি মুকলি — শৈক্ষিক বৰ্ষ ২০২৬", category: "Admissions", categoryAs: "নামভৰ্তি", pinned: true, pdf: true },
  { id: "n2", title: "Half-yearly examination routine published", titleAs: "অৰ্ধবাৰ্ষিক পৰীক্ষাৰ সময়সূচী প্ৰকাশ পালে", category: "Examinations", categoryAs: "পৰীক্ষা", pinned: true, pdf: true },
  { id: "n3", title: "Parent-Teacher Meeting on 12 July 2026", titleAs: "১২ জুলাই ২০২৬ তাৰিখে অভিভাৱক-শিক্ষক সভা", category: "General", categoryAs: "সাধাৰণ", pinned: false, pdf: false },
  { id: "n4", title: "Free textbook distribution schedule", titleAs: "বিনামূলীয়া পাঠ্যপুথি বিতৰণৰ সময়সূচী", category: "General", categoryAs: "সাধাৰণ", pinned: false, pdf: true },
  { id: "n5", title: "Independence Day celebration \u2014 rehearsal notice", titleAs: "স্বাধীনতা দিৱস উদযাপন — আখৰাৰ জাননী", category: "Events", categoryAs: "অনুষ্ঠান", pinned: false, pdf: false },
  { id: "n6", title: "Scholarship application window now open", titleAs: "জলপানীৰ আবেদন প্ৰক্ৰিয়া এতিয়া মুকলি", category: "Scholarships", categoryAs: "জলপানী", pinned: false, pdf: true },
  { id: "n7", title: "Revised school timing for summer term", titleAs: "গ্ৰীষ্মকালীন সময়সূচীৰ সংশোধিত সময়", category: "General", categoryAs: "সাধাৰণ", pinned: false, pdf: false },
];

const rawTicker = [
  "Admissions open for Class IX \u2014 Session 2026",
  "Half-yearly examinations begin 15 July",
  "PTM scheduled for 12 July 2026",
  "97% pass rate in HSLC 2025 \u2014 congratulations to all students",
  "Scholarship applications close 30 June",
];

const rawTickerAs = [
  "নৱম শ্ৰেণীৰ নামভৰ্তি মুকলি — শৈক্ষিক বৰ্ষ ২০২৬",
  "অৰ্ধবাৰ্ষিক পৰীক্ষা ১৫ জুলাইৰ পৰা আৰম্ভ হ’ব",
  "১২ জুলাই ২০২৬ তাৰিখে অভিভাৱক-শিক্ষক সভা অনুষ্ঠিত হ’ব",
  "হাইস্কুল শিক্ষান্ত পৰীক্ষা ২০২৫ ত ৯৭% উত্তীৰ্ণ — সকলো ছাত্ৰ-ছাত্ৰীলৈ অভিনন্দন",
  "জলপানীৰ আবেদন ৩০ জুনত বন্ধ হ’ব",
];

const rawEvents = [
  { title: "Annual Sports Meet", titleAs: "বাৰ্ষিক ক্ৰীড়া মহোৎসৱ", date: "2026-02-10", type: "Sports", typeAs: "ক্ৰীড়া", body: "Three days of athletics, football and cultural marching across all classes.", bodyAs: "তিনিদিনীয়া ক্ৰীড়া অনুষ্ঠান য’ত এথলেটিকছ, ফুটবল আৰু শ্ৰেণীসমূহৰ মাজত মাৰ্চপাষ্ট অনুষ্ঠিত হয়।" },
  { title: "Saraswati Puja", titleAs: "সৰস্বতী পূজা", date: "2026-02-14", type: "Festival", typeAs: "উৎসৱ", body: "The school community gathers to honour the goddess of learning.", bodyAs: "বিদ্যাৰ দেৱী সৰস্বতীৰ চৰণত শ্ৰদ্ধা জনাবলৈ সমগ্ৰ বিদ্যালয় একত্ৰিত হয়।" },
  { title: "Science Exhibition", titleAs: "বিজ্ঞান প্ৰদৰ্শনী", date: "2026-04-22", type: "Academic", typeAs: "শৈক্ষিক", body: "Students present working models and experiments to parents and judges.", bodyAs: "ছাত্ৰ-ছাত্ৰীসকলে অভিভাৱক আৰু বিচাৰকসকলৰ সন্মুখত সক্ৰিয় আৰ্হি আৰু পৰীক্ষা প্ৰদৰ্শন কৰে।" },
  { title: "Independence Day", titleAs: "স্বাধীনতা দিৱস", date: "2026-08-15", type: "National", typeAs: "ৰাষ্ট্ৰীয়", body: "Flag hoisting, cultural programme and prize distribution.", bodyAs: "পতাকা উত্তোলন, সাংস্কৃতিক কাৰ্যসূচী আৰু বঁটা বিতৰণ।" },
  { title: "Annual Function", titleAs: "বাৰ্ষিক অধিবেশন", date: "2026-12-18", type: "Cultural", typeAs: "সাংস্কৃতিক", body: "An evening of music, dance, drama and recognition of achievement.", bodyAs: "সংগীত, নৃত্য, নাটক আৰু ছাত্ৰ-ছাত্ৰীৰ সফলতাৰ স্বীকৃতি প্ৰদানৰ এক মনোজ্ঞ সন্ধিয়া।" },
];

const rawAchievements = [
  { year: "2025", title: "97% HSLC Pass Rate", titleAs: "৯৭% হাইস্কুল শিক্ষান্ত পৰীক্ষাত উত্তীৰ্ণ হাৰ", body: "Highest board result in the school's history with 14 students in the first division.", bodyAs: "বিদ্যালয়ৰ ইতিহাসত সৰ্বোচ্চ বোৰ্ড ফলাফল, ১৪ গৰাকী ছাত্ৰ-ছাত্ৰীয়ে প্ৰথম বিভাগত উত্তীৰ্ণ।" },
  { year: "2024", title: "District Science Fair Winner", titleAs: "জিলা বিজ্ঞান মেলাৰ বিজয়ী", body: "Class X team secured first place for a low-cost water purification model.", bodyAs: "দহম শ্ৰেণীৰ ছাত্ৰ-ছাত্ৰীয়ে কম খৰচী পানী ফিল্টাৰ আৰ্হিৰ বাবে জিলা পৰ্যায়ত প্ৰথম স্থান দখল কৰে।" },
  { year: "2023", title: "Zonal Football Champions", titleAs: "আঞ্চলিক ফুটবল চেম্পিয়ন", body: "The boys' team lifted the inter-school zonal football trophy.", bodyAs: "বিদ্যালয়ৰ ছাত্ৰ দলে আন্তঃবিদ্যালয় আঞ্চলিক ফুটবল ট্ৰফী লাভ কৰিবলৈ সক্ষম হয়।" },
  { year: "2022", title: "State Recognition for ICT", titleAs: "আই.চি.টি. ৰ বাবে ৰাজ্যিক স্বীকৃতি", body: "Recognised among the best-run ICT@School computer labs in the district.", bodyAs: "জিলাখনৰ ভিতৰতে শ্ৰেষ্ঠ কম্পিউটাৰ লেব (ICT@School) ৰ বাবে চৰকাৰী স্বীকৃতি লাভ।" },
  { year: "2019", title: "Best Morning Assembly Programme", titleAs: "শ্ৰেষ্ঠ ৰাতিপুৱাৰ প্ৰাৰ্থনা সভা কাৰ্যসূচী", body: "Awarded at the district level for discipline and cultural presentation.", bodyAs: "অনুশাসন আৰু সাংস্কৃতিক উপস্থাপনাৰ বাবে জিলা পৰ্যায়ত পুৰস্কৃত।" },
];

const rawTestimonials = [
  { quote: "The teachers here treat every child as their own. My daughter grew in confidence and results the moment she joined.", quoteAs: "এখনেৰ শিক্ষকসকলে প্ৰতিগৰাকী শিশুক নিজৰ সন্তানৰ দৰে ব্যৱহাৰ কৰে। মোৰ কন্যা ইয়াত ভৰ্তি হোৱাৰ পিছৰে পৰা আত্মবিশ্বাস আৰু ফলাফল দুয়োটাতে উন্নতি কৰিছে।", name: "Mridula Bora", nameAs: "মৃদুলা বৰা", role: "Parent, Class X", roleAs: "অভিভাৱক, দশম শ্ৰেণী" },
  { quote: "I learnt to work hard and dream bigger. The science lab and my teachers made me fall in love with learning.", quoteAs: "মই পৰিশ্ৰম কৰিবলৈ আৰু ডাঙৰ সপোন দেখিবলৈ শিকিলোঁ। বিজ্ঞানাগাৰ আৰু মোৰ শিক্ষকসকলে মোক শিক্ষাৰ প্ৰতি আকৰ্ষিত কৰিলে।", name: "Ankit Saikia", nameAs: "অংকিত শইকীয়া", role: "Alumnus, 2021 batch", roleAs: "প্ৰ প্রাক্তন ছাত্ৰ, ২০২১ বেচ" },
  { quote: "A government school with the heart of a family. Discipline, values and genuine care \u2014 that is Barkhongia.", quoteAs: "পৰিয়ালৰ দৰে মৰম থকা এখন চৰকাৰী বিদ্যালয়। অনুশাসন, আদৰ্শ আৰু প্ৰকৃত যত্ন — এয়াই হৈছে বৰখঙীয়া।", name: "Rupam Gogoi", nameAs: "ৰূপম গগৈ", role: "Alumnus & Guardian", roleAs: "প্ৰ প্রাক্তন ছাত্ৰ আৰু অভিভাৱক" },
  { quote: "The morning assembly and cultural programmes taught me things no textbook could. I am proud to be from here.", quoteAs: "ৰাতিপুৱাৰ প্ৰাৰ্থনা সভা আৰু সাংস্কৃতিক অনুষ্ঠানসমূহে মোক এনে কিছুমান কথা শিকাইছে যিবোৰ কোনো কিতাপত পোৱা নাযায়। মই ইয়াৰ ছাত্ৰী হিচাপে গৌৰৱ অনুভৱ কৰোঁ।", name: "Priyanka Dutta", nameAs: "প্ৰিয়ংকা দত্ত", role: "Student, Class IX", roleAs: "ছাত্ৰী, নৱম শ্ৰেণী" },
];

const rawFaqs = [
  { q: "When does the admission session begin?", qAs: "নামভৰ্তিৰ শৈক্ষিক বৰ্ষ কেতিয়া আৰম্ভ হয়?", a: "The academic session begins in April. Class IX admissions typically open in late March each year. Watch the Notice Board for the exact schedule.", aAs: "শৈক্ষিক বৰ্ষটো এপ্ৰিল মাহত আৰম্ভ হয়। নৱম শ্ৰেণীৰ নামভৰ্তি সাধাৰণতে প্ৰতি বছৰে মাৰ্চ মাহৰ শেষৰ ফালে মুকলি হয়। সঠিক সময়সূচী জানিবলৈ জাননী ফলক লক্ষ্য কৰিব।" },
  { q: "What is the medium of instruction?", qAs: "শিক্ষাদানৰ মাধ্যম কি?", a: "The primary medium of instruction is Assamese, with English taught as a core language subject.", aAs: "শিক্ষাদানৰ প্ৰধান মাধ্যম হৈছে অসমীয়া, আৰু ইংৰাজীক এক মুখ্য বিষয় হিচাপে পঢ়ুওৱা হয়।" },
  { q: "Which classes does the school offer?", qAs: "বিদ্যালয়খনত কোন কোন শ্ৰেণী আছে?", a: "The school currently offers Classes IX and X under the Assam board curriculum.", aAs: "বিদ্যালয়খনত বৰ্তমান অসম বোৰ্ডৰ অধীনত নৱম আৰু দশম শ্ৰেণী উপলব্ধ।" },
  { q: "Is there any admission fee?", qAs: "নামভৰ্তিৰ কোনো মাচুল আছে নেকি?", a: "As a government institution, education is free. Nominal charges may apply only for specific materials \u2014 details are shared during admission.", aAs: "চৰকাৰী প্ৰতিষ্ঠান হোৱা বাবে ইয়াত শিক্ষা সম্পূৰ্ণ বিনামূলীয়া। কেৱল বিশেষ কিছু সামগ্ৰীৰ বাবেহে সামান্য চাৰ্জ ল’ব পাৰে — ইয়াৰ সবিশেষ নামভৰ্তিৰ সময়ত জনোৱা হয়।" },
  { q: "What are the school timings?", qAs: "বিদ্যালয়ৰ সময়সূচী কি?", a: "Regular timing is 9:30 AM to 3:00 PM, Monday to Saturday, with revised timing during the summer term.", aAs: "সাধাৰণ সময় সোমবাৰৰ পৰা শনিবাৰলৈ ৰাতিপুৱা ৯:৩০ বজাৰ পৰা আবেলি ৩:০০ বজালৈ, গ্ৰীষ্মকালত এই সময়সূচী সলনি কৰা হয়।" },
  { q: "How can I get a Transfer Certificate or documents?", qAs: "মই কেনেকৈ বদলি প্ৰমাণপত্ৰ (TC) পাব পাৰোঁ?", a: "Visit the school office during working hours or download the relevant form from the Downloads section and submit it to administration.", aAs: "বিদ্যালয়ৰ কাৰ্যালয় সময়ত যোগাযোগ কৰক অথবা 'ডাউনলোড' শিতানৰ পৰা প্ৰয়োজনীয় প্ৰপত্ৰ ডাউনলোড কৰি কাৰ্যালয়ত জমা কৰক।" },
];

const rawDownloads = [
  { title: "Class IX Admission Form", titleAs: "নৱম শ্ৰেণীৰ নামভৰ্তি প্ৰপত্ৰ", category: "Admissions", categoryAs: "নামভৰ্তি", size: "220 KB" },
  { title: "School Prospectus 2026", titleAs: "বিদ্যালয়ৰ প্ৰস্পেক্টাছ ২০২৬", category: "Prospectus", categoryAs: "প্ৰস্পেক্টাছ", size: "1.4 MB" },
  { title: "Assam Board Syllabus (IX\u2013X)", titleAs: "অসম বোৰ্ডৰ পাঠ্যক্ৰম (নৱম-দশম)", category: "Syllabus", categoryAs: "পাঠ্যক্ৰম", size: "860 KB" },
  { title: "Previous Year Question Papers", titleAs: "পূৰ্বৱৰ্তী বৰ্ষৰ প্ৰশ্নকাকত", category: "Question Papers", categoryAs: "প্ৰশ্নকাকত", size: "2.1 MB" },
  { title: "Class Timetable 2026", titleAs: "শ্ৰেণীৰ সময়সূচী ২০২৬", category: "Timetable", categoryAs: "সময়সূচী", size: "180 KB" },
  { title: "Latest Circulars", titleAs: "শেহতীয়া জাননী/পত্ৰ", category: "Circulars", categoryAs: "জাননী", size: "340 KB" },
  { title: "Annual Report 2024\u201325", titleAs: "বাৰ্ষিক প্ৰতিবেদন ২০২৪–২৫", category: "Reports", categoryAs: "প্ৰতিবেদন", size: "1.9 MB" },
];

const rawGalleryCategories = ["Campus", "Students", "Sports", "Morning Assembly", "Celebrations"] as const;
const rawGalleryCategoriesAs = ["চৌহদ", "ছাত্ৰ-ছাত্ৰী", "ক্ৰীড়া", "প্ৰাৰ্থনা সভা", "উৎসৱ"] as const;

// FAQs not imported directly elsewhere, but let's make sure it is in sync
export const faqs = createArrayProxy(rawFaqs, "faqs");

// Exported Proxied Constants

export const school = createProxy(rawSchool, "school");
export const nav = createArrayProxy(rawNav, "nav");
export const stats = createArrayProxy(rawStats, "stats");
export const whyChooseUs = createArrayProxy(rawWhyChooseUs, "whyChooseUs");
export const facilities = createArrayProxy(rawFacilities, "facilities");
export const faculty = createArrayProxy(rawFaculty, "faculty");
export const subjects = createArrayProxy(rawSubjects, "subjects");
export const notices = createArrayProxy(rawNotices, "notices");
export const ticker = createStringArrayProxy(rawTicker, rawTickerAs, "ticker");
export const events = createArrayProxy(rawEvents, "events");
export const achievements = createArrayProxy(rawAchievements, "achievements");
export const testimonials = createArrayProxy(rawTestimonials, "testimonials");
export const downloads = createArrayProxy(rawDownloads, "downloads");
export const galleryCategories = createStringArrayProxy(rawGalleryCategories, rawGalleryCategoriesAs);

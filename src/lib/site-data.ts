// Central content source for Barkhongia Higher Secondary School.
// Realistic placeholder content — safe to later replace with Lovable Cloud data.

export const school = {
  name: "Barkhongia Higher Secondary School",
  shortName: "Barkhongia HS",
  tagline: "Knowledge \u00b7 Discipline \u00b7 Excellence",
  established: 1986,
  location: "Khangia, Jorhat District, Assam, India",
  managedBy: "Department of Education, Government of Assam",
  type: "Government Higher Secondary School",
  medium: "Assamese",
  session: "April",
  phone: "+91 98640 12345",
  email: "office@barkhongiahs.edu.in",
  address: "Khangia, Dahotia, Jorhat, Assam 785631",
  motto: "\u09A4\u09AE\u09B8\u09CB \u09AE\u09BE \u099C\u09CD\u09AF\u09CB\u09A4\u09BF\u09B0\u09CD\u0997\u09AE\u09AF\u09BC", // Tamaso ma jyotirgamaya
  mottoEn: "Lead me from darkness to light",
} as const;

export const nav: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Academics", to: "/academics" },
  { label: "Faculty", to: "/faculty" },
  { label: "Facilities", to: "/facilities" },
  { label: "Gallery", to: "/gallery" },
  { label: "Achievements", to: "/achievements" },
  { label: "Notices", to: "/notices" },
  { label: "Events", to: "/events" },
  { label: "Contact", to: "/contact" },
];

export const stats = [
  { label: "Established", value: 1986, prefix: "", suffix: "", display: "1986" },
  { label: "Students Enrolled", value: 640, suffix: "+" },
  { label: "Qualified Teachers", value: 28, suffix: "" },
  { label: "Board Pass Rate", value: 97, suffix: "%" },
];

export const whyChooseUs = [
  {
    title: "Experienced Teachers",
    body: "A dedicated faculty of TET-qualified educators mentoring every student with patience and rigour.",
    icon: "GraduationCap",
  },
  {
    title: "Government Institution",
    body: "Established in 1986 under the Department of Education, Government of Assam \u2014 recognised and trusted.",
    icon: "Landmark",
  },
  {
    title: "Affordable Quality",
    body: "Free, high-standard education that keeps learning accessible to every family in the region.",
    icon: "HandCoins",
  },
  {
    title: "Digital Learning",
    body: "Computer-aided classrooms and an ICT lab bringing modern tools into everyday teaching.",
    icon: "MonitorSmartphone",
  },
  {
    title: "Science Education",
    body: "A working science curriculum with practical learning that builds curiosity and evidence-based thinking.",
    icon: "FlaskConical",
  },
  {
    title: "Sports & Playground",
    body: "An open playground and inter-school competitions that build discipline, teamwork and fitness.",
    icon: "Trophy",
  },
  {
    title: "Safe Campus",
    body: "A secure, walled campus with separate facilities and attentive staff supervision throughout the day.",
    icon: "ShieldCheck",
  },
  {
    title: "Holistic Development",
    body: "Beyond exams \u2014 cultural programmes, morning assembly and community values shape well-rounded citizens.",
    icon: "Sprout",
  },
];

export const facilities = [
  { title: "Government Building", body: "A durable, purpose-built pucca campus maintained under state education infrastructure.", icon: "Building2" },
  { title: "Computer Lab", body: "An ICT@School laboratory equipping students with essential digital literacy.", icon: "Laptop" },
  { title: "Computer-Aided Learning", body: "Interactive lessons that make abstract concepts vivid and memorable.", icon: "MonitorPlay" },
  { title: "Science Education", body: "Practical science learning that turns the syllabus into hands-on discovery.", icon: "FlaskConical" },
  { title: "Playground", body: "Ample open ground for athletics, football and the annual sports meet.", icon: "Dumbbell" },
  { title: "Drinking Water", body: "Safe, accessible drinking water available across the campus.", icon: "Droplets" },
  { title: "Electricity", body: "Reliable power supporting classrooms, the lab and administrative work.", icon: "Zap" },
  { title: "Separate Toilets", body: "Clean, separate sanitation facilities for girls and boys.", icon: "Toilet" },
];

export const faculty = [
  { name: "Dr. Nabajyoti Bora", role: "Principal", subject: "Administration", qual: "M.Sc., Ph.D. (Physics)", exp: "27 years" },
  { name: "Mrs. Runima Saikia", role: "Vice Principal", subject: "Assamese", qual: "M.A., B.Ed.", exp: "22 years" },
  { name: "Mr. Pranjal Gogoi", role: "Senior Teacher", subject: "Mathematics", qual: "M.Sc., B.Ed.", exp: "18 years" },
  { name: "Ms. Anwesha Dutta", role: "Teacher", subject: "General Science", qual: "M.Sc., B.Ed.", exp: "12 years" },
  { name: "Mr. Hemanta Phukan", role: "Teacher", subject: "Social Science", qual: "M.A. (History), B.Ed.", exp: "15 years" },
  { name: "Mrs. Bhaswati Rajkhowa", role: "Teacher", subject: "English", qual: "M.A. (English), B.Ed.", exp: "14 years" },
  { name: "Mr. Diganta Hazarika", role: "Teacher", subject: "Computer Science", qual: "MCA", exp: "9 years" },
  { name: "Ms. Junmoni Konwar", role: "Teacher", subject: "Assamese", qual: "M.A., B.Ed.", exp: "8 years" },
];

export const subjects = [
  { name: "English", note: "Language, comprehension & communication" },
  { name: "Assamese", note: "Mother-tongue literature & grammar" },
  { name: "Mathematics", note: "Algebra, geometry & problem solving" },
  { name: "General Science", note: "Physics, chemistry & biology fundamentals" },
  { name: "Social Science", note: "History, geography, civics & economics" },
];

export const notices = [
  { id: "n1", title: "Admission open for Class IX \u2014 Academic Session 2026", date: "2026-03-28", category: "Admissions", pinned: true, pdf: true },
  { id: "n2", title: "Half-yearly examination routine published", date: "2026-06-30", category: "Examinations", pinned: true, pdf: true },
  { id: "n3", title: "Parent-Teacher Meeting on 12 July 2026", date: "2026-07-01", category: "General", pinned: false, pdf: false },
  { id: "n4", title: "Free textbook distribution schedule", date: "2026-04-15", category: "General", pinned: false, pdf: true },
  { id: "n5", title: "Independence Day celebration \u2014 rehearsal notice", date: "2026-08-05", category: "Events", pinned: false, pdf: false },
  { id: "n6", title: "Scholarship application window now open", date: "2026-05-20", category: "Scholarships", pinned: false, pdf: true },
  { id: "n7", title: "Revised school timing for summer term", date: "2026-04-02", category: "General", pinned: false, pdf: false },
];

export const ticker = [
  "Admissions open for Class IX \u2014 Session 2026",
  "Half-yearly examinations begin 15 July",
  "PTM scheduled for 12 July 2026",
  "97% pass rate in HSLC 2025 \u2014 congratulations to all students",
  "Scholarship applications close 30 June",
];

export const events = [
  { title: "Annual Sports Meet", date: "2026-02-10", type: "Sports", body: "Three days of athletics, football and cultural marching across all classes." },
  { title: "Saraswati Puja", date: "2026-02-14", type: "Festival", body: "The school community gathers to honour the goddess of learning." },
  { title: "Science Exhibition", date: "2026-04-22", type: "Academic", body: "Students present working models and experiments to parents and judges." },
  { title: "Independence Day", date: "2026-08-15", type: "National", body: "Flag hoisting, cultural programme and prize distribution." },
  { title: "Annual Function", date: "2026-12-18", type: "Cultural", body: "An evening of music, dance, drama and recognition of achievement." },
];

export const achievements = [
  { year: "2025", title: "97% HSLC Pass Rate", body: "Highest board result in the school's history with 14 students in the first division." },
  { year: "2024", title: "District Science Fair Winner", body: "Class X team secured first place for a low-cost water purification model." },
  { year: "2023", title: "Zonal Football Champions", body: "The boys' team lifted the inter-school zonal football trophy." },
  { year: "2022", title: "State Recognition for ICT", body: "Recognised among the best-run ICT@School computer labs in the district." },
  { year: "2019", title: "Best Morning Assembly Programme", body: "Awarded at the district level for discipline and cultural presentation." },
];

export const testimonials = [
  { quote: "The teachers here treat every child as their own. My daughter grew in confidence and results the moment she joined.", name: "Mridula Bora", role: "Parent, Class X" },
  { quote: "I learnt to work hard and dream bigger. The science lab and my teachers made me fall in love with learning.", name: "Ankit Saikia", role: "Alumnus, 2021 batch" },
  { quote: "A government school with the heart of a family. Discipline, values and genuine care \u2014 that is Barkhongia.", name: "Rupam Gogoi", role: "Alumnus & Guardian" },
  { quote: "The morning assembly and cultural programmes taught me things no textbook could. I am proud to be from here.", name: "Priyanka Dutta", role: "Student, Class IX" },
];

export const faqs = [
  { q: "When does the admission session begin?", a: "The academic session begins in April. Class IX admissions typically open in late March each year. Watch the Notice Board for the exact schedule." },
  { q: "What is the medium of instruction?", a: "The primary medium of instruction is Assamese, with English taught as a core language subject." },
  { q: "Which classes does the school offer?", a: "The school currently offers Classes IX and X under the Assam board curriculum." },
  { q: "Is there any admission fee?", a: "As a government institution, education is free. Nominal charges may apply only for specific materials \u2014 details are shared during admission." },
  { q: "What are the school timings?", a: "Regular timing is 9:30 AM to 3:00 PM, Monday to Saturday, with revised timing during the summer term." },
  { q: "How can I get a Transfer Certificate or documents?", a: "Visit the school office during working hours or download the relevant form from the Downloads section and submit it to administration." },
];

export const downloads = [
  { title: "Class IX Admission Form", category: "Admissions", size: "220 KB" },
  { title: "School Prospectus 2026", category: "Prospectus", size: "1.4 MB" },
  { title: "Assam Board Syllabus (IX\u2013X)", category: "Syllabus", size: "860 KB" },
  { title: "Previous Year Question Papers", category: "Question Papers", size: "2.1 MB" },
  { title: "Class Timetable 2026", category: "Timetable", size: "180 KB" },
  { title: "Latest Circulars", category: "Circulars", size: "340 KB" },
  { title: "Annual Report 2024\u201325", category: "Reports", size: "1.9 MB" },
];

export const galleryCategories = ["Campus", "Students", "Sports", "Morning Assembly", "Celebrations"] as const;

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { 
  Lock, Settings, Plus, Edit, Trash2, Save, RefreshCw, LogOut, 
  FileText, CheckCircle2, Megaphone, CalendarDays, GraduationCap, Building2, BookOpen
} from "lucide-react";

// Get raw default data structures to compare/initialize
import * as defaultData from "@/lib/site-data";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const { triggerUpdate, language } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // DB States
  const [school, setSchool] = useState<any>(null);
  const [notices, setNotices] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [faculty, setFaculty] = useState<any[]>([]);
  const [facilities, setFacilities] = useState<any[]>([]);
  const [ticker, setTicker] = useState<any[]>([]);

  // Dialog / Edit States
  const [editingNotice, setEditingNotice] = useState<any | null>(null);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<any | null>(null);
  const [editingFacility, setEditingFacility] = useState<any | null>(null);
  const [editingTickerItem, setEditingTickerItem] = useState<{ index: number; en: string; as: string } | null>(null);

  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isFacilityModalOpen, setIsFacilityModalOpen] = useState(false);
  const [isTickerModalOpen, setIsTickerModalOpen] = useState(false);

  // Authentication check on mount
  useEffect(() => {
    const auth = sessionStorage.getItem("admin_authenticated") === "true";
    setIsAuthenticated(auth);
    loadDbData();
  }, []);

  const loadDbData = () => {
    // Helper to get raw data
    const getLocal = (key: string, def: any) => {
      const saved = localStorage.getItem(`barkhongia_db_${key}`);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return def;
        }
      }
      return def;
    };

    // Get school data (removes Proxy wraps)
    const schoolData = getLocal("school", {
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
      motto: "তমসো মা জ্যোতিৰ্গময়",
      mottoAs: "তমসো মা জ্যোতিৰ্গময়",
      mottoEn: "Lead me from darkness to light",
      mottoEnAs: "অন্ধকাৰৰ পৰা পোহৰলৈ লৈ যাওক",
    });

    const noticesData = getLocal("notices", [
      { id: "n1", title: "Admission open for Class IX \u2014 Academic Session 2026", titleAs: "নৱম শ্ৰেণীৰ নামভৰ্তি মুকলি — শৈক্ষিক বৰ্ষ ২০২৬", category: "Admissions", categoryAs: "নামভৰ্তি", pinned: true, pdf: true },
      { id: "n2", title: "Half-yearly examination routine published", titleAs: "অৰ্ধবাৰ্ষিক পৰীক্ষাৰ সময়সূচী প্ৰকাশ পালে", category: "Examinations", categoryAs: "পৰীক্ষা", pinned: true, pdf: true },
      { id: "n3", title: "Parent-Teacher Meeting on 12 July 2026", titleAs: "১২ জুলাই ২০২৬ তাৰিখে অভিভাৱক-শিক্ষক সভা", category: "General", categoryAs: "সাধাৰণ", pinned: false, pdf: false },
      { id: "n4", title: "Free textbook distribution schedule", titleAs: "বিনামূলীয়া পাঠ্যপুথি বিতৰণৰ সময়সূচী", category: "General", categoryAs: "সাধাৰণ", pinned: false, pdf: true },
      { id: "n5", title: "Independence Day celebration \u2014 rehearsal notice", titleAs: "স্বাধীনতা দিৱস উদযাপন — আখৰাৰ জাননী", category: "Events", categoryAs: "অনুষ্ঠান", pinned: false, pdf: false },
      { id: "n6", title: "Scholarship application window now open", titleAs: "জলপানীৰ আবেদন প্ৰক্ৰিয়া এতিয়া মুকলি", category: "Scholarships", categoryAs: "জলপানী", pinned: false, pdf: true },
      { id: "n7", title: "Revised school timing for summer term", titleAs: "গ্ৰীষ্মকালীন সময়সূচীৰ সংশোধিত সময়", category: "General", categoryAs: "সাধাৰণ", pinned: false, pdf: false },
    ]);

    const eventsData = getLocal("events", [
      { title: "Annual Sports Meet", titleAs: "বাৰ্ষিক ক্ৰীড়া মহোৎসৱ", date: "2026-02-10", type: "Sports", typeAs: "ক্ৰীড়া", body: "Three days of athletics, football and cultural marching across all classes.", bodyAs: "তিনিদিনীয়া ক্ৰীড়া অনুষ্ঠান য’ত এথলেটিকছ, ফুটবল আৰু শ্ৰেণীসমূহৰ মাজত মাৰ্চপাষ্ট অনুষ্ঠিত হয়।" },
      { title: "Saraswati Puja", titleAs: "সৰস্বতী পূজা", date: "2026-02-14", type: "Festival", typeAs: "উৎসৱ", body: "The school community gathers to honour the goddess of learning.", bodyAs: "বিদ্যাৰ দেৱী সৰস্বতীৰ চৰণত শ্ৰদ্ধা জনাবলৈ সমগ্ৰ বিদ্যালয় একত্ৰিত হয়।" },
      { title: "Science Exhibition", titleAs: "বিজ্ঞান প্ৰদৰ্শনী", date: "2026-04-22", type: "Academic", typeAs: "শৈক্ষিক", body: "Students present working models and experiments to parents and judges.", bodyAs: "ছাত্ৰ-ছাত্ৰীসকলে অভিভাৱক আৰু বিচাৰকসকলৰ সন্মুখত সক্ৰিয় আৰ্হি আৰু পৰীক্ষা প্ৰদৰ্শন কৰে।" },
      { title: "Independence Day", titleAs: "স্বাধীনতা দিৱস", date: "2026-08-15", type: "National", typeAs: "ৰাষ্ট্ৰীয়", body: "Flag hoisting, cultural programme and prize distribution.", bodyAs: "পতাকা উত্তোলন, সাংস্কৃতিক কাৰ্যসূচী আৰু বঁটা বিতৰণ।" },
      { title: "Annual Function", titleAs: "বাৰ্ষিক অধিবেশন", date: "2026-12-18", type: "Cultural", typeAs: "সাংস্কৃতিক", body: "An evening of music, dance, drama and recognition of achievement.", bodyAs: "সংগীত, নৃত্য, নাটক আৰু ছাত্ৰ-ছাত্ৰীৰ সফলতাৰ স্বীকৃতি প্ৰদানৰ এক মনোজ্ঞ সন্ধিয়া।" },
    ]);

    const facultyData = getLocal("faculty", [
      { name: "Dr. Nabajyoti Bora", nameAs: "ড০ নৱজ্যোতি বৰা", role: "Principal", roleAs: "অধ্যক্ষ", subject: "Administration", subjectAs: "প্ৰশাসন", qual: "M.Sc., Ph.D. (Physics)", exp: "27 years", expAs: "২৭ বছৰ" },
      { name: "Mrs. Runima Saikia", nameAs: "শ্ৰীমতী ৰুণীমা শইকীয়া", role: "Vice Principal", roleAs: "উপাধ্যক্ষা", subject: "Assamese", subjectAs: "অসমীয়া", qual: "M.A., B.Ed.", exp: "22 years", expAs: "২২ বছৰ" },
      { name: "Mr. Pranjal Gogoi", nameAs: "শ্ৰী প্ৰাঞ্জল গগৈ", role: "Senior Teacher", roleAs: "জ্যেষ্ঠ শিক্ষক", subject: "Mathematics", subjectAs: "গণিত", qual: "M.Sc., B.Ed.", exp: "18 years", expAs: "১৮ বছৰ" },
      { name: "Ms. Anwesha Dutta", nameAs: "কুমাৰী অন্বেষা দত্ত", role: "Teacher", roleAs: "সহকাৰী শিক্ষয়িত্ৰী", subject: "General Science", subjectAs: "সাধাৰণ বিজ্ঞান", qual: "M.Sc., B.Ed.", exp: "12 years", expAs: "১২ বছৰ" },
      { name: "Mr. Hemanta Phukan", nameAs: "শ্ৰী হেমন্ত ফুকন", role: "Teacher", roleAs: "সহকাৰী শিক্ষক", subject: "Social Science", subjectAs: "সমাজ বিজ্ঞান", qual: "M.A. (History), B.Ed.", exp: "15 years", expAs: "১৫ বছৰ" },
      { name: "Mrs. Bhaswati Rajkhowa", nameAs: "শ্ৰীমতী ভস্মতী ৰাজখোৱা", role: "Teacher", roleAs: "সহকাৰী শিক্ষয়িত্ৰী", subject: "English", subjectAs: "ইংৰাজী", qual: "M.A. (English), B.Ed.", exp: "14 years", expAs: "১৪ বছৰ" },
      { name: "Mr. Diganta Hazarika", nameAs: "শ্ৰী দিগন্ত হাজৰিকা", role: "Teacher", roleAs: "সহকাৰী শিক্ষক", subject: "Computer Science", subjectAs: "কম্পিউটাৰ বিজ্ঞান", qual: "MCA", exp: "9 years", expAs: "৯ বছৰ" },
      { name: "Ms. Junmoni Konwar", nameAs: "কুমাৰী জুনমণি কোঁৱৰ", role: "Teacher", roleAs: "সহকাৰী শিক্ষয়িত্ৰী", subject: "Assamese", subjectAs: "অসমীয়া", qual: "M.A., B.Ed.", exp: "8 years", expAs: "৮ বছৰ" },
    ]);

    const facilitiesData = getLocal("facilities", [
      { title: "Government Building", titleAs: "চৰকাৰী গৃহ", body: "A durable, purpose-built pucca campus maintained under state education infrastructure.", bodyAs: "ৰাজ্য চৰকাৰৰ শিক্ষা আন্তঃগাঁথনিৰ অধীনত ৰক্ষণাবেক্ষণ কৰা এক পকী তথা সুদৃঢ় চৌহদ।", icon: "Building2" },
      { title: "Computer Lab", titleAs: "কম্পিউটাৰ লেব", body: "An ICT@School laboratory equipping students with essential digital literacy.", bodyAs: "ছাত্ৰ-ছাত্ৰীসকলক প্ৰয়োজনীয় ডিজিটেল জ্ঞান প্ৰদান কৰিবলৈ আই.চি.টি. (ICT@School) লেবৰ সুবিধা।", icon: "Laptop" },
      { title: "Computer-Aided Learning", titleAs: "কম্পিউটাৰ সহায়কাৰী শিক্ষাদান", body: "Interactive lessons that make abstract concepts vivid and memorable.", bodyAs: "অভাৰহেড আৰু কম্পিউটাৰ সহায়ত পাঠদান কৰা হয় যাতে জটিল বিষয়সমূহ সহজতে বুজিব পাৰি।", icon: "MonitorPlay" },
      { title: "Science Education", titleAs: "বিজ্ঞান শিক্ষা", body: "Practical science learning that turns the syllabus into hands-on discovery.", bodyAs: "ব্যৱহাৰিক পৰীক্ষা-নিৰীক্ষাৰ জৰিয়তে বিজ্ঞানৰ তাত্বিক কথাবোৰ সহজে শিকোৱা হয়।", icon: "FlaskConical" },
      { title: "Playground", titleAs: "খেলপথাৰ", body: "Ample open ground for athletics, football and the annual sports meet.", bodyAs: "খেলাধুলা, ফুটবল খেল আৰু বাৰ্ষিক ক্ৰীড়া মহোৎসৱৰ বাবে সুপ্ৰশস্ত খেলপথাৰ।", icon: "Dumbbell" },
      { title: "Drinking Water", titleAs: "বিশুদ্ধ খোৱাপানী", body: "Safe, accessible drinking water available across the campus.", bodyAs: "সমগ্ৰ চৌহদত বিশুদ্ধ আৰু সুৰক্ষিত খোৱাপানীৰ সহজ উপলব্ধতা।", icon: "Droplets" },
      { title: "Electricity", titleAs: "বিদ্যুৎ সংযোগ", body: "Reliable power supporting classrooms, the lab and administrative work.", bodyAs: "শ্ৰেণীকোঠা, কম্পিউটাৰ লেব আৰু কাৰ্যালয়ৰ বাবে নিৰ্ভৰযোগ্য বিদ্যুৎ যোগান।", icon: "Zap" },
      { title: "Separate Toilets", titleAs: "পৃথক শৌচালয়", body: "Clean, separate sanitation facilities for girls and boys.", bodyAs: "ছাত্ৰ আৰু ছাত্ৰীসকলৰ বাবে পৰিষ্কাৰ আৰু সুকীয়া শৌচালয়ৰ ব্যৱস্থা।", icon: "Toilet" },
    ]);

    const tickerData = getLocal("ticker", [
      { en: "Admissions open for Class IX \u2014 Session 2026", as: "নৱম শ্ৰেণীৰ নামভৰ্তি মুকলি — শৈক্ষিক বৰ্ষ ২০২৬" },
      { en: "Half-yearly examinations begin 15 July", as: "অৰ্ধবাৰ্ষিক পৰীক্ষা ১৫ জুলাইৰ পৰা আৰম্ভ হ’ব" },
      { en: "PTM scheduled for 12 July 2026", as: "১২ জুলাই ২০২৬ তাৰিখে অভিভাৱক-শিক্ষক সভা অনুষ্ঠিত হ’ব" },
      { en: "97% pass rate in HSLC 2025 \u2014 congratulations to all students", as: "হাইস্কুল শিক্ষান্ত পৰীক্ষা ২০২৫ ত ৯৭% উত্তীৰ্ণ — সকলো ছাত্ৰ-ছাত্ৰীলৈ অভিনন্দন" },
      { en: "Scholarship applications close 30 June", as: "জলপানীৰ আবেদন ৩০ জুনত বন্ধ হ’ব" },
    ]);

    setSchool(schoolData);
    setNotices(noticesData);
    setEvents(eventsData);
    setFaculty(facultyData);
    setFacilities(facilitiesData);
    setTicker(tickerData);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      sessionStorage.setItem("admin_authenticated", "true");
      setIsAuthenticated(true);
      toast.success("Successfully logged in as administrator!");
    } else {
      toast.error("Invalid username or password. Use admin / admin123");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
    toast.info("Logged out from admin panel.");
  };

  const saveDb = (key: string, data: any) => {
    localStorage.setItem(`barkhongia_db_${key}`, JSON.stringify(data));
    triggerUpdate(); // Notify application to re-render
  };

  const handleResetDb = () => {
    if (confirm("Are you sure you want to reset the database to default settings? All custom changes will be lost.")) {
      localStorage.removeItem("barkhongia_db_school");
      localStorage.removeItem("barkhongia_db_notices");
      localStorage.removeItem("barkhongia_db_events");
      localStorage.removeItem("barkhongia_db_faculty");
      localStorage.removeItem("barkhongia_db_facilities");
      localStorage.removeItem("barkhongia_db_ticker");
      loadDbData();
      triggerUpdate();
      toast.success("Database reset to defaults.");
    }
  };

  // --- SCHOOL INFO SAVE ---
  const handleSaveSchoolInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const updatedSchool = {
      ...school,
      name: fd.get("name") as string,
      nameAs: fd.get("nameAs") as string,
      shortName: fd.get("shortName") as string,
      shortNameAs: fd.get("shortNameAs") as string,
      tagline: fd.get("tagline") as string,
      taglineAs: fd.get("taglineAs") as string,
      location: fd.get("location") as string,
      locationAs: fd.get("locationAs") as string,
      managedBy: fd.get("managedBy") as string,
      managedByAs: fd.get("managedByAs") as string,
      phone: fd.get("phone") as string,
      email: fd.get("email") as string,
      address: fd.get("address") as string,
      addressAs: fd.get("addressAs") as string,
      motto: fd.get("motto") as string,
      mottoAs: fd.get("mottoAs") as string,
      mottoEn: fd.get("mottoEn") as string,
      mottoEnAs: fd.get("mottoEnAs") as string,
      established: Number(fd.get("established")),
      session: fd.get("session") as string,
      sessionAs: fd.get("sessionAs") as string,
    };
    setSchool(updatedSchool);
    saveDb("school", updatedSchool);
    toast.success("School information updated successfully!");
  };

  // --- NOTICES MANAGMENT ---
  const handleOpenAddNotice = () => {
    setEditingNotice({
      id: "n_" + Date.now(),
      title: "",
      titleAs: "",
      category: "General",
      categoryAs: "সাধাৰণ",
      date: new Date().toISOString().split("T")[0],
      pinned: false,
      pdf: false,
    });
    setIsNoticeModalOpen(true);
  };

  const handleOpenEditNotice = (n: any) => {
    setEditingNotice({ ...n });
    setIsNoticeModalOpen(true);
  };

  const handleDeleteNotice = (id: string) => {
    if (confirm("Are you sure you want to delete this notice?")) {
      const updated = notices.filter((n) => n.id !== id);
      setNotices(updated);
      saveDb("notices", updated);
      toast.success("Notice deleted.");
    }
  };

  const handleSaveNotice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingNotice) return;

    const fd = new FormData(e.currentTarget);
    const noticeToSave = {
      ...editingNotice,
      title: fd.get("title") as string,
      titleAs: fd.get("titleAs") as string,
      category: fd.get("category") as string,
      categoryAs: fd.get("categoryAs") as string,
      date: fd.get("date") as string,
      pinned: fd.get("pinned") === "true",
      pdf: fd.get("pdf") === "true",
    };

    let updated;
    const exists = notices.some((n) => n.id === noticeToSave.id);
    if (exists) {
      updated = notices.map((n) => (n.id === noticeToSave.id ? noticeToSave : n));
    } else {
      updated = [noticeToSave, ...notices];
    }

    setNotices(updated);
    saveDb("notices", updated);
    setIsNoticeModalOpen(false);
    setEditingNotice(null);
    toast.success(exists ? "Notice updated!" : "New notice added!");
  };

  // --- EVENTS MANAGEMENT ---
  const handleOpenAddEvent = () => {
    setEditingEvent({
      title: "",
      titleAs: "",
      date: new Date().toISOString().split("T")[0],
      type: "Academic",
      typeAs: "শৈক্ষিক",
      body: "",
      bodyAs: "",
    });
    setIsEventModalOpen(true);
  };

  const handleOpenEditEvent = (evt: any) => {
    setEditingEvent({ ...evt });
    setIsEventModalOpen(true);
  };

  const handleDeleteEvent = (title: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      const updated = events.filter((e) => e.title !== title);
      setEvents(updated);
      saveDb("events", updated);
      toast.success("Event deleted.");
    }
  };

  const handleSaveEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingEvent) return;

    const fd = new FormData(e.currentTarget);
    const eventToSave = {
      ...editingEvent,
      title: fd.get("title") as string,
      titleAs: fd.get("titleAs") as string,
      date: fd.get("date") as string,
      type: fd.get("type") as string,
      typeAs: fd.get("typeAs") as string,
      body: fd.get("body") as string,
      bodyAs: fd.get("bodyAs") as string,
    };

    let updated;
    const isNew = !events.some((ev) => ev.title === editingEvent.title);
    if (isNew) {
      updated = [...events, eventToSave];
    } else {
      updated = events.map((ev) => (ev.title === editingEvent.title ? eventToSave : ev));
    }

    setEvents(updated);
    saveDb("events", updated);
    setIsEventModalOpen(false);
    setEditingEvent(null);
    toast.success(isNew ? "Event added!" : "Event updated!");
  };

  // --- TEACHERS MANAGEMENT ---
  const handleOpenAddTeacher = () => {
    setEditingTeacher({
      name: "",
      nameAs: "",
      role: "Teacher",
      roleAs: "সহকাৰী শিক্ষক",
      subject: "",
      subjectAs: "",
      qual: "",
      exp: "",
      expAs: "",
    });
    setIsTeacherModalOpen(true);
  };

  const handleOpenEditTeacher = (t: any) => {
    setEditingTeacher({ ...t });
    setIsTeacherModalOpen(true);
  };

  const handleDeleteTeacher = (name: string) => {
    if (confirm("Are you sure you want to remove this faculty member?")) {
      const updated = faculty.filter((f) => f.name !== name);
      setFaculty(updated);
      saveDb("faculty", updated);
      toast.success("Faculty member removed.");
    }
  };

  const handleSaveTeacher = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingTeacher) return;

    const fd = new FormData(e.currentTarget);
    const teacherToSave = {
      ...editingTeacher,
      name: fd.get("name") as string,
      nameAs: fd.get("nameAs") as string,
      role: fd.get("role") as string,
      roleAs: fd.get("roleAs") as string,
      subject: fd.get("subject") as string,
      subjectAs: fd.get("subjectAs") as string,
      qual: fd.get("qual") as string,
      exp: fd.get("exp") as string,
      expAs: fd.get("expAs") as string,
    };

    let updated;
    const isNew = !faculty.some((tc) => tc.name === editingTeacher.name);
    if (isNew) {
      updated = [...faculty, teacherToSave];
    } else {
      updated = faculty.map((tc) => (tc.name === editingTeacher.name ? teacherToSave : tc));
    }

    setFaculty(updated);
    saveDb("faculty", updated);
    setIsTeacherModalOpen(false);
    setEditingTeacher(null);
    toast.success(isNew ? "Faculty member added!" : "Faculty details updated!");
  };

  // --- FACILITIES MANAGEMENT ---
  const handleOpenAddFacility = () => {
    setEditingFacility({
      title: "",
      titleAs: "",
      body: "",
      bodyAs: "",
      icon: "Building2",
    });
    setIsFacilityModalOpen(true);
  };

  const handleOpenEditFacility = (f: any) => {
    setEditingFacility({ ...f });
    setIsFacilityModalOpen(true);
  };

  const handleDeleteFacility = (title: string) => {
    if (confirm("Are you sure you want to delete this facility item?")) {
      const updated = facilities.filter((f) => f.title !== title);
      setFacilities(updated);
      saveDb("facilities", updated);
      toast.success("Facility deleted.");
    }
  };

  const handleSaveFacility = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingFacility) return;

    const fd = new FormData(e.currentTarget);
    const facilityToSave = {
      ...editingFacility,
      title: fd.get("title") as string,
      titleAs: fd.get("titleAs") as string,
      body: fd.get("body") as string,
      bodyAs: fd.get("bodyAs") as string,
      icon: fd.get("icon") as string,
    };

    let updated;
    const isNew = !facilities.some((fc) => fc.title === editingFacility.title);
    if (isNew) {
      updated = [...facilities, facilityToSave];
    } else {
      updated = facilities.map((fc) => (fc.title === editingFacility.title ? facilityToSave : fc));
    }

    setFacilities(updated);
    saveDb("facilities", updated);
    setIsFacilityModalOpen(false);
    setEditingFacility(null);
    toast.success(isNew ? "Facility added!" : "Facility updated!");
  };

  // --- TICKER MANAGEMENT ---
  const handleOpenAddTicker = () => {
    setEditingTickerItem({ index: -1, en: "", as: "" });
    setIsTickerModalOpen(true);
  };

  const handleOpenEditTicker = (item: { en: string; as: string }, index: number) => {
    setEditingTickerItem({ index, en: item.en, as: item.as });
    setIsTickerModalOpen(true);
  };

  const handleDeleteTicker = (index: number) => {
    if (confirm("Remove this ticker announcement?")) {
      const updated = ticker.filter((_, idx) => idx !== index);
      setTicker(updated);
      saveDb("ticker", updated);
      toast.success("Announcement removed.");
    }
  };

  const handleSaveTicker = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingTickerItem) return;

    const fd = new FormData(e.currentTarget);
    const tickerItem = {
      en: fd.get("en") as string,
      as: fd.get("as") as string,
    };

    let updated;
    if (editingTickerItem.index === -1) {
      updated = [...ticker, tickerItem];
    } else {
      updated = ticker.map((tk, idx) => idx === editingTickerItem.index ? tickerItem : tk);
    }

    setTicker(updated);
    saveDb("ticker", updated);
    setIsTickerModalOpen(false);
    setEditingTickerItem(null);
    toast.success(editingTickerItem.index === -1 ? "Announcement added!" : "Announcement updated!");
  };


  // --- LOGIN INTERFACE ---
  if (!isAuthenticated) {
    return (
      <div className="container flex min-h-[70dvh] items-center justify-center py-12">
        <Card className="w-full max-w-md shadow-lg border-border">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Lock className="size-6" />
            </div>
            <CardTitle className="font-display text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>
              Log in to make changes to Barkhongia Digital Roots website
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="e.g. admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground text-center bg-muted p-2 rounded">
                💡 Default demo account credentials: <code className="font-mono bg-background px-1 py-0.5 rounded">admin</code> / <code className="font-mono bg-background px-1 py-0.5 rounded">admin123</code>
              </p>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Unlock Dashboard
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  // --- DASHBOARD INTERFACE ---
  if (!school) return <div className="p-12 text-center text-muted-foreground">Loading school database...</div>;

  return (
    <div className="container-editorial py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-center">
        <div>
          <span className="eyebrow flex items-center gap-1.5"><Settings className="size-3.5" /> Administration Control Panel</span>
          <h1 className="mt-2 text-3xl font-bold">Dashboard</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleResetDb} className="gap-2 border-dashed">
            <RefreshCw className="size-4" /> Reset Database
          </Button>
          <Button variant="destructive" onClick={handleLogout} className="gap-2">
            <LogOut className="size-4" /> Logout
          </Button>
        </div>
      </div>

      <Tabs defaultValue="school" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted p-1 rounded-lg w-full max-w-3xl">
          <TabsTrigger value="school" className="gap-1.5 py-2 px-3 flex-1 sm:flex-initial"><Building2 className="size-4" /> School Info</TabsTrigger>
          <TabsTrigger value="notices" className="gap-1.5 py-2 px-3 flex-1 sm:flex-initial"><Megaphone className="size-4" /> Notices</TabsTrigger>
          <TabsTrigger value="events" className="gap-1.5 py-2 px-3 flex-1 sm:flex-initial"><CalendarDays className="size-4" /> Events</TabsTrigger>
          <TabsTrigger value="faculty" className="gap-1.5 py-2 px-3 flex-1 sm:flex-initial"><GraduationCap className="size-4" /> Faculty</TabsTrigger>
          <TabsTrigger value="facilities" className="gap-1.5 py-2 px-3 flex-1 sm:flex-initial"><Building2 className="size-4" /> Facilities</TabsTrigger>
          <TabsTrigger value="ticker" className="gap-1.5 py-2 px-3 flex-1 sm:flex-initial"><FileText className="size-4" /> Ticker</TabsTrigger>
        </TabsList>

        {/* --- SCHOOL CONTENT --- */}
        <TabsContent value="school">
          <Card>
            <CardHeader>
              <CardTitle>School Information</CardTitle>
              <CardDescription>Update general details, address, telephone and academic settings.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveSchoolInfo}>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="sName">School Name (English)</Label>
                  <Input id="sName" name="name" defaultValue={school.name} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sNameAs">School Name (Assamese)</Label>
                  <Input id="sNameAs" name="nameAs" defaultValue={school.nameAs} required />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="sShort">Short Name (English)</Label>
                  <Input id="sShort" name="shortName" defaultValue={school.shortName} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sShortAs">Short Name (Assamese)</Label>
                  <Input id="sShortAs" name="shortNameAs" defaultValue={school.shortNameAs} required />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="sTag">Tagline (English)</Label>
                  <Input id="sTag" name="tagline" defaultValue={school.tagline} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sTagAs">Tagline (Assamese)</Label>
                  <Input id="sTagAs" name="taglineAs" defaultValue={school.taglineAs} required />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="sLoc">Location (English)</Label>
                  <Input id="sLoc" name="location" defaultValue={school.location} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sLocAs">Location (Assamese)</Label>
                  <Input id="sLocAs" name="locationAs" defaultValue={school.locationAs} required />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="sAddress">Address (English)</Label>
                  <Textarea id="sAddress" name="address" defaultValue={school.address} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sAddressAs">Address (Assamese)</Label>
                  <Textarea id="sAddressAs" name="addressAs" defaultValue={school.addressAs} required />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="sMotto">Motto (Sanskrit/Original)</Label>
                  <Input id="sMotto" name="motto" defaultValue={school.motto} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sMottoAs">Motto (Assamese Script)</Label>
                  <Input id="sMottoAs" name="mottoAs" defaultValue={school.mottoAs} required />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="sMottoEn">Motto Translation (English)</Label>
                  <Input id="sMottoEn" name="mottoEn" defaultValue={school.mottoEn} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sMottoEnAs">Motto Translation (Assamese)</Label>
                  <Input id="sMottoEnAs" name="mottoEnAs" defaultValue={school.mottoEnAs} required />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="sPhone">Telephone</Label>
                  <Input id="sPhone" name="phone" defaultValue={school.phone} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sEmail">Email Address</Label>
                  <Input id="sEmail" name="email" type="email" defaultValue={school.email} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="sEst">Established Year</Label>
                    <Input id="sEst" name="established" type="number" defaultValue={school.established} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="sSession">Session Start (EN)</Label>
                    <Input id="sSession" name="session" defaultValue={school.session} required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sSessionAs">Session Start (AS)</Label>
                  <Input id="sSessionAs" name="sessionAs" defaultValue={school.sessionAs} required />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <Label htmlFor="sManaged">Managed By (English)</Label>
                  <Input id="sManaged" name="managedBy" defaultValue={school.managedBy} required />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label htmlFor="sManagedAs">Managed By (Assamese)</Label>
                  <Input id="sManagedAs" name="managedByAs" defaultValue={school.managedByAs} required />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t border-border pt-6">
                <Button type="submit"><Save className="size-4mr-1.5" /> Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* --- NOTICES CONTENT --- */}
        <TabsContent value="notices" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">School Notices</h3>
            <Button onClick={handleOpenAddNotice} className="gap-1.5"><Plus className="size-4" /> Add Notice</Button>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title (English)</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-center">Pinned</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notices.map((n) => (
                  <TableRow key={n.id}>
                    <TableCell className="font-medium max-w-md truncate">
                      <div>{n.title}</div>
                      <div className="text-xs text-muted-foreground truncate font-normal mt-0.5">{n.titleAs}</div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-block bg-accent px-2 py-0.5 rounded text-xs">{n.category}</span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{n.date}</TableCell>
                    <TableCell className="text-center">
                      {n.pinned ? (
                        <span className="bg-saffron/10 text-saffron-foreground text-[10px] font-bold px-1.5 py-0.5 rounded border border-saffron/20 uppercase">Yes</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">No</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1.5">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEditNotice(n)}><Edit className="size-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteNotice(n.id)} className="text-destructive hover:bg-destructive/10"><Trash2 className="size-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* --- EVENTS CONTENT --- */}
        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">School Calendar Events</h3>
            <Button onClick={handleOpenAddEvent} className="gap-1.5"><Plus className="size-4" /> Add Event</Button>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Title (English)</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((e) => (
                  <TableRow key={e.title}>
                    <TableCell className="font-medium max-w-sm truncate">
                      <div>{e.title}</div>
                      <div className="text-xs text-muted-foreground truncate font-normal mt-0.5">{e.titleAs}</div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-semibold">{e.type}</span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{e.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1.5">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEditEvent(e)}><Edit className="size-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(e.title)} className="text-destructive hover:bg-destructive/10"><Trash2 className="size-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* --- FACULTY CONTENT --- */}
        <TabsContent value="faculty" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Teaching Staff Registry</h3>
            <Button onClick={handleOpenAddTeacher} className="gap-1.5"><Plus className="size-4" /> Add Teacher</Button>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faculty.map((f) => (
                  <TableRow key={f.name}>
                    <TableCell className="font-medium">
                      <div>{f.name}</div>
                      <div className="text-xs text-muted-foreground font-normal mt-0.5">{f.nameAs}</div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div>{f.role}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{f.roleAs}</div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div>{f.subject}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{f.subjectAs}</div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{f.exp}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1.5">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEditTeacher(f)}><Edit className="size-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteTeacher(f.name)} className="text-destructive hover:bg-destructive/10"><Trash2 className="size-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* --- FACILITIES CONTENT --- */}
        <TabsContent value="facilities" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Campus Infrastructure Items</h3>
            <Button onClick={handleOpenAddFacility} className="gap-1.5"><Plus className="size-4" /> Add Facility</Button>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Facility Name</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facilities.map((f) => (
                  <TableRow key={f.title}>
                    <TableCell className="font-medium">
                      <div>{f.title}</div>
                      <div className="text-xs text-muted-foreground font-normal mt-0.5">{f.titleAs}</div>
                    </TableCell>
                    <TableCell className="text-xs font-mono text-primary">{f.icon}</TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-sm truncate">{f.body}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1.5">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEditFacility(f)}><Edit className="size-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteFacility(f.title)} className="text-destructive hover:bg-destructive/10"><Trash2 className="size-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* --- TICKER CONTENT --- */}
        <TabsContent value="ticker" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Home Notice Ticker Announcements</h3>
            <Button onClick={handleOpenAddTicker} className="gap-1.5"><Plus className="size-4" /> Add Announcement</Button>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-center">#</TableHead>
                  <TableHead>English Announcement</TableHead>
                  <TableHead>Assamese Announcement</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ticker.map((tk, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="text-center text-xs text-muted-foreground font-semibold">{idx + 1}</TableCell>
                    <TableCell className="font-medium text-sm">{tk.en}</TableCell>
                    <TableCell className="text-sm font-medium">{tk.as}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1.5">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEditTicker(tk, idx)}><Edit className="size-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteTicker(idx)} className="text-destructive hover:bg-destructive/10"><Trash2 className="size-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ========================================================
          POPUP MODALS 
         ======================================================== */}

      {/* --- NOTICE MODAL --- */}
      {isNoticeModalOpen && editingNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-xl border border-border bg-background p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-xl font-bold flex items-center gap-2 border-b border-border pb-3 mb-4">
              <Megaphone className="size-5 text-primary" /> {editingNotice.title ? "Edit Notice" : "Add Notice"}
            </h3>
            <form onSubmit={handleSaveNotice} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="nTitle">Notice Title (English)</Label>
                <Input id="nTitle" name="title" defaultValue={editingNotice.title} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="nTitleAs">Notice Title (Assamese)</Label>
                <Input id="nTitleAs" name="titleAs" defaultValue={editingNotice.titleAs} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="nCat">Category (EN)</Label>
                  <Input id="nCat" name="category" defaultValue={editingNotice.category} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="nCatAs">Category (AS)</Label>
                  <Input id="nCatAs" name="categoryAs" defaultValue={editingNotice.categoryAs} required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="nDate">Date</Label>
                <Input id="nDate" name="date" type="date" defaultValue={editingNotice.date} required />
              </div>
              <div className="flex gap-6 py-2 border-y border-border">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="nPinned"
                    name="pinned"
                    value="true"
                    defaultChecked={editingNotice.pinned}
                    className="size-4 rounded border-border"
                  />
                  <Label htmlFor="nPinned" className="font-semibold cursor-pointer">Pin to Notice Board</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="nPdf"
                    name="pdf"
                    value="true"
                    defaultChecked={editingNotice.pdf}
                    className="size-4 rounded border-border"
                  />
                  <Label htmlFor="nPdf" className="font-semibold cursor-pointer">Attach mock PDF download link</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => { setIsNoticeModalOpen(false); setEditingNotice(null); }}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EVENT MODAL --- */}
      {isEventModalOpen && editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-xl border border-border bg-background p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-xl font-bold flex items-center gap-2 border-b border-border pb-3 mb-4">
              <CalendarDays className="size-5 text-primary" /> {editingEvent.title ? "Edit Calendar Event" : "Add Calendar Event"}
            </h3>
            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="eTitle">Event Title (English)</Label>
                <Input id="eTitle" name="title" defaultValue={editingEvent.title} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="eTitleAs">Event Title (Assamese)</Label>
                <Input id="eTitleAs" name="titleAs" defaultValue={editingEvent.titleAs} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="eDate">Event Date</Label>
                <Input id="eDate" name="date" type="date" defaultValue={editingEvent.date} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="eType">Type (EN)</Label>
                  <Input id="eType" name="type" defaultValue={editingEvent.type} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="eTypeAs">Type (AS)</Label>
                  <Input id="eTypeAs" name="typeAs" defaultValue={editingEvent.typeAs} required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="eBody">Description (English)</Label>
                <Textarea id="eBody" name="body" defaultValue={editingEvent.body} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="eBodyAs">Description (Assamese)</Label>
                <Textarea id="eBodyAs" name="bodyAs" defaultValue={editingEvent.bodyAs} required />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => { setIsEventModalOpen(false); setEditingEvent(null); }}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- TEACHER MODAL --- */}
      {isTeacherModalOpen && editingTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-xl border border-border bg-background p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-xl font-bold flex items-center gap-2 border-b border-border pb-3 mb-4">
              <GraduationCap className="size-5 text-primary" /> {editingTeacher.name ? "Edit Faculty Registry" : "Add Faculty Member"}
            </h3>
            <form onSubmit={handleSaveTeacher} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="tName">Name (English)</Label>
                  <Input id="tName" name="name" defaultValue={editingTeacher.name} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tNameAs">Name (Assamese)</Label>
                  <Input id="tNameAs" name="nameAs" defaultValue={editingTeacher.nameAs} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="tRole">Role / Position (EN)</Label>
                  <Input id="tRole" name="role" defaultValue={editingTeacher.role} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tRoleAs">Role / Position (AS)</Label>
                  <Input id="tRoleAs" name="roleAs" defaultValue={editingTeacher.roleAs} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="tSub">Subject (EN)</Label>
                  <Input id="tSub" name="subject" defaultValue={editingTeacher.subject} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tSubAs">Subject (AS)</Label>
                  <Input id="tSubAs" name="subjectAs" defaultValue={editingTeacher.subjectAs} required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tQual">Qualifications</Label>
                <Input id="tQual" name="qual" defaultValue={editingTeacher.qual} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="tExp">Experience Years (EN)</Label>
                  <Input id="tExp" name="exp" defaultValue={editingTeacher.exp} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tExpAs">Experience Years (AS)</Label>
                  <Input id="tExpAs" name="expAs" defaultValue={editingTeacher.expAs} required />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => { setIsTeacherModalOpen(false); setEditingTeacher(null); }}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- FACILITY MODAL --- */}
      {isFacilityModalOpen && editingFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-xl border border-border bg-background p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-xl font-bold flex items-center gap-2 border-b border-border pb-3 mb-4">
              <Building2 className="size-5 text-primary" /> {editingFacility.title ? "Edit Facility Item" : "Add Facility Item"}
            </h3>
            <form onSubmit={handleSaveFacility} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fTitle">Facility Name (English)</Label>
                  <Input id="fTitle" name="title" defaultValue={editingFacility.title} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="fTitleAs">Facility Name (Assamese)</Label>
                  <Input id="fTitleAs" name="titleAs" defaultValue={editingFacility.titleAs} required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="fBody">Description (English)</Label>
                <Textarea id="fBody" name="body" defaultValue={editingFacility.body} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="fBodyAs">Description (Assamese)</Label>
                <Textarea id="fBodyAs" name="bodyAs" defaultValue={editingFacility.bodyAs} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="fIcon">Lucide Icon Name</Label>
                <Input id="fIcon" name="icon" defaultValue={editingFacility.icon} required />
                <span className="text-[10px] text-muted-foreground">Examples: Building2, Laptop, MonitorPlay, FlaskConical, Dumbbell, Droplets, Zap, Toilet</span>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => { setIsFacilityModalOpen(false); setEditingFacility(null); }}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- TICKER MODAL --- */}
      {isTickerModalOpen && editingTickerItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-xl border border-border bg-background p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-xl font-bold flex items-center gap-2 border-b border-border pb-3 mb-4">
              <Megaphone className="size-5 text-primary" /> {editingTickerItem.index === -1 ? "Add Announcement" : "Edit Announcement"}
            </h3>
            <form onSubmit={handleSaveTicker} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="tkEn">English Announcement</Label>
                <Input id="tkEn" name="en" defaultValue={editingTickerItem.en} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tkAs">Assamese Announcement</Label>
                <Input id="tkAs" name="as" defaultValue={editingTickerItem.as} required />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => { setIsTickerModalOpen(false); setEditingTickerItem(null); }}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

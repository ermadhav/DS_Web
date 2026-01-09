import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  BarChart3,
  Share2,
  Smartphone,
  Menu,
  X,
  Download,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Instagram,
  Code,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [open, setOpen] = useState(false);
  const sliderRef = useRef(null);

  // APK Download (GitHub Release)
  const APK_URL =
    "https://github.com/ermadhav/DS_Web/releases/download/v1.0.0/Dev_Streaks.apk";

  // ✅ Asset helper (fixes Vercel path issues)
  const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    document.title = "Dev Streaks • Track GitHub & LeetCode Streaks";

    const metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    metaDesc.content =
      "Dev Streaks helps developers track GitHub commits and LeetCode streaks with analytics, heatmaps, and profile sharing.";
    document.head.appendChild(metaDesc);

    const link = document.createElement("link");
    link.rel = "icon";
    link.href = asset("icon.png");
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(metaDesc);
      document.head.removeChild(link);
    };
  }, []);

  // ✅ Screenshots (production-safe)
  const screenshots = [
    asset("screenshots/home.jpg"),
    asset("screenshots/login.jpg"),
    asset("screenshots/signup.jpg"),
    asset("screenshots/share.jpg"),
    asset("screenshots/stat1.jpg"),
    asset("screenshots/stat2.jpg"),
    asset("screenshots/setting.jpg"),
    asset("screenshots/repo1.jpg"),
    asset("screenshots/repo2.jpg"),
  ];

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const amount = window.innerWidth < 640 ? 240 : 320;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen w-screen overflow-x-hidden scroll-smooth bg-gradient-to-br from-black via-zinc-900 to-black text-white">

      {/* ---------------- NAVBAR ---------------- */}
      <nav className="fixed top-4 inset-x-0 z-50 px-4">
        <div className="max-w-7xl mx-auto backdrop-blur-xl bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between px-5 h-16">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                <img
                  src={asset("icon.png")}
                  onError={(e) => (e.currentTarget.src = asset("icon.png"))}
                  className="w-5 h-5"
                />
              </div>
              <span className="font-semibold tracking-wide text-lg">
                Dev Streaks
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 text-sm text-zinc-300">
              <a href="#features" className="hover:text-white transition">Features</a>
              <a href="#preview" className="hover:text-white transition">Preview</a>
              <a href="#about" className="hover:text-white transition">About</a>

              <a
                href={APK_URL}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition shadow-lg"
              >
                <Download size={16} /> Download APK
              </a>
            </div>

            {/* Mobile Button */}
            <button onClick={() => setOpen(!open)} className="md:hidden">
              {open ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="md:hidden px-5 pb-5 flex flex-col gap-4"
              >
                <a href="#features" onClick={() => setOpen(false)}>Features</a>
                <a href="#preview" onClick={() => setOpen(false)}>Preview</a>
                <a href="#about" onClick={() => setOpen(false)}>About</a>

                <a
                  href={APK_URL}
                  target="_blank"
                  className="flex justify-center items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium"
                >
                  <Download size={16} /> Download APK
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* ---------------- HERO ---------------- */}
      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            Dev Streaks 🚀
          </motion.h1>

          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mb-8 mx-auto md:mx-0">
            Track your GitHub commits and LeetCode streaks in one beautiful mobile experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:justify-start">
            <a
              href="#preview"
              className="px-6 py-3 rounded-2xl bg-white text-black font-medium hover:scale-105 transition text-center"
            >
              View App
            </a>

            <a
              href={APK_URL}
              target="_blank"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium transition flex items-center justify-center gap-2"
            >
              <Download size={18} /> Download APK
            </a>
          </div>
        </div>

        {/* Phone Mockup */}
        <motion.div className="flex justify-center">
          <div className="relative w-[240px] sm:w-[260px] h-[480px] sm:h-[520px] rounded-[36px] border border-zinc-700 bg-black shadow-2xl overflow-hidden">
            <img
              src={asset("screenshots/home.jpg")}
              onError={(e) => (e.currentTarget.src = asset("icon.png"))}
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold text-center mb-14">Features</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { icon: Github, title: "GitHub Tracking", desc: "Commit streaks, heatmaps, repositories." },
            { icon: Code, title: "LeetCode Tracking", desc: "Solve streaks, difficulty stats, submissions." },
            { icon: BarChart3, title: "Analytics", desc: "Weekly stats and consistency insights." },
            { icon: Share2, title: "Profile Sharing", desc: "QR code sharing for profiles." },
            { icon: Smartphone, title: "Mobile First", desc: "Optimized for mobile experience." },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl p-6 text-center"
            >
              <f.icon size={36} className="mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-zinc-400 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- PREVIEW ---------------- */}
      <section id="preview" className="relative py-24">
        <h2 className="text-3xl font-semibold text-center mb-10">Live App Preview</h2>

        <div className="relative max-w-6xl mx-auto px-6">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-zinc-800 hover:bg-zinc-700"
          >
            <ChevronLeft />
          </button>

          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-scroll no-scrollbar scroll-smooth px-6 py-4"
          >
            {screenshots.map((src, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04 }}
                className="min-w-[220px] sm:min-w-[260px] bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden"
              >
                <img
                  src={src}
                  onError={(e) => (e.currentTarget.src = asset("icon.png"))}
                  className="w-full h-[420px] sm:h-[480px] object-contain bg-black"
                />
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-zinc-800 hover:bg-zinc-700"
          >
            <ChevronRight />
          </button>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer id="about" className="border-t border-zinc-800 py-14 text-center">
        <p className="text-zinc-400 mb-4">
          Made with ❤️ by Cosmo Coder <span className="text-zinc-500">(AKA Madhav Tiwari)</span>
        </p>

        <div className="flex justify-center gap-6 mb-4">
          <a href="https://github.com/ermadhav" target="_blank"><Github /></a>
          <a href="https://www.linkedin.com/in/ermadhav/" target="_blank"><Linkedin /></a>
          <a href="https://twitter.com/madhavtiwari24" target="_blank"><X /></a>
          <a href="https://www.instagram.com/madhav.tiwari24/" target="_blank"><Instagram /></a>
        </div>

        <p className="text-xs text-zinc-500">Expo • React Native • React Web</p>
      </footer>
    </div>
  );
}

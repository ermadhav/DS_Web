import { motion, AnimatePresence } from "framer-motion";
import { Github, BarChart3, Share2, Smartphone, Menu, X, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const sliderRef = useRef(null);

  const APK_URL = "/apk/Dev_Streaks.apk";

  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    document.documentElement.style.width = "100vw";

    document.title = "Dev Streaks • Track GitHub & LeetCode Streaks";

    const metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    metaDesc.content =
      "Dev Streaks helps developers track GitHub commits and LeetCode streaks with analytics, heatmaps, and profile sharing.";
    document.head.appendChild(metaDesc);

    const link = document.createElement("link");
    link.rel = "icon";
    link.href = "/icon.png";
    document.head.appendChild(link);


return () => {
      document.head.removeChild(metaDesc);
      document.head.removeChild(link);
    };
  }, []);

  const screenshots = [
    "/screenshots/home.jpg",
    "/screenshots/login.jpg",
    "/screenshots/signup.jpg",
    "/screenshots/share.jpg",
    "/screenshots/stat1.jpg",
    "/screenshots/stat2.jpg",
    "/screenshots/setting.jpg",
    "/screenshots/repo1.jpg",
    "/screenshots/repo2.jpg",
  ];

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const amount = 320;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen w-screen overflow-x-hidden scroll-smooth bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      {/* Premium Navbar */}
      <nav className="fixed top-4 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="backdrop-blur-xl bg-zinc-900/70 border border-zinc-800 rounded-2xl px-6 h-16 flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                <img src="/icon.png" className="w-5 h-5" />
              </div>
              <span className="font-semibold tracking-wide">Dev Streaks</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm text-zinc-300">
              <a href="#features" className="hover:text-white transition">Features</a>
              <a href="#preview" className="hover:text-white transition">Preview</a>
              <a href="#about" className="hover:text-white transition">About</a>

              <a
                href={APK_URL}
                download
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition shadow-lg"
              >
                <Download size={16} /> Download APK
              </a>
            </div>

            <button onClick={() => setOpen(!open)} className="md:hidden">
              <Menu size={22} />
            </button>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="md:hidden mt-3 backdrop-blur-xl bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-4"
              >
                <a href="#features" onClick={() => setOpen(false)}>Features</a>
                <a href="#preview" onClick={() => setOpen(false)}>Preview</a>
                <a href="#about" onClick={() => setOpen(false)}>About</a>

                <a
                  href={APK_URL}
                  download
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium"
                >
                  <Download size={16} /> Download APK
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-28 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Dev Streaks 🚀
          </motion.h1>

          <p className="text-zinc-400 text-lg max-w-xl mb-8">
            Track your GitHub commits and LeetCode streaks in one beautiful mobile experience. Built for developers who care about consistency and growth.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#preview"
              className="px-6 py-3 rounded-2xl bg-white text-black font-medium hover:scale-105 transition"
            >
              View App
            </a>

            <a
              href={APK_URL}
              download
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition flex items-center gap-2"
            >
              <Download size={18} /> Download APK
            </a>

            <a
              href="https://github.com/ermadhav/Dev_Streaks"
              target="_blank"
              className="px-6 py-3 rounded-2xl border border-zinc-700 hover:bg-zinc-800 transition"
            >
              GitHub Repo
            </a>
          </div>
        </div>

        {/* Mobile Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="flex justify-center"
        >
          <div className="relative w-[260px] h-[520px] rounded-[36px] border border-zinc-700 bg-black shadow-2xl overflow-hidden">
            <img src="/screenshots/home.jpg" className="w-full h-full object-contain" />
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-semibold text-center mb-14">Features</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Github, title: "GitHub Tracking", desc: "Commit streaks, heatmaps, repositories." },
            { icon: BarChart3, title: "Analytics", desc: "Weekly stats and consistency insights." },
            { icon: Share2, title: "Profile Sharing", desc: "QR code sharing for profiles." },
            { icon: Smartphone, title: "Mobile First", desc: "Built using Expo + React Native." },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl p-6 text-center"
            >
              <f.icon size={36} className="mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">{f.title}</h3>
              <p className="text-zinc-400 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Screenshot Slider (Easy UX) */}
      <section id="preview" className="relative py-28">
        <h2 className="text-3xl font-semibold text-center mb-10">Live App Preview</h2>

        <div className="relative max-w-6xl mx-auto px-10">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-zinc-800 hover:bg-zinc-700"
          >
            <ChevronLeft />
          </button>

          <div
            ref={sliderRef}
            className="flex gap-10 overflow-x-scroll no-scrollbar scroll-smooth px-6 py-4"
          >
            {screenshots.map((src, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.06 }}
                
                className="min-w-[240px] md:min-w-[280px] bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden"
              >
                <img
                  src={src}
                  className="w-full h-[460px] md:h-[520px] object-contain bg-black"
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


      {/* Footer */}
      <footer id="about" className="border-t border-zinc-800 py-12 text-center text-zinc-500">
        <p>Made with ❤️ by Cosmo Coder</p>
        <p className="text-xs mt-2">Expo • React Native • React Web</p>
      </footer>
    </div>
  );
}

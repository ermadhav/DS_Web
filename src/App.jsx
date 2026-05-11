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
  Bell,
  Mail,
  Globe,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  initAnalytics,
  trackAPKDownload,
  trackCTAClick,
  trackNavClick,
  trackSocialClick,
  trackScreenshotScroll,
  trackFeatureHover,
  trackContactClick,
} from "./analytics";

export default function App() {
  const [open, setOpen] = useState(false);
  const sliderRef = useRef(null);

  const APK_URL = "/Dev_Streaks.apk";

  const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

  // APK download with conversion tracking
  const downloadAPK = (source = "unknown") => {
    trackAPKDownload(source);
    const a = document.createElement("a");
    a.href = APK_URL;
    a.download = "Dev_Streaks.apk";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";

    // Initialize GA4, Clarity, scroll & session tracking
    const cleanupAnalytics = initAnalytics();

    return () => {
      cleanupAnalytics();
    };
  }, []);

  const screenshots = [
    asset("screenshots/login.jpeg"),
    asset("screenshots/signup.jpeg"),
    asset("screenshots/home.jpeg"),
    asset("screenshots/stat1.jpeg"),
    asset("screenshots/share.jpeg"),
    asset("screenshots/repo1.jpeg"),
    asset("screenshots/setting.jpeg"),
    asset("screenshots/widget.jpeg"),
  ];

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const amount = window.innerWidth < 640 ? 240 : 320;

    trackScreenshotScroll(direction);

    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen w-screen overflow-x-hidden scroll-smooth bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      {/* NAVBAR */}
      <nav className="fixed top-4 inset-x-0 z-50 px-4">
        <div className="max-w-7xl mx-auto backdrop-blur-xl bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between px-5 h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                <img
                  src={asset("icon.png")}
                  onError={(e) => (e.currentTarget.src = asset("icon.png"))}
                  className="w-5 h-5"
                  alt="Dev Streaks"
                />
              </div>

              <span className="font-semibold tracking-wide text-lg">
                Dev Streaks
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm text-zinc-300">
              <a
                href="#features"
                className="hover:text-white transition"
                onClick={() => trackNavClick("features")}
              >
                Features
              </a>
              <a
                href="#preview"
                className="hover:text-white transition"
                onClick={() => trackNavClick("preview")}
              >
                Preview
              </a>
              <a
                href="#about"
                className="hover:text-white transition"
                onClick={() => trackNavClick("about")}
              >
                About
              </a>

              <button
                onClick={() => downloadAPK("navbar")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition shadow-lg"
              >
                <Download size={16} />
                Download APK
              </button>
            </div>

            <button onClick={() => setOpen(!open)} className="md:hidden">
              {open ? <X /> : <Menu />}
            </button>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="md:hidden px-5 pb-5 flex flex-col gap-4"
              >
                <a
                  href="#features"
                  onClick={() => {
                    setOpen(false);
                    trackNavClick("features_mobile");
                  }}
                >
                  Features
                </a>
                <a
                  href="#preview"
                  onClick={() => {
                    setOpen(false);
                    trackNavClick("preview_mobile");
                  }}
                >
                  Preview
                </a>
                <a
                  href="#about"
                  onClick={() => {
                    setOpen(false);
                    trackNavClick("about_mobile");
                  }}
                >
                  About
                </a>

                <button
                  onClick={() => downloadAPK("mobile_menu")}
                  className="flex justify-center items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium"
                >
                  <Download size={16} />
                  Download APK
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* HERO */}
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
            Track your GitHub commits and LeetCode streaks in one beautiful
            mobile experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:justify-start">
            <a
              href="#preview"
              className="px-6 py-3 rounded-2xl bg-white text-black font-medium hover:scale-105 transition text-center"
              onClick={() => trackCTAClick("view_app", "hero")}
            >
              View App
            </a>

            <button
              onClick={() => downloadAPK("hero")}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium transition flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download APK
            </button>
          </div>
        </div>

        <motion.div className="flex justify-center">
          <div className="relative w-[240px] sm:w-[260px] h-[480px] sm:h-[520px] rounded-[36px] border border-zinc-700 bg-black shadow-2xl overflow-hidden">
            <img
              src={asset("screenshots/home.jpeg")}
              onError={(e) => (e.currentTarget.src = asset("icon.png"))}
              className="w-full h-full object-contain"
              alt="Dev Streaks app home screen showing GitHub and LeetCode streak tracking"
              loading="eager"
            />
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
          Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[
            {
              icon: Github,
              title: "GitHub Tracking",
              desc: "Track commit streaks, contribution heatmaps, and repositories.",
            },
            {
              icon: Code,
              title: "LeetCode Tracking",
              desc: "Monitor solved problems, streaks, difficulty stats, and submissions.",
            },
            {
              icon: Globe,
              title: "Heatmap Widget",
              desc: "Add GitHub & LeetCode heatmap widgets directly to your home screen.",
            },
            {
              icon: Bell,
              title: "Smart Reminders",
              desc: "Set custom reminders from 12 PM to 11 PM with flexible intervals.",
            },
            {
              icon: BarChart3,
              title: "Analytics",
              desc: "Get weekly insights and consistency analytics for your coding journey.",
            },
            {
              icon: Share2,
              title: "Profile Sharing",
              desc: "Share your profile instantly using QR codes.",
            },
            {
              icon: Smartphone,
              title: "Mobile First",
              desc: "Designed for a smooth and responsive mobile experience.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04, y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-zinc-900 rounded-3xl border border-zinc-800 shadow-xl p-8 text-center min-h-[280px] flex flex-col items-center justify-start"
              onMouseEnter={() => trackFeatureHover(f.title)}
            >
              <f.icon size={42} className="mb-5 text-white" />
              <h3 className="font-semibold text-2xl mb-4 leading-snug">
                {f.title}
              </h3>
              <p className="text-zinc-400 text-base leading-relaxed max-w-[260px]">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PREVIEW */}
      <section id="preview" className="relative py-24">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Live App Preview
        </h2>

        <div className="relative max-w-6xl mx-auto px-6">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-zinc-800 hover:bg-zinc-700"
            aria-label="Scroll screenshots left"
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
                className="min-w-[240px] sm:min-w-[300px] bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden"
              >
                <img
                  src={src}
                  onError={(e) => (e.currentTarget.src = asset("icon.png"))}
                  className="w-full h-[450px] sm:h-[520px] object-contain bg-black"
                  alt={`Dev Streaks app screenshot ${i + 1}`}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-zinc-800 hover:bg-zinc-700"
            aria-label="Scroll screenshots right"
          >
            <ChevronRight />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="about" className="border-t border-zinc-800 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Name */}
          <p className="text-zinc-300 text-lg mb-6">
            Made with ❤️ by{" "}
            <span className="font-semibold text-white">Cosmo Coder</span>{" "}
            <span className="text-zinc-500">(AKA Madhav Tiwari)</span>
          </p>

          {/* Contact Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            {/* Email */}
            <a
              href="mailto:contact.madhavtiwari@gmail.com"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500 hover:bg-zinc-800 transition-all duration-300 group"
              onClick={() =>
                trackContactClick("email", "contact.madhavtiwari@gmail.com")
              }
            >
              <Mail
                size={18}
                className="text-zinc-400 group-hover:text-indigo-400 transition"
              />
              <span className="text-zinc-300 group-hover:text-white text-sm sm:text-base font-medium">
                contact.madhavtiwari@gmail.com
              </span>
            </a>

            {/* Portfolio */}
            <a
              href="https://madhavtiwari.xyz"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-purple-500 hover:bg-zinc-800 transition-all duration-300 group"
              onClick={() =>
                trackContactClick("portfolio", "madhavtiwari.xyz")
              }
            >
              <Globe
                size={18}
                className="text-zinc-400 group-hover:text-purple-400 transition"
              />
              <span className="text-zinc-300 group-hover:text-white text-sm sm:text-base font-medium">
                madhavtiwari.xyz
              </span>
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mb-8">
            {[
              {
                icon: Github,
                href: "https://github.com/ermadhav",
                name: "github",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/ermadhav/",
                name: "linkedin",
              },
              {
                icon: X,
                href: "https://twitter.com/madhavtiwari24",
                name: "twitter",
              },
              {
                icon: Instagram,
                href: "https://www.instagram.com/madhav.tiwari24/",
                name: "instagram",
              },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-indigo-500 hover:bg-zinc-800 transition-all duration-300"
                onClick={() => trackSocialClick(social.name)}
                aria-label={`Visit ${social.name}`}
              >
                <social.icon size={22} />
              </a>
            ))}
          </div>

          {/* Tech Stack */}
          <p className="text-sm text-zinc-500 tracking-wide">
            Built with Expo • React Native • React Web
          </p>
        </div>
      </footer>
    </div>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CONTACT } from "../data/site";
import { cn } from "../utils/cn";
import { EASE, Icon, WhatsAppGlyph } from "./ui";

/* ------------------------------------------------------------------ */
/*  JioHotstar-Exact Fullscreen Project Hero Carousel (Crystal Clear) */
/* ------------------------------------------------------------------ */

export interface SpotlightItem {
  id: string;
  title: string;
  topBadge: string;
  yearMeta: string;
  genres: string[];
  description: string;
  tags: string[];
  backdrop: string;
  thumbnail: string;
  link: string;
  location: string;
  highlights: string;
}

const SPOTLIGHT_ITEMS: SpotlightItem[] = [
  {
    id: "rosemeadows",
    title: "VS ROSEMEADOWS",
    topBadge: "#1 in Hoskote Corridor · 100% Sold Out",
    yearMeta: "2024 · 4.7 Acres · 71 Plots · DC / DTCP Approved",
    genres: ["Villa Plots", "DC Converted", "DTCP Approved", "Flowering Avenues"],
    description:
      "4.7 acres of flowering avenues on the Sulibele growth corridor — signature rose-and-tabebuia landscaping, 40-ft wide boulevards, central landscaped park, and complete underground utility lines delivered.",
    tags: ["4.7 Acres Extent", "71 Villa Plots", "40-Ft Avenues", "Central Park", "Loan Ready"],
    backdrop: "/projects/rose/rose-1.jpg",
    thumbnail: "/projects/rose/rose-1.jpg",
    link: "/projects/vs-rosemeadows",
    location: "Sulibele Road, Hoskote",
    highlights: "Starts at 30×40 ft · Complete UGD & Power Delivered",
  },
  {
    id: "heritage",
    title: "VS HERITAGE",
    topBadge: "#1 in Kalkere · 100% Delivered & Occupied",
    yearMeta: "2021 · 12.5 Acres · 148 Plots · Hennur Corridor",
    genres: ["Township Masterplan", "Half-Acre Park", "40-Ft Boulevards", "Gated Security"],
    description:
      "Twelve and a half acres of approval-perfect plotted calm in Kalkere. Wide 40-ft avenues, a half-acre lush green central park with 800m jogging track, and 148 vaastu-friendly plots minutes from Hennur Road.",
    tags: ["12.5 Acres Layout", "148 Plots Delivered", "Half-Acre Park", "Dual Water Lines", "Clear Titles"],
    backdrop: "/projects/heritage/heritage-1.jpg",
    thumbnail: "/projects/heritage/heritage-1.jpg",
    link: "/projects/vs-heritage",
    location: "Kalkere, Bengaluru East",
    highlights: "30×50 & 40×60 ft · 15 Mins from Manyata Tech Park",
  },
  {
    id: "yogitha",
    title: "VS YOGITHA",
    topBadge: "#1 at Budigere Cross · 100% Sold Out",
    yearMeta: "2023 · 6.8 Acres · 76 Plots · NH-75 Highway",
    genres: ["Boutique Community", "Hill & Lake View", "NH-75 Connectivity", "Underground UGD"],
    description:
      "Boutique gated layout at Budigere against a stunning natural hill-and-lake backdrop — 76 premium plots, dual road frontage, children's play park, and just 20 minutes from ITPL Whitefield.",
    tags: ["6.8 Acres Extent", "76 Plots", "Hill & Lake Vista", "20 Mins to ITPL", "DC Converted"],
    backdrop: "/projects/yogitha/yogitha-1.jpg",
    thumbnail: "/projects/yogitha/yogitha-1.jpg",
    link: "/projects/vs-yogitha",
    location: "Budigere, Old Madras Road",
    highlights: "30×40 & 30×50 ft · 5 Mins from Budigere Cross",
  },
  {
    id: "flowering-avenues",
    title: "SIGNATURE FLOWERING BOULEVARDS",
    topBadge: "Nature-First Architecture · 100% Green Living",
    yearMeta: "All Developments · 5,000+ Planted Trees · Jogging Loops",
    genres: ["Tabebuia Rosea", "Tree-Lined Avenues", "Rainwater Pits", "Eco Masterplan"],
    description:
      "We don't sell raw land — we cultivate thriving green neighbourhoods. Every VS Developers layout features curated Tabebuia Rosea pink & golden trumpet flowering trees along wide internal avenues.",
    tags: ["Avenue Plantation", "Curated Parks", "800m Jogging Tracks", "Percolation Pits", "100% Living"],
    backdrop: "/projects/rose/rose-2.jpg",
    thumbnail: "/projects/rose/rose-2.jpg",
    link: "/projects",
    location: "Across Bengaluru East",
    highlights: "110+ Acres Developed · 1,800+ Plots Handed Over",
  },
  {
    id: "infrastructure-excellence",
    title: "CIVIL & UTILITY INFRASTRUCTURE",
    topBadge: "Bank Approved · Delivered Before Registration",
    yearMeta: "10+ Years Trust · Dual Legal Vetting · Move-in Ready",
    description:
      "From underground electrical cabling and dedicated sewage pipelines to bituminous asphalt roads with precast concrete kerb stones and compound walls — every layout is 100% complete before registration.",
    tags: ["Underground Power", "UGD Drainage", "Kerb Stone Roads", "LED Streetlights", "Pre-Approved Loans"],
    backdrop: "/projects/heritage/heritage-5.jpg",
    thumbnail: "/projects/heritage/heritage-5.jpg",
    link: "/about",
    location: "Engineering Benchmark",
    highlights: "SBI, HDFC & ICICI Loan Ready · 100% Clear Titles",
  },
];

export default function HotstarProjectSpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const thumbScrollRef = useRef<HTMLDivElement>(null);
  const current = SPOTLIGHT_ITEMS[activeIndex];

  const slideDuration = 7000; // 7 seconds per slide

  // Slideshow timer & progress bar
  useEffect(() => {
    if (isPaused) return;
    const interval = 50;
    const step = (interval / slideDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((currentIdx) => (currentIdx + 1) % SPOTLIGHT_ITEMS.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, activeIndex]);

  // Reset progress on slide change
  useEffect(() => {
    setProgress(0);
  }, [activeIndex]);

  // Scroll active thumbnail into center view
  useEffect(() => {
    if (!thumbScrollRef.current) return;
    const activeEl = thumbScrollRef.current.children[activeIndex] as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SPOTLIGHT_ITEMS.length) % SPOTLIGHT_ITEMS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SPOTLIGHT_ITEMS.length);
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-[#F4F9F5] to-white py-6 sm:py-10">
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-10">
        
        {/* Fullscreen Hero Stage with Crystal Clear Natural Image */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative h-[82vh] min-h-[580px] max-h-[840px] w-full overflow-hidden rounded-[2.5rem] border border-forest-600/15 bg-white shadow-2xl sm:h-[86vh] sm:min-h-[640px]"
        >
          {/* 100% Crystal Clear Full-Quality Image Background with Smooth Ken Burns Zoom */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="absolute inset-0"
            >
              <img
                src={current.backdrop}
                alt={current.title}
                className="h-full w-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Clean Glassmorphic Foreground (No foggy white haze covering the whole image) */}
          <div className="relative flex h-full flex-col justify-between p-6 sm:p-10 lg:p-12">
            
            {/* Top Category Badge */}
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-forest-600 shadow-sm shadow-forest-600/80 animate-pulse" />
              <span className="rounded-full border border-forest-600/20 bg-white/95 px-3.5 py-1 text-[11px] font-black uppercase tracking-[0.25em] text-forest-800 shadow-md backdrop-blur-md">
                Featured Portfolio Spotlight
              </span>
            </div>

            {/* Left-Hand Floating Frosted Glass Card for Crisp Typography */}
            <div className="mb-20 max-w-xl sm:mb-16 lg:mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="rounded-3xl border border-white/80 bg-white/92 p-6 shadow-2xl backdrop-blur-md sm:p-8"
                >
                  {/* 1. Trending Badge */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-mint-100 px-2.5 py-1 text-xs font-bold text-forest-800 shadow-xs border border-forest-600/15">
                      <span className="h-1.5 w-1.5 rounded-full bg-forest-600" />
                      {current.topBadge}
                    </span>
                  </div>

                  {/* 2. Big Cinematic Title Heading */}
                  <h2 className="mt-2.5 font-display text-2xl font-black uppercase tracking-tight text-forest-950 sm:text-4xl lg:text-5xl">
                    {current.title}
                  </h2>

                  {/* 3. Year & Specs Meta Line */}
                  <p className="mt-1.5 text-xs font-bold text-forest-800 sm:text-sm">
                    <span>{current.yearMeta}</span>
                    <span className="mx-2 text-forest-900/30">·</span>
                    <span className="text-gold-600">{current.location}</span>
                  </p>

                  {/* 4. Description */}
                  <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-forest-900/80 sm:text-sm sm:leading-relaxed">
                    {current.description}
                  </p>

                  {/* 5. Genres / Feature Tags */}
                  <div className="mt-3.5 flex flex-wrap items-center gap-1.5 text-xs font-bold">
                    {current.genres.map((g) => (
                      <span
                        key={g}
                        className="rounded-full border border-forest-600/15 bg-white px-3 py-0.5 text-[11px] font-semibold text-forest-800 shadow-xs"
                      >
                        ✓ {g}
                      </span>
                    ))}
                  </div>

                  {/* 6. Action Buttons Bar */}
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Link
                      to={current.link}
                      className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-forest-800 via-forest-700 to-forest-800 px-6 py-3 text-xs font-extrabold text-white shadow-xl shadow-forest-900/25 transition-all duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-95 sm:text-sm"
                    >
                      <span className="flex h-4 w-4 items-center justify-center">
                        <Icon name="play" className="h-3.5 w-3.5 fill-current" />
                      </span>
                      <span>Explore Master Plan</span>
                    </Link>

                    <a
                      href={CONTACT.whatsapp(
                        `Hello! I'm interested in ${current.title} (${current.location}). Please share brochure and master plan details.`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-md transition hover:brightness-105 active:scale-95"
                      title="Enquire on WhatsApp"
                      aria-label="Enquire on WhatsApp"
                    >
                      <WhatsAppGlyph className="h-4.5 w-4.5" />
                    </a>

                    <a
                      href={CONTACT.phoneHref}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-forest-600/20 bg-white text-forest-800 shadow-sm transition hover:bg-forest-50 active:scale-95"
                      title="Call VS Developers"
                      aria-label="Call VS Developers"
                    >
                      <Icon name="phone" className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom-Right JioHotstar Thumbnail Carousel Overlay */}
            <div className="absolute bottom-6 right-5 z-20 max-w-[90vw] sm:bottom-10 sm:right-10 sm:max-w-xl lg:right-12 lg:max-w-2xl">
              <div className="flex items-center justify-between pb-2">
                <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-forest-900 shadow-sm backdrop-blur">
                  Select Project ({activeIndex + 1}/{SPOTLIGHT_ITEMS.length})
                </span>

                {/* Arrow Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-forest-600/20 bg-white text-forest-800 shadow-md backdrop-blur transition hover:bg-forest-700 hover:text-white active:scale-90"
                    aria-label="Previous thumbnail"
                  >
                    <Icon name="chevL" className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-forest-600/20 bg-white text-forest-800 shadow-md backdrop-blur transition hover:bg-forest-700 hover:text-white active:scale-90"
                    aria-label="Next thumbnail"
                  >
                    <Icon name="chevR" className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Scroll Track */}
              <div
                ref={thumbScrollRef}
                className="no-scrollbar flex gap-2.5 overflow-x-auto rounded-2xl border border-white/80 bg-white/95 p-2 shadow-2xl backdrop-blur-md"
              >
                {SPOTLIGHT_ITEMS.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveIndex(idx);
                        setProgress(0);
                      }}
                      className={cn(
                        "group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-xl text-left transition-all duration-300",
                        "h-16 w-28 sm:h-20 sm:w-36 lg:h-22 lg:w-40",
                        isActive
                          ? "ring-2 ring-forest-700 scale-[1.04] shadow-lg z-10 opacity-100"
                          : "opacity-65 hover:opacity-100 hover:scale-100 ring-1 ring-forest-600/20",
                      )}
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-transparent" />

                      {/* Thumbnail Title Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-1.5 sm:p-2">
                        <p className="line-clamp-1 font-display text-[10px] font-bold text-white drop-shadow sm:text-[11px]">
                          {item.title}
                        </p>
                      </div>

                      {/* Active Slide Progress Line Bar */}
                      {isActive && (
                        <div className="absolute bottom-0 inset-x-0 h-1 bg-white/40">
                          <div
                            className="h-full bg-forest-600 transition-all duration-75 ease-linear"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

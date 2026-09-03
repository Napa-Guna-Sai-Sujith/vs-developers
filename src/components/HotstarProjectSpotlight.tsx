import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CONTACT } from "../data/site";
import { cn } from "../utils/cn";
import { EASE, Icon, WhatsAppGlyph } from "./ui";

/* ------------------------------------------------------------------ */
/*  JioHotstar-Exact Fullscreen Cinematic Project Hero Carousel       */
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
    <section className="relative w-full bg-[#070D09] text-white">
      {/* JioHotstar Fullscreen / Edge-to-Edge Hero Stage */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative h-[82vh] min-h-[580px] max-h-[860px] w-full overflow-hidden sm:h-[86vh] sm:min-h-[640px]"
      >
        {/* Animated Fullscreen Backdrop with Ken Burns Zoom */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute inset-0"
          >
            <img
              src={current.backdrop}
              alt={current.title}
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Gradient Overlays (Exact JioHotstar / Disney+ Hotstar UI) */}
        {/* 1. Left Gradient (Darkens text area) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070D09] via-[#070D09]/85 via-45% to-transparent" />
        
        {/* 2. Bottom Gradient (Darkens thumbnails & blends to next section) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070D09] via-[#070D09]/60 via-30% to-transparent" />
        
        {/* 3. Top subtle vignette */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#070D09]/70 to-transparent" />

        {/* Foreground Content Container */}
        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-between px-5 py-8 sm:px-10 sm:py-12 lg:px-14">
          
          {/* Top Category Badge */}
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-gold-400 shadow-sm shadow-gold-400/80 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gold-400 drop-shadow">
              Featured Portfolio Spotlight
            </span>
          </div>

          {/* Main Info Block (Left Side) */}
          <div className="mb-24 max-w-2xl sm:mb-20 lg:mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {/* 1. Trending Blue / Gold Badge */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#38BDF8] drop-shadow sm:text-sm">
                    {current.topBadge}
                  </span>
                </div>

                {/* 2. Big Cinematic Title Heading */}
                <h2 className="mt-2.5 font-display text-3xl font-black uppercase tracking-tight text-white drop-shadow-xl sm:text-5xl lg:text-6xl">
                  {current.title}
                </h2>

                {/* 3. Year & Specs Meta Line */}
                <p className="mt-2 text-xs font-bold text-white/90 drop-shadow sm:text-sm">
                  <span>{current.yearMeta}</span>
                  <span className="mx-2 text-white/40">·</span>
                  <span className="text-gold-300">{current.location}</span>
                </p>

                {/* 4. Movie-synopsis Description */}
                <p className="mt-3.5 line-clamp-3 max-w-xl text-xs leading-relaxed text-white/85 drop-shadow sm:text-sm sm:leading-relaxed">
                  {current.description}
                </p>

                {/* 5. Genres / Feature Tags Bar (Exact Hotstar Style) */}
                <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs font-bold text-white/90">
                  {current.genres.map((g, gIdx) => (
                    <span key={g} className="flex items-center gap-2">
                      <span>{g}</span>
                      {gIdx < current.genres.length - 1 && (
                        <span className="text-white/30">|</span>
                      )}
                    </span>
                  ))}
                </div>

                {/* 6. Action Buttons Bar (Exact Hotstar Primary Gradient + Secondary Buttons) */}
                <div className="mt-6 flex flex-wrap items-center gap-3.5">
                  {/* Primary Hotstar Watch / Explore Button */}
                  <Link
                    to={current.link}
                    className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#EC4899] px-7 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-sky-950/50 transition-all duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-95"
                  >
                    <span className="flex h-5 w-5 items-center justify-center">
                      <Icon name="play" className="h-4 w-4 fill-current" />
                    </span>
                    <span>Explore Master Plan</span>
                  </Link>

                  {/* Secondary Plus / Watchlist WhatsApp Enquiry Button */}
                  <a
                    href={CONTACT.whatsapp(
                      `Hello! I'm interested in ${current.title} (${current.location}). Please share brochure and master plan details.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white shadow-lg backdrop-blur transition hover:bg-white/20 active:scale-95"
                    title="Enquire on WhatsApp"
                    aria-label="Enquire on WhatsApp"
                  >
                    <WhatsAppGlyph className="h-5 w-5" />
                  </a>

                  {/* Direct Phone Call Button */}
                  <a
                    href={CONTACT.phoneHref}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white shadow-lg backdrop-blur transition hover:bg-white/20 active:scale-95"
                    title="Call VS Developers"
                    aria-label="Call VS Developers"
                  >
                    <Icon name="phone" className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom-Right JioHotstar Thumbnail Carousel Overlay (Exact Hotstar UI) */}
          <div className="absolute bottom-6 right-5 z-20 max-w-[90vw] sm:bottom-10 sm:right-10 sm:max-w-xl lg:right-14 lg:max-w-2xl">
            <div className="flex items-center justify-end gap-2 pb-2">
              <button
                onClick={handlePrev}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition hover:bg-white/20 active:scale-90"
                aria-label="Previous thumbnail"
              >
                <Icon name="chevL" className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={handleNext}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition hover:bg-white/20 active:scale-90"
                aria-label="Next thumbnail"
              >
                <Icon name="chevR" className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Thumbnail Scroll Track */}
            <div
              ref={thumbScrollRef}
              className="no-scrollbar flex gap-2.5 overflow-x-auto pb-1"
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
                      "group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-lg text-left transition-all duration-300",
                      "h-16 w-28 sm:h-20 sm:w-36 lg:h-22 lg:w-40",
                      isActive
                        ? "ring-2 ring-white scale-105 shadow-2xl z-10 opacity-100"
                        : "opacity-50 hover:opacity-90 hover:scale-100 ring-1 ring-white/10",
                    )}
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Thumbnail Title Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-1.5 sm:p-2">
                      <p className="line-clamp-1 font-display text-[10px] font-bold text-white drop-shadow sm:text-[11px]">
                        {item.title}
                      </p>
                    </div>

                    {/* Hotstar Active Slide Progress Line Bar */}
                    {isActive && (
                      <div className="absolute bottom-0 inset-x-0 h-1 bg-white/30">
                        <div
                          className="h-full bg-white transition-all duration-75 ease-linear"
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
    </section>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CONTACT } from "../data/site";
import { cn } from "../utils/cn";
import { EASE, Icon, WhatsAppGlyph } from "./ui";

/* ------------------------------------------------------------------ */
/*  JioHotstar-style Cinematic Project Spotlight Carousel             */
/* ------------------------------------------------------------------ */

export interface SpotlightItem {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  yearMeta: string;
  description: string;
  tags: string[];
  backdrop: string;
  thumbnail: string;
  link: string;
  actionText: string;
  location: string;
  stats: { label: string; value: string }[];
}

const SPOTLIGHT_ITEMS: SpotlightItem[] = [
  {
    id: "rosemeadows",
    title: "VS ROSEMEADOWS",
    badge: "100% Sold Out",
    subtitle: "#1 Plotted Development on Sulibele Corridor",
    yearMeta: "2024 · 4.7 Acres · 71 Plots · DC / DTCP Approved",
    description:
      "4.7 acres of flowering avenues on the Sulibele growth corridor — signature rose-and-tabebuia tree plantations, 40-ft wide boulevards, central landscaped park, and complete underground utility lines.",
    tags: [
      "DTCP Approved",
      "DC Converted",
      "Flowering Avenues",
      "Central Jogging Track",
      "Underground Power",
    ],
    backdrop: "/projects/rose/rose-1.jpg",
    thumbnail: "/projects/rose/rose-1.jpg",
    link: "/projects/vs-rosemeadows",
    actionText: "Explore 3D Master Plan",
    location: "Sulibele Road, Hoskote",
    stats: [
      { label: "Total Area", value: "4.7 Acres" },
      { label: "Villa Plots", value: "71 Units" },
      { label: "Approvals", value: "DTCP / DC" },
    ],
  },
  {
    id: "heritage",
    title: "VS HERITAGE",
    badge: "Delivered & Occupied",
    subtitle: "Twelve & a Half Acres of Plotted Calm",
    yearMeta: "2021 · 12.5 Acres · 148 Plots · Hennur Corridor",
    description:
      "Twelve and a half acres of approval-perfect plotted community in Kalkere. Wide 40-ft avenue boulevards, a half-acre lush green park, and vaastu-aligned plots just minutes from Hennur Road and Manyata Tech Park.",
    tags: [
      "12.5 Acres Layout",
      "Half-Acre Park",
      "40-Ft Boulevards",
      "Cauvery & Borewell",
      "24×7 Gated Security",
    ],
    backdrop: "/projects/heritage/heritage-1.jpg",
    thumbnail: "/projects/heritage/heritage-1.jpg",
    link: "/projects/vs-heritage",
    actionText: "Explore 3D Master Plan",
    location: "Kalkere, Bengaluru East",
    stats: [
      { label: "Total Area", value: "12.5 Acres" },
      { label: "Plots Delivered", value: "148 Units" },
      { label: "Central Park", value: "0.5 Acres" },
    ],
  },
  {
    id: "yogitha",
    title: "VS YOGITHA",
    badge: "100% Sold Out",
    subtitle: "Boutique Natural Living at Budigere",
    yearMeta: "2023 · 6.8 Acres · 76 Plots · NH-75 Connectivity",
    description:
      "Boutique gated layout at Budigere set against a natural hill-and-lake backdrop — dual road access, kids' play area, underground drainage, and just 20 minutes from Whitefield ITPL.",
    tags: [
      "Hill & Lake Backdrop",
      "Budigere Connectivity",
      "Underground Drainage",
      "Kids Play Park",
      "Clear Titles",
    ],
    backdrop: "/projects/yogitha/yogitha-1.jpg",
    thumbnail: "/projects/yogitha/yogitha-1.jpg",
    link: "/projects/vs-yogitha",
    actionText: "Explore 3D Master Plan",
    location: "Budigere, Old Madras Road",
    stats: [
      { label: "Total Area", value: "6.8 Acres" },
      { label: "Villa Plots", value: "76 Units" },
      { label: "Connectivity", value: "NH-75 / ITPL" },
    ],
  },
  {
    id: "avenues",
    title: "FLOWERING BOULEVARDS",
    badge: "Eco-Friendly Master Plan",
    subtitle: "Nature-First Infrastructure & Avenue Plantations",
    yearMeta: "All Projects · 100% Green Cover · Jogging Loops",
    description:
      "We build neighbourhoods you'll love living in. Every layout features curated Tabebuia Rosea avenue trees, manicured lawns, rainwater percolation pits, and dedicated walking promenades.",
    tags: [
      "Tabebuia Rosea",
      "Tree-Lined Avenues",
      "Rainwater Harvesting",
      "Walking Tracks",
      "Street Lighting",
    ],
    backdrop: "/projects/rose/rose-2.jpg",
    thumbnail: "/projects/rose/rose-2.jpg",
    link: "/projects",
    actionText: "View All Layouts",
    location: "Across Bengaluru East",
    stats: [
      { label: "Acres Developed", value: "110+ Acres" },
      { label: "Avenue Trees", value: "5000+ Planted" },
      { label: "Green Cover", value: "100% Living" },
    ],
  },
  {
    id: "infrastructure",
    title: "BANK-APPROVED INFRASTRUCTURE",
    badge: "Ready to Build",
    subtitle: "Underground Power, Water & UGD Delivered",
    yearMeta: "10+ Years of Trust · Double Legal Verification",
    description:
      "From underground electrical ducts to dedicated sewage connections, asphalt roads with concrete kerbs, and compound perimeter walls — every VS layout is 100% complete before registration.",
    tags: [
      "Underground Power",
      "UGD Drainage Lines",
      "Kerb Stone Roads",
      "Perimeter Wall",
      "Bank Loan Ready",
    ],
    backdrop: "/projects/heritage/heritage-5.jpg",
    thumbnail: "/projects/heritage/heritage-5.jpg",
    link: "/about",
    actionText: "Our Engineering Standards",
    location: "Bhattarahalli, Bengaluru",
    stats: [
      { label: "Delivered Plots", value: "1800+" },
      { label: "Happy Families", value: "1500+" },
      { label: "Years Active", value: "10+ Years" },
    ],
  },
];

export default function HotstarProjectSpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const thumbScrollRef = useRef<HTMLDivElement>(null);
  const current = SPOTLIGHT_ITEMS[activeIndex];

  // Auto advance timer every 6.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SPOTLIGHT_ITEMS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Ensure active thumbnail is scrolled into view
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
    <section className="relative overflow-hidden bg-forest-950 py-12 text-white sm:py-20">
      {/* Background Ambience Glow */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-forest-600/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-gold-600/15 blur-[140px]" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-8">
        {/* Section Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-400">
                Featured Portfolio Spotlight
              </span>
            </div>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Master Plan <span className="text-mint-300">Showcase</span>
            </h2>
          </div>

          <p className="text-xs font-medium text-white/60 sm:text-right">
            Click any project below to inspect details and master plan layout
          </p>
        </div>

        {/* Main Hotstar Cinematic Banner Frame */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative min-h-[540px] w-full overflow-hidden rounded-3xl border border-white/10 bg-forest-900 shadow-2xl sm:min-h-[620px] lg:min-h-[660px]"
        >
          {/* Animated Backdrop Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="absolute inset-0"
            >
              <img
                src={current.backdrop}
                alt={current.title}
                className="h-full w-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Cinematic Gradient Overlays (JioHotstar Style) */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-transparent sm:bg-gradient-to-r sm:from-forest-950 sm:via-forest-950/85 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-transparent opacity-90" />

          {/* Foreground Spotlight Content Grid */}
          <div className="relative flex h-full min-h-[540px] flex-col justify-between p-6 sm:min-h-[620px] sm:p-10 lg:min-h-[660px] lg:p-14">
            {/* Top / Left Content Details */}
            <div className="max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {/* Badge & Subtitle Line */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="rounded-full bg-gold-400 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-forest-950 shadow-md">
                      {current.badge}
                    </span>
                    <span className="text-xs font-semibold text-mint-300">
                      {current.subtitle}
                    </span>
                  </div>

                  {/* Main Title Heading */}
                  <h3 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl">
                    {current.title}
                  </h3>

                  {/* Metadata Row */}
                  <p className="mt-2.5 flex items-center gap-2 text-xs font-bold text-white/80 sm:text-sm">
                    <span>{current.yearMeta}</span>
                    <span className="text-white/40">·</span>
                    <span className="text-gold-300">{current.location}</span>
                  </p>

                  {/* Description Paragraph */}
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                    {current.description}
                  </p>

                  {/* Tags Pill Row */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {current.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Key Stats Bar */}
                  <div className="mt-6 flex flex-wrap gap-6 border-y border-white/15 py-3.5">
                    {current.stats.map((s) => (
                      <div key={s.label}>
                        <p className="font-display text-lg font-bold text-mint-200">
                          {s.value}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA Action Buttons */}
                  <div className="mt-7 flex flex-wrap items-center gap-3.5">
                    <Link
                      to={current.link}
                      className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-forest-600 via-forest-500 to-gold-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-forest-900/40 transition-all duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-95"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                        <Icon name="play" className="h-3 w-3 fill-current" />
                      </span>
                      <span>{current.actionText}</span>
                    </Link>

                    <a
                      href={CONTACT.whatsapp(
                        `Hello! I'm interested in ${current.title} (${current.location}). Please share layout details & upcoming launch availability.`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold text-white shadow-md backdrop-blur transition hover:bg-white/20 active:scale-95"
                    >
                      <WhatsAppGlyph className="h-4 w-4" /> Enquire on WhatsApp
                    </a>

                    <a
                      href={CONTACT.phoneHref}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white shadow-md backdrop-blur transition hover:bg-forest-600 active:scale-95"
                      aria-label="Call VS Developers"
                      title="Call VS Developers"
                    >
                      <Icon name="phone" className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom-Right Thumbnail Carousel Selector (JioHotstar Style) */}
            <div className="mt-8 flex flex-col gap-3 lg:absolute lg:bottom-8 lg:right-8 lg:mt-0 lg:max-w-xl">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                  Select Project / Highlight ({activeIndex + 1}/{SPOTLIGHT_ITEMS.length})
                </span>

                {/* Arrow Navigation Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/25 active:scale-90"
                    aria-label="Previous slide"
                  >
                    <Icon name="chevL" className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/25 active:scale-90"
                    aria-label="Next slide"
                  >
                    <Icon name="chevR" className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Thumbnails Tray */}
              <div
                ref={thumbScrollRef}
                className="no-scrollbar flex gap-3 overflow-x-auto pb-2 pt-1"
              >
                {SPOTLIGHT_ITEMS.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveIndex(idx)}
                      className={cn(
                        "group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 text-left transition-all duration-300",
                        "h-20 w-32 sm:h-24 sm:w-38 lg:h-24 lg:w-40",
                        isActive
                          ? "border-gold-400 shadow-xl shadow-gold-500/25 scale-[1.04]"
                          : "border-white/15 opacity-60 hover:opacity-100 hover:border-white/40",
                      )}
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />

                      {/* Thumbnail Title Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-2">
                        <p className="line-clamp-1 font-display text-[11px] font-bold text-white drop-shadow">
                          {item.title}
                        </p>
                        <p className="line-clamp-1 text-[9px] font-semibold text-mint-300">
                          {item.badge}
                        </p>
                      </div>

                      {/* Active Progress Bar */}
                      {isActive && (
                        <motion.div
                          layoutId="activeSpotlightBar"
                          className="absolute bottom-0 inset-x-0 h-1 bg-gold-400"
                        />
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

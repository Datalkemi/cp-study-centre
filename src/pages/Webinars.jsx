import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Gift,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Tag,
  Video,
  GraduationCap,
  Wrench,
  Megaphone,
  Star as StarIcon,
} from "lucide-react";

/* ---------------- Animations ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 },
  }),
};
const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  hover: { y: -6, transition: { type: "spring", stiffness: 300, damping: 18 } },
};

/* ---------------- Helpers ---------------- */
const toDate = (iso) => new Date(iso + "T00:00:00");
const fmt = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});
const fmtMonth = new Intl.DateTimeFormat("en-IN", {
  month: "long",
  year: "numeric",
});
const pad = (n) => String(n).padStart(2, "0");
const keyFor = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

function monthMatrix(baseDate) {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7; // Monday=0
  const start = new Date(year, month, 1 - startOffset);
  const weeks = [];
  for (let w = 0; w < 6; w++) {
    const row = [];
    for (let d = 0; d < 7; d++) {
      row.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + w * 7 + d));
    }
    weeks.push(row);
  }
  return weeks;
}

/* ---------------- Category Badge ---------------- */
const CategoryBadge = ({ category = "event", onDark = false, size = "md", className = "" }) => {
  const key = String(category).toLowerCase();

  const MAP = {
    contest: {
      Icon: Gift,
      light:
        "bg-gradient-to-r from-amber-300 to-rose-300 text-black ring-amber-400/40 ring-2 shadow-sm ring-offset-2 ring-offset-white",
      dark: "bg-white/18 text-white ring-white/40 ring-2 shadow-sm backdrop-blur",
      label: "CONTEST",
    },
    webinar: {
      Icon: Video,
      light:
        "bg-gradient-to-r from-sky-300 to-indigo-300 text-black ring-sky-400/40 ring-2 shadow-sm ring-offset-2 ring-offset-white",
      dark: "bg-white/18 text-white ring-white/40 ring-2 shadow-sm backdrop-blur",
      label: "WEBINAR",
    },
    program: {
      Icon: GraduationCap,
      light:
        "bg-gradient-to-r from-violet-300 to-fuchsia-300 text-black ring-fuchsia-400/40 ring-2 shadow-sm ring-offset-2 ring-offset-white",
      dark: "bg-white/18 text-white ring-white/40 ring-2 shadow-sm backdrop-blur",
      label: "PROGRAM",
    },
    workshop: {
      Icon: Wrench,
      light:
        "bg-gradient-to-r from-emerald-300 to-teal-300 text-black ring-emerald-400/40 ring-2 shadow-sm ring-offset-2 ring-offset-white",
      dark: "bg-white/18 text-white ring-white/40 ring-2 shadow-sm backdrop-blur",
      label: "WORKSHOP",
    },
    announcement: {
      Icon: Megaphone,
      light:
        "bg-gradient-to-r from-orange-300 to-pink-300 text-black ring-orange-400/40 ring-2 shadow-sm ring-offset-2 ring-offset-white",
      dark: "bg-white/18 text-white ring-white/40 ring-2 shadow-sm backdrop-blur",
      label: "ANNOUNCEMENT",
    },
  };

  const { Icon, light, dark, label } =
    MAP[key] || {
      Icon: Tag,
      light:
        "bg-gradient-to-r from-purple-300 to-indigo-300 text-black ring-purple-400/40 ring-2 shadow-sm ring-offset-2 ring-offset-white",
      dark: "bg-white/18 text-white ring-white/40 ring-2 shadow-sm backdrop-blur",
      label: String(category).toUpperCase(),
    };

  const paddings = size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs";
  const tone = onDark ? dark : light;

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full font-extrabold tracking-wide uppercase",
        paddings,
        tone,
        className,
      ].join(" ")}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
};

/* ---------------- Demo data (replace with backend later) ---------------- */
/* BACKEND INTEGRATION NOTES:
   - Replace DEMO_EVENTS with data from your API / DB.
   - Keep the shape { id, title, category, icon?, start, end?, time?, location?, description?, cta?, highlight? }.
   - Preferred `icon` is a React component (e.g., Gift). If omitted or not a function, a calendar icon is used automatically.
*/
const DEMO_EVENTS = [
  {
    id: "onam-2025-giveaway",
    title: "Onam Giveaway Contest 2025",
    category: "contest",
    icon: Gift,
    start: "2025-08-25",
    end: "2025-09-03",
    time: "All day",
    location: "Instagram (@cpstudycenter)",
    description: [
      "Wear your Onam attire (solo or with family) and capture your best festive photo.",
      "Upload on Instagram & tag @cpstudycenter.",
      "Follow @cpstudycenter and tag 2 friends in our giveaway reel.",
      "Winners announced on Sep 04, 2025. Based on likes, shares & comments. T&C apply.",
    ],
    cta: { label: "Open Instagram", href: "https://www.instagram.com/cpstudycenter/" },
    highlight: "Featured",
  },
  {
    id: "ielts-masterclass-2025-09-10",
    title: "IELTS Masterclass: Writing Band 7+",
    category: "webinar",
    icon: Sparkles,
    start: "2025-09-10",
    end: "2025-09-10",
    time: "7:00 PM - 8:30 PM",
    location: "Live Zoom Webinar",
    description: [
      "Task 1 & Task 2 structures that examiners love.",
      "Live marking demo + model answers.",
      "Q&A with our lead trainer.",
    ],
  },
  {
    id: "parents-orientation-2025-09-14",
    title: "Parents' Orientation: Grade 8-10",
    category: "program",
    icon: Users,
    start: "2025-09-14",
    end: "2025-09-14",
    time: "10:30 AM - 12:00 PM",
    location: "CP Study Center, Trivandrum",
    description: [
      "Meet our subject mentors.",
      "Assessment plan & progress tracking.",
      "Personalized doubt-clearing strategy.",
    ],
  },
];

/* ---------------- Event Card (square, minimal info) ---------------- */
function EventCard({ event, onOpen }) {
  const CardIcon = typeof event?.icon === "function" ? event.icon : CalendarIcon;

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={
        // ⬇️ was: "aspect-[4/3] md:aspect-square ..."
        "group bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden " +
        "aspect-auto md:aspect-square grid grid-rows-[auto,1fr,auto]"
      }
    >
      {/* Header */}
      <div className="relative p-4 sm:p-5 text-white">
        <div className="absolute inset-0 bg-[#8c52ff]/90" />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <CardIcon className="w-6 h-6" />
            </span>
            {event.highlight && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 px-2.5 py-1 text-[11px] font-extrabold text-white ring-2 ring-white/50 shadow-sm backdrop-blur">
                <StarIcon className="w-3.5 h-3.5" />
                {event.highlight}
              </span>
            )}
          </div>

          {/* keep the title to 2 lines so the header can't grow endlessly */}
          <h3 className="text-xl text-white font-bold leading-6 drop-shadow line-clamp-2">
            {event.title}
          </h3>

          <div className="mt-3 flex flex-col items-start gap-2 text-white/95">
            <CategoryBadge category={event.category} onDark size="sm" />
            <span className="inline-flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              {fmt.format(toDate(event.start))}
              {event.end && event.end !== event.start ? ` – ${fmt.format(toDate(event.end))}` : ""}
            </span>
            {event.time && (
              <span className="inline-flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {event.time}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 bg-white">
        {event.location && (
          <div className="text-sm text-neutral-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-neutral-500" />
            <span className="break-words">{event.location}</span>
          </div>
        )}
      </div>

      {/* CTA — always visible because height is auto on mobile */}
      <div className="p-5 pt-0">
        <button
          type="button"
          onClick={() => onOpen(event)}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium
                     bg-neutral-100 text-neutral-900 hover:bg-violet-600 hover:text-white transition-all"
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.article>
  );
}


/* ---------------- Modal (safe icon render) ---------------- */
function EventModal({ open, onClose, event }) {
  return (
    <AnimatePresence>
      {open && event && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // ⬇️ Put the overlay ABOVE the navbar and offset from the top on mobile
          className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm
                     flex items-start justify-center
                     pt-[max(env(safe-area-inset-top),theme(spacing.16))]  /* ~64px or notch */
                     pb-4 px-3 mt-20 sm:mt-0
                     sm:items-center sm:p-4"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            // ⬇️ Fit within viewport and allow internal scrolling
            className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden
                       max-h-[calc(100svh-5rem)] sm:max-h-[calc(100vh-4rem)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ---------- HEADER ---------- */}
            <div className="p-4 sm:p-6 text-white relative">
              {/* Make overlays ignore clicks */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-700 via-violet-600 to-orange-500 pointer-events-none z-0" />
              <div className="absolute inset-0 bg-black/15 pointer-events-none z-0" />

              {/* Close button — ensure it sits above overlays and is fully tappable */}
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                onMouseDown={(e) => e.stopPropagation()}  // extra safety to avoid backdrop handlers
                className="absolute right-3 top-3 sm:right-4 sm:top-4
               w-10 h-10 sm:w-9 sm:h-9 rounded-full
               flex items-center justify-center
               bg-white/20 hover:bg-white/30 text-white backdrop-blur
               ring-1 ring-white/40
               z-20 pointer-events-auto touch-manipulation cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6l-12 12" />
                </svg>
              </button>

              <div className="relative z-10 flex items-center gap-3 mt-10 sm:mt-0">
                {(() => {
                  const IconH = event.kind === "single" ? (event.item?.icon || CalendarIcon) : CalendarIcon;
                  return (
                    <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/20 flex items-center justify-center">
                      <IconH className="w-5 h-5 sm:w-6 sm:h-6" />
                    </span>
                  );
                })()}
                <h3 className="text-xl sm:text-2xl text-white font-bold leading-snug drop-shadow">
                  {event.kind === "single" ? event.item.title : event.title}
                </h3>
              </div>

              <div className="relative z-10 mt-2 sm:mt-3 flex flex-col items-start gap-1.5 sm:gap-2 text-white/95">
                {event.kind === "single" ? (
                  <>
                    <CategoryBadge category={event.item.category || "program"} onDark size="sm" />
                    <div className="inline-flex items-center gap-2 text-sm sm:text-base">
                      <CalendarIcon className="w-4 h-4" />
                      <span>
                        {fmt.format(toDate(event.item.start))}
                        {event.item.end && event.item.end !== event.item.start
                          ? ` – ${fmt.format(toDate(event.item.end))}`
                          : ""}
                      </span>
                    </div>
                    {event.item.time && (
                      <div className="inline-flex items-center gap-2 text-sm sm:text-base">
                        <Clock className="w-4 h-4" />
                        <span>{event.item.time}</span>
                      </div>
                    )}
                    {event.item.location && (
                      <div className="inline-flex items-center gap-2 text-sm sm:text-base">
                        <MapPin className="w-4 h-4" />
                        <span>{event.item.location}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <CategoryBadge category="Program" onDark size="sm" />
                    <div className="inline-flex items-center gap-2 text-sm sm:text-base">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{fmt.format(toDate(event.date))}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ---------- BODY (scrollable) ---------- */}
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto">
              {event.kind === "single" ? (
                <>
                  {event.item.description?.length ? (
                    <ul className="space-y-1.5 sm:space-y-2">
                      {event.item.description.map((line, i) => (
                        <li key={i} className="text-sm sm:text-base text-neutral-800 flex items-start gap-2">
                          <Tag className="w-4 h-4 text-violet-600 mt-0.5 shrink-0" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm sm:text-base text-neutral-800">More details coming soon.</p>
                  )}

                  {event.item.cta?.href && (
                    <div className="pt-1.5 sm:pt-2">
                      <a
                        href={event.item.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl
                                   bg-violet-600 text-white text-sm sm:text-base font-medium hover:bg-violet-700"
                      >
                        {event.item.cta.label}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-4 sm:space-y-5">
                  {event.items.map((ev) => (
                    <div key={ev.id} className="rounded-xl border border-neutral-200 p-3 sm:p-4">
                      <h4 className="text-base sm:text-lg font-semibold text-neutral-900">{ev.title}</h4>
                      <div className="mt-1.5 sm:mt-2 flex flex-col gap-1 text-xs sm:text-sm text-neutral-700">
                        <div className="inline-flex items-center gap-2">
                          <CategoryBadge category={ev.category} size="sm" />
                        </div>
                        <div className="inline-flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-neutral-500" />
                          <span>
                            {fmt.format(toDate(ev.start))}
                            {ev.end && ev.end !== ev.start ? ` – ${fmt.format(toDate(ev.end))}` : ""}
                          </span>
                        </div>
                        {ev.time && (
                          <div className="inline-flex items-center gap-2">
                            <Clock className="w-4 h-4 text-neutral-500" />
                            <span>{ev.time}</span>
                          </div>
                        )}
                        {ev.location && (
                          <div className="inline-flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-neutral-500" />
                            <span>{ev.location}</span>
                          </div>
                        )}
                      </div>

                      {ev.description?.length ? (
                        <ul className="mt-2 space-y-1">
                          {ev.description.map((line, i) => (
                            <li key={i} className="text-sm text-neutral-800 flex items-start gap-2">
                              <Tag className="w-4 h-4 text-violet-600 mt-0.5 shrink-0" />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {ev.cta?.href && (
                        <div className="pt-2">
                          <a
                            href={ev.cta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-violet-600
                                       text-white text-xs sm:text-sm font-medium hover:bg-violet-700"
                          >
                            {ev.cta.label}
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



/* ---------------- Calendar (right aside) ---------------- */
function EventsCalendar({ events, baseDate, onPrev, onNext, onPickDay }) {
  const matrix = useMemo(() => monthMatrix(baseDate), [baseDate]);

  const datesWithEvents = useMemo(() => {
    const set = new Set();
    for (const ev of events) {
      const s = toDate(ev.start);
      const e = toDate(ev.end || ev.start);
      for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) set.add(keyFor(d));
    }
    return set;
  }, [events]);

  const thisMonth = baseDate.getMonth();

  return (
    <aside className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 lg:sticky lg:top-24">
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onPrev();
          }}
          className="p-2 rounded-lg border hover:bg-neutral-50"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="font-semibold text-neutral-900">{fmtMonth.format(baseDate)}</div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onNext();
          }}
          className="p-2 rounded-lg border hover:bg-neutral-50"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-xs text-neutral-500 mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="py-1 text-center">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {matrix.flat().map((d, i) => {
          const key = keyFor(d);
          const inMonth = d.getMonth() === thisMonth;
          const has = datesWithEvents.has(key);
          return (
            <button
              type="button"
              key={key + i}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (has) onPickDay(key);
              }}
              className={`aspect-square rounded-lg text-sm flex items-center justify-center
                ${inMonth ? "text-neutral-900" : "text-neutral-300"}
                ${has ? "relative bg-violet-600/10 hover:bg-violet-600/20 font-semibold" : "hover:bg-neutral-50"}
              `}
              aria-label={key}
              title={key}
            >
              {d.getDate()}
              {has && <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-violet-600" />}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-neutral-500 mt-3 flex items-center gap-1">
        <span className="inline-block w-2 h-2 rounded-full bg-violet-600" />
        Dates with events
      </p>
    </aside>
  );
}

/* ---------------- Page ---------------- */
export default function Webinars() {
  // Sort by start date (chronological)
  const [events] = useState(
    [...DEMO_EVENTS].sort(
      (a, b) => toDate(a.start).getTime() - toDate(b.start).getTime()
    )
  );
  const [monthDate, setMonthDate] = useState(() => new Date());
  const [modalEvent, setModalEvent] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = document.documentElement; // safer than body on iOS
    if (open) el.classList.add("overflow-hidden");
    else el.classList.remove("overflow-hidden");
    return () => el.classList.remove("overflow-hidden");
  }, [open]);

  // Prevent accidental navigation on empty anchors (defensive)
  useEffect(() => {
    const blockEmptyHref = (e) => {
      const a = e.target.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (href === "" || href === "#") {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener("click", blockEmptyHref, true);
    return () => document.removeEventListener("click", blockEmptyHref, true);
  }, []);

  const eventsByDate = useMemo(() => {
    const map = new Map();
    for (const ev of events) {
      const s = toDate(ev.start);
      const e = toDate(ev.end || ev.start);
      for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
        const k = keyFor(d);
        if (!map.has(k)) map.set(k, []);
        map.get(k).push(ev);
      }
    }
    return map;
  }, [events]);

  // OPEN A FULL DETAILS MODAL WHEN A DAY IS PICKED
  const handleDayPick = (key) => {
    const list = eventsByDate.get(key);
    if (!list?.length) return;

    if (list.length === 1) {
      // single event on that date -> reuse single-event modal
      setModalEvent({ kind: "single", item: list[0] });
    } else {
      // multiple events -> open multi-event modal with all details
      setModalEvent({
        kind: "multi",
        title: `Events on ${fmt.format(toDate(key))}`,
        date: key,
        items: list, // pass full event objects; modal will render all details
      });
    }
    setOpen(true);
  };

  // OPEN A SINGLE EVENT FROM A CARD
  const openEvent = (ev) => {
    setModalEvent({ kind: "single", item: ev });
    setOpen(true);
  };

  const closeEvent = () => setOpen(false);

  const nextMonth = () =>
    setMonthDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  const prevMonth = () =>
    setMonthDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-16"
    >
      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-center mt-16 mb-10"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold inline-block relative text-neutral-900">
          Webinars, Events & Programs
          <motion.span
            className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-violet-600 to-orange-500"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.55 }}
          />
        </h1>
        <p className="text-lg text-neutral-600 max-w-3xl mx-auto mt-4">
          Tap a highlighted date to see what’s on, or open details directly from any card.
        </p>
      </motion.div>

      {/* Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 items-start gap-10 xl:gap-16">
          {/* Tiles (2 per row on md+, 1 per row on mobile) */}
          <div className="lg:col-span-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {events.map((ev) => (
                <EventCard key={ev.id} event={ev} onOpen={openEvent} />
              ))}
            </motion.div>
          </div>

          {/* Calendar to the right with spacing */}
          <div className="lg:col-span-4 lg:pl-12">
            <EventsCalendar
              events={events}
              baseDate={monthDate}
              onPrev={prevMonth}
              onNext={nextMonth}
              onPickDay={handleDayPick}
            />
          </div>
        </div>
      </section>

      <EventModal open={open} onClose={closeEvent} event={modalEvent} />
    </motion.div>
  );
}
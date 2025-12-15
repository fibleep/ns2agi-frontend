"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { getEventLink } from "@/lib/event-routes";

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  thumbnail: string;
  status: "completed" | "upcoming" | "coming-soon";
  organizationType?: "ORGANIZED" | "CONTRIBUTED";
  link?: string;
}

interface HorizontalTimelineProps {
  events: Event[];
}

export default function HorizontalTimeline({ events }: HorizontalTimelineProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  // Detect mobile viewport
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive sizing constants
  const cardWidth = isMobile ? 280 : 320;
  const gap = isMobile ? 24 : 48;

  // Sort events by date (newest first for a better "timeline" feel in this context, or keep oldest first? 
  // Actually, usually timelines go left to right, oldest to newest. Let's keep that.)
  const sortedEvents = React.useMemo(() => {
    if (!events || events.length === 0) {
      return [];
    }
    return [...events].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  }, [events]);

  // Find the index of the first upcoming event (today's position)
  const todayIndex = React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedEvents.length; i++) {
      const eventDate = new Date(sortedEvents[i].date);
      eventDate.setHours(0, 0, 0, 0);

      if (eventDate >= today) {
        return i;
      }
    }
    return sortedEvents.length;
  }, [sortedEvents]);

  // Auto-scroll to TODAY marker on mount
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container || todayIndex === 0 || todayIndex >= sortedEvents.length) return;

    const timer = setTimeout(() => {
      const leftPadding = isMobile ? (window.innerWidth / 2) - (cardWidth / 2) : 100;
      const todayPos = todayIndex * (cardWidth + gap);
      const scrollPosition = todayPos - (container.clientWidth / 2) + (cardWidth / 2);

      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [todayIndex, sortedEvents.length, cardWidth, gap, isMobile]);

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No events to display</p>
      </div>
    );
  }

  return (
    <div className="relative w-full group">
      {/* Scrollable timeline container */}
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden pb-12 horizontal-timeline-scroll snap-x snap-mandatory md:snap-none hide-scrollbar"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div
          className="relative flex px-6 md:px-24 py-8"
          style={{ gap: `${gap}px` }}
        >
          {sortedEvents.map((event, index) => {
            const eventDate = new Date(event.date);
            eventDate.setHours(23, 59, 59, 999);
            const today = new Date();
            const isPast = eventDate < today;
            const isUpcoming = !isPast;
            const isToday = index === todayIndex;

            return (
              <div
                key={event.id}
                className={cn(
                  "relative flex flex-col snap-center shrink-0 transition-opacity duration-500",
                  isPast ? "opacity-60 hover:opacity-100" : "opacity-100"
                )}
                style={{ width: `${cardWidth}px` }}
              >
                {/* Date Marker Line */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={cn(
                    "h-[1px] w-full",
                    isToday ? "bg-white" : "bg-zinc-800"
                  )}></div>
                  <span className={cn(
                    "text-xs font-mono whitespace-nowrap",
                    isToday ? "text-white font-bold" : "text-zinc-600"
                  )}>
                    {event.date}
                  </span>
                </div>

                {/* Card */}
                <a
                  href={event.link || getEventLink(event.id)}
                  className="group/card block h-full"
                >
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 transition-all duration-300 group-hover/card:border-zinc-700">
                    {event.thumbnail ? (
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        className={cn(
                          "w-full h-full transition-transform duration-500 group-hover/card:scale-105",
                          event.thumbnail.endsWith('.svg')
                            ? "p-10 object-contain"
                            : "object-cover"
                        )}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-zinc-600">No Image</span>
                      </div>
                    )}

                    {/* Status Badge Overlay */}
                    {isUpcoming && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full">
                          Upcoming
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex flex-col h-[120px]">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-medium leading-tight text-white group-hover/card:text-zinc-300 transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-zinc-600 shrink-0 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                    </div>

                    <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed mt-2">
                      {event.description}
                    </p>

                    <div className="mt-auto pt-2">
                      {event.organizationType && (
                        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                          {event.organizationType}
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fade gradients for scroll indication */}
      <div className="absolute top-0 bottom-0 left-0 w-12 md:w-24 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-12 md:w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  );
}

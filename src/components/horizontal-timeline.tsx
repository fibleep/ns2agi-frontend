"use client";

import * as React from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  thumbnail: string;
  status: "completed" | "upcoming" | "coming-soon";
}

interface HorizontalTimelineProps {
  events: Event[];
}

function getEventLink(eventId: string): string {
  const eventRoutes: Record<string, string> = {
    "signal-i": "/events/signal-i",
    "signal-ii": "/events/signal-ii",
    "ai-hackathon-i": "/events/ai-hackathon-i",
    "ai-hackathon-ii": "/events/ai-hackathon-ii",
    "ai-hackathon-iii": "/events/ai-hackathon-iii",
    "robotics-hackathon-i": "/events/robotics-hackathon-i",
    "kids-ai-vibecoding-hackathon": "/events/kids-ai-vibecoding-hackathon",
    "future-in-bloom-pt1": "/events/future-in-bloom-pt1",
    "cassini-hackathon": "https://taikai.network/cassinihackathons/hackathons/eu-space-consumer-experience",
    "belgium-nlp-meetup-27": "https://www.meetup.com/belgium-nlp-meetup/events/311547373/",
    "stripe-hackathon": "https://luma.com/f7gs82fe?tk=wx4evx",
  };
  return eventRoutes[eventId] || "/events";
}

function getStatusStyles(status: Event["status"]) {
  switch (status) {
    case "completed":
      return {
        badge: "bg-green-500/20 text-green-300 border-green-500/30",
        line: "bg-gradient-to-r from-green-500/40 to-white/20",
      };
    case "upcoming":
      return {
        badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        line: "bg-gradient-to-r from-white/20 to-white/20",
      };
    case "coming-soon":
      return {
        badge: "bg-gray-500/20 text-gray-300 border-gray-500/30",
        line: "bg-gradient-to-r from-white/20 to-white/20",
      };
  }
}

export default function HorizontalTimeline({ events }: HorizontalTimelineProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);
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
  const cardWidth = isMobile ? 260 : 300;
  const gap = isMobile ? 40 : 120;
  const timelineHeight = isMobile ? 150 : 200;

  // Sort events by date (oldest to newest for left-to-right)
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

  // Calculate the position of TODAY marker (all cards now uniform width)
  const todayPosition = todayIndex * (cardWidth + gap) - (gap / 2);

  // Handle scroll to update progress indicator
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll to TODAY marker on mount
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container || todayIndex === 0 || todayIndex >= sortedEvents.length) return;

    // Small delay to ensure layout is complete
    const timer = setTimeout(() => {
      // Calculate position of TODAY marker using responsive values
      const leftPadding = isMobile ? (window.innerWidth / 2) - (cardWidth / 2) : 32;
      const scrollToPosition = leftPadding + todayPosition;

      // Center the TODAY marker in the viewport
      const scrollPosition = scrollToPosition - (container.clientWidth / 2);

      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [todayIndex, sortedEvents.length, cardWidth, gap, isMobile, todayPosition]);

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60">No events to display</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Scrollable timeline container */}
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-visible pb-8 horizontal-timeline-scroll snap-x snap-mandatory md:snap-none"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="relative min-w-max py-12 md:py-16" style={{ paddingLeft: isMobile ? `calc(50vw - ${cardWidth / 2}px)` : '2rem', paddingRight: isMobile ? `calc(50vw - ${cardWidth / 2}px)` : '2rem' }}>
          {/* Main timeline structure */}
          <div className="relative">
            {/* Central timeline line */}
            <div className="absolute left-0 right-0 h-1 bg-white/10" style={{ top: `${timelineHeight}px` }} />

            {/* Today marker - vertical line in gap between events */}
            {todayIndex < sortedEvents.length && todayIndex > 0 && (
              <>
                {/* Vertical line positioned in the gap before first upcoming event */}
                <div
                  className="absolute top-0 bottom-0 z-20"
                  style={{
                    left: `${todayIndex * (cardWidth + gap) - (gap / 2)}px`,
                  }}
                >
                  <div className="relative h-full flex flex-col items-center">
                    <div className="w-1 h-full bg-gradient-to-b from-blue-500/80 via-blue-400/60 to-blue-500/80" />

                    {/* Label at the top */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                      <div className="px-3 md:px-4 py-1 md:py-1.5 bg-blue-500 text-white text-xs font-bold rounded-full whitespace-nowrap shadow-lg">
                        TODAY
                      </div>
                    </div>

                    {/* Label at the bottom */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                      <div className="px-3 md:px-4 py-1 md:py-1.5 bg-blue-500 text-white text-xs font-bold rounded-full whitespace-nowrap shadow-lg">
                        TODAY
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glowing dot at intersection */}
                <div
                  className="absolute z-20"
                  style={{
                    top: `${timelineHeight}px`,
                    left: `${todayIndex * (cardWidth + gap) - (gap / 2)}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="relative">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 animate-pulse" />
                    <div className="absolute inset-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-400 blur-md" />
                  </div>
                </div>
              </>
            )}

            {/* Events grid */}
            <div className="relative flex" style={{ gap: `${gap}px` }}>
              {sortedEvents.map((event, index) => {
                const styles = getStatusStyles(event.status);
                const isAbove = index % 2 === 0;
                const verticalOffset = isMobile ? 70 : 100;

                // Special styling for kids and robotics events (colored backgrounds only)
                const isKidsEvent = event.id === 'kids-ai-vibecoding-hackathon';
                const isRoboticsEvent = event.id === 'robotics-hackathon-i' || event.id === 'future-in-bloom-pt1';

                const thumbnailHeight = isMobile ? 128 : 160;
                const eventBgColor = isKidsEvent ? '#FDD835' : isRoboticsEvent ? '#f97316' : null;

                return (
                  <div key={event.id} className="relative flex flex-col items-center snap-center" style={{ width: `${cardWidth}px` }}>
                    {/* Event card positioned above or below */}
                    <div
                      className={cn(
                        "w-full mb-4",
                        isAbove ? "order-1" : "order-3"
                      )}
                      style={{
                        marginTop: isAbove ? "0" : `${verticalOffset}px`,
                        marginBottom: isAbove ? `${verticalOffset}px` : "0"
                      }}
                    >
                      <div className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 hover:border-white/40 hover:shadow-white/10">
                        {/* Thumbnail */}
                        {event.thumbnail && (
                          <div
                            className="relative overflow-hidden"
                            style={{
                              height: `${thumbnailHeight}px`
                            }}
                          >
                            <img
                              src={event.thumbnail}
                              alt={event.title}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover"
                              width={cardWidth}
                              height={thumbnailHeight}
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>
                        )}

                        {/* Content */}
                        <div
                          className="p-4 md:p-5"
                          style={{
                            backgroundColor: eventBgColor || 'transparent'
                          }}
                        >
                          {/* Header */}
                          <div className="flex items-start justify-between gap-2 mb-2 md:mb-3">
                            <h3 className={cn(
                              "text-lg md:text-xl font-bold leading-tight",
                              isKidsEvent ? "text-purple-900" : isRoboticsEvent ? "text-black" : "text-white"
                            )}>
                              {event.title}
                            </h3>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs font-semibold uppercase tracking-wide border shrink-0",
                                isKidsEvent ? "border-purple-900/30 text-purple-900" : isRoboticsEvent ? "border-black/30 text-black" : styles.badge
                              )}
                            >
                              {event.status === "completed"
                                ? "✓"
                                : event.status === "upcoming"
                                ? "→"
                                : "•"}
                            </Badge>
                          </div>

                          {/* Date */}
                          <div className={cn(
                            "flex items-center gap-2 text-sm mb-3",
                            isKidsEvent ? "text-purple-900/80" : isRoboticsEvent ? "text-black/70" : "text-white/70"
                          )}>
                            <Calendar className="h-4 w-4" />
                            <span className="font-medium">{event.date}</span>
                          </div>

                          {/* Description */}
                          <p className={cn(
                            "text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-3",
                            isKidsEvent ? "text-purple-900/90" : isRoboticsEvent ? "text-black/80" : "text-white/80"
                          )}>
                            {event.description}
                          </p>

                          {/* Button */}
                          {event.status !== "coming-soon" && (
                            <a
                              href={getEventLink(event.id)}
                              className={cn(
                                "inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full font-semibold text-xs md:text-sm",
                                isKidsEvent ? "bg-purple-900 text-white hover:bg-purple-800" : isRoboticsEvent ? "bg-black text-white hover:bg-black/90" : "bg-white text-black hover:bg-white/90",
                                "transition-all duration-300 hover:scale-105 hover:shadow-lg",
                                "group"
                              )}
                            >
                              View Details
                              <ArrowRight className="h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Vertical connector line */}
                    <div
                      className={cn(
                        "w-0.5 bg-gradient-to-b from-white/30 to-white/10",
                        isAbove ? "order-2" : "order-2"
                      )}
                      style={{ height: `${verticalOffset}px` }}
                    />

                    {/* Connecting segment of timeline (colored based on status) */}
                    {index < sortedEvents.length - 1 && (
                      <div
                        className={cn(
                          "absolute h-1",
                          styles.line
                        )}
                        style={{
                          top: `${timelineHeight}px`,
                          left: "50%",
                          width: `calc(100% + ${gap}px)`,
                          zIndex: 0
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll progress indicator */}
      <div className="relative w-full h-2 bg-white/5 rounded-full mt-4 overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Scroll hint */}
      <div className="text-center text-white/50 text-xs md:text-sm mt-3 flex items-center justify-center gap-2">
        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Scroll to explore our journey</span>
        <span className="sm:hidden">Swipe to explore</span>
        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

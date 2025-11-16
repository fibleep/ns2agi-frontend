"use client";

import * as React from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { TimelineLayout } from "@/components/ui/timeline-layout";
import {
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineTitle,
  TimelineDescription,
  TimelineContent,
} from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  thumbnail: string;
  status: "completed" | "upcoming" | "coming-soon";
  organizationType?: "ORGANIZED" | "CONTRIBUTED";
}

interface EventsTimelineProps {
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
    "future-in-bloom-pt1": "https://luma.com/vl1ksuok",
    "tectonic": "https://tectonicconf.eu",
    "cassini-hackathon": "https://www.cassini.eu/hackathons",
    "belgium-nlp-meetup-27": "https://www.meetup.com/belgium-nlp-meetup/",
    "stripe-hackathon": "https://lu.ma/agenticpayments",
  };
  return eventRoutes[eventId] || "/";
}

function getStatusStyles(status: Event["status"]) {
  switch (status) {
    case "completed":
      return {
        badge: "bg-green-500/20 text-green-300 border-green-500/30",
        card: "bg-green-500/5 hover:bg-green-500/10",
        icon: "bg-green-500 text-white",
      };
    case "upcoming":
      return {
        badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        card: "bg-blue-500/5 hover:bg-blue-500/10",
        icon: "bg-blue-500 text-white",
      };
    case "coming-soon":
      return {
        badge: "bg-gray-500/20 text-gray-300 border-gray-500/30",
        card: "bg-gray-500/5 hover:bg-gray-500/10",
        icon: "bg-gray-500 text-white",
      };
  }
}

export default function EventsTimeline({ events }: EventsTimelineProps) {
  const [visibleItems, setVisibleItems] = React.useState<Set<string>>(
    new Set()
  );
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  // Sort events by date (newest first)
  const sortedEvents = React.useMemo(() => {
    if (!events || events.length === 0) {
      console.log("No events provided to timeline");
      return [];
    }
    return [...events].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }, [events]);

  // Make items visible immediately on mount
  React.useEffect(() => {
    const allIds = sortedEvents.map(e => e.id);
    setVisibleItems(new Set(allIds));
  }, [sortedEvents]);

  React.useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-event-id");
            if (id) {
              setVisibleItems((prev) => new Set(prev).add(id));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const itemRefs = React.useRef<Map<string, HTMLLIElement>>(new Map());

  const setItemRef = React.useCallback(
    (id: string) => (el: HTMLLIElement | null) => {
      if (el) {
        itemRefs.current.set(id, el);
        observerRef.current?.observe(el);
      } else {
        const existing = itemRefs.current.get(id);
        if (existing) {
          observerRef.current?.unobserve(existing);
          itemRefs.current.delete(id);
        }
      }
    },
    []
  );

  if (!events || events.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <p className="text-white/60">No events to display</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl bg-black min-h-screen">
      <TimelineLayout>
        {sortedEvents.map((event, index) => {
          const styles = getStatusStyles(event.status);
          const isVisible = visibleItems.has(event.id);

          return (
            <TimelineItem
              key={event.id}
              ref={setItemRef(event.id)}
              data-event-id={event.id}
              className={cn(
                "transition-all duration-700 ease-out",
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              )}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <TimelineConnector />

              <TimelineHeader>
                <TimelineIcon className={styles.icon}>
                  <Calendar className="h-4 w-4" />
                </TimelineIcon>

                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <TimelineTitle className="text-xl md:text-2xl">
                      {event.title}
                    </TimelineTitle>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs font-semibold uppercase tracking-wide border",
                        styles.badge
                      )}
                    >
                      {event.status.replace("-", " ")}
                    </Badge>
                  </div>

                  {event.organizationType && (
                    <div className="flex items-center gap-1 mb-1">
                      {event.organizationType === "ORGANIZED" && (
                        <span className="text-[10px]">⭐</span>
                      )}
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-wider border px-1.5 py-0",
                          event.organizationType === "ORGANIZED"
                            ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
                            : "bg-white/10 text-white/60 border-white/30"
                        )}
                      >
                        {event.organizationType}
                      </Badge>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <MapPin className="h-3 w-3" />
                    <span>{event.date}</span>
                  </div>
                </div>
              </TimelineHeader>

              <TimelineContent className="ml-12">
                {/* Thumbnail */}
                {event.thumbnail && (
                  <div className={cn(
                    "relative h-48 rounded-xl overflow-hidden mb-4 group",
                    event.thumbnail.endsWith('.svg') && "bg-white"
                  )}>
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      className={cn(
                        "w-full h-full transition-transform duration-300 group-hover:scale-105",
                        event.thumbnail.endsWith('.svg') ? "object-contain p-4" : "object-cover"
                      )}
                    />
                    {!event.thumbnail.endsWith('.svg') && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </div>
                )}

                {/* Description */}
                <TimelineDescription className="text-base leading-relaxed mb-4">
                  {event.description}
                </TimelineDescription>

                {/* CTA Button */}
                {event.status !== "coming-soon" ? (
                  <a
                    href={getEventLink(event.id)}
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm",
                      "bg-white text-black hover:bg-white/90",
                      "transition-all duration-300 hover:scale-105 hover:shadow-lg",
                      "group"
                    )}
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-gray-600/20 text-gray-400 border border-gray-600/30 cursor-not-allowed">
                    Coming Soon
                  </div>
                )}
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </TimelineLayout>
    </div>
  );
}

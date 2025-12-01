"use client";

import * as React from "react";
import { TimelineLayout } from "@/components/ui/timeline-layout";
import { TimelineEventCard, type Event } from "./timeline-event-card";

interface EventsTimelineProps {
  events: Event[];
}

export default function EventsTimeline({ events }: EventsTimelineProps) {
  const [visibleItems, setVisibleItems] = React.useState<Set<string>>(
    new Set()
  );
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  const itemRefs = React.useRef<Map<string, HTMLLIElement>>(new Map());

  // Sort events by date (newest first) and update status
  const sortedEvents = React.useMemo(() => {
    if (!events || events.length === 0) {
      return [];
    }

    const now = new Date();

    return [...events]
      .map((event) => {
        const eventDate = new Date(event.date);
        // Check if date is valid and in the past
        if (!isNaN(eventDate.getTime()) && eventDate < now) {
          return { ...event, status: "completed" as const };
        }
        return event;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
  }, [events]);

  // Initialize observer
  React.useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-event-id");
            if (id) {
              setVisibleItems((prev) => {
                const newSet = new Set(prev);
                newSet.add(id);
                return newSet;
              });
              // Stop observing once visible
              observerRef.current?.unobserve(entry.target);
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

  // Make items visible immediately on mount (SSR/initial render fallback)
  React.useEffect(() => {
    // Small delay to allow observer to catch initial items if needed,
    // or just show them if JS loads late.
    // Actually, let's just rely on the observer for animation trigger,
    // but ensure we don't block content if observer fails.
    const timer = setTimeout(() => {
      if (visibleItems.size === 0 && sortedEvents.length > 0) {
        const firstFew = sortedEvents.slice(0, 3).map(e => e.id);
        setVisibleItems(new Set(firstFew));
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [sortedEvents, visibleItems.size]);


  const setItemRef = React.useCallback(
    (id: string) => (el: HTMLLIElement | null) => {
      if (el) {
        itemRefs.current.set(id, el);
        observerRef.current?.observe(el);
      } else {
        const existing = itemRefs.current.get(id);
        if (existing) {
          // Don't unobserve here if we want to keep it visible,
          // but we unobserve in the callback anyway.
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
        {sortedEvents.map((event, index) => (
          <TimelineEventCard
            key={event.id}
            event={event}
            isVisible={visibleItems.has(event.id)}
            index={index}
            ref={setItemRef(event.id)}
          />
        ))}
      </TimelineLayout>
    </div>
  );
}

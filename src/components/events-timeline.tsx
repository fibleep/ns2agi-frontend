"use client";

import * as React from "react";
import { TimelineLayout } from "@/components/ui/timeline-layout";
import { TimelineEventCard, type Event } from "./timeline-event-card";

interface EventsTimelineProps {
  events: Event[];
}

export default function EventsTimeline({ events }: EventsTimelineProps) {
  const initialIds = React.useMemo(() => {
    if (!events || events.length === 0) return new Set<string>();
    const sorted = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return new Set(sorted.slice(0, 5).map(e => e.id));
  }, [events]);

  const [visibleItems, setVisibleItems] = React.useState<Set<string>>(initialIds);
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
    <div className="container mx-auto px-4 py-4 max-w-4xl">
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

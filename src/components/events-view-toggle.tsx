"use client";

import * as React from "react";
import { LayoutGrid, ListTree } from "lucide-react";
import EventsTimeline from "./events-timeline";
import { cn } from "@/lib/utils";

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

interface EventsViewToggleProps {
  events: Event[];
  gridContainerId?: string;
}

type ViewMode = "grid" | "timeline";

export default function EventsViewToggle({
  events,
  gridContainerId = "grid-view-container"
}: EventsViewToggleProps) {
  console.log("EventsViewToggle received events:", events);

  const [viewMode, setViewMode] = React.useState<ViewMode>(() => {
    // Try to restore from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("events-view-mode");
      return (saved as ViewMode) || "grid";
    }
    return "grid";
  });

  React.useEffect(() => {
    // Save preference
    localStorage.setItem("events-view-mode", viewMode);

    // Show/hide grid view - try multiple possible container IDs
    const containerIds = [gridContainerId, "grid-view-container", "grid-view-container-home"];
    containerIds.forEach(id => {
      const gridContainer = document.getElementById(id);
      if (gridContainer) {
        gridContainer.style.display = viewMode === "grid" ? "block" : "none";
      }
    });
  }, [viewMode, gridContainerId]);

  return (
    <div className="w-full">
      {/* View Toggle */}
      <div className="container mx-auto px-4 max-w-6xl mb-8">
        <div className="flex justify-center md:justify-end">
          <div className="inline-flex gap-1 p-1 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                viewMode === "grid"
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white/90"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                viewMode === "timeline"
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white/90"
              )}
            >
              <ListTree className="h-4 w-4" />
              <span className="hidden sm:inline">Timeline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Timeline View */}
      {viewMode === "timeline" && (
        <div className="bg-black">
          <p className="text-white text-center mb-4">
            Timeline View - Events count: {events?.length || 0}
          </p>
          <EventsTimeline events={events} />
        </div>
      )}
    </div>
  );
}

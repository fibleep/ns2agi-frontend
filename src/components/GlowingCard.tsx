import { GlowingEffect } from "./ui/glowing-effect";
import { cn } from "@/lib/utils";
import React from "react";

interface GlowingCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    borderWidth?: number;
    inactiveZone?: number;
    proximity?: number;
    spread?: number;
    glow?: boolean;
}

export const GlowingCard = ({
    children,
    className,
    borderWidth = 3,
    inactiveZone = 0.01,
    proximity = 64,
    spread = 40,
    glow = true,
    ...props
}: GlowingCardProps) => {
    return (
        <div className={cn("relative h-full rounded-3xl", className)} {...props}>
            <GlowingEffect
                spread={spread}
                glow={glow}
                disabled={false}
                proximity={proximity}
                inactiveZone={inactiveZone}
                borderWidth={borderWidth}
            />
            <div className="relative h-full rounded-3xl border-[0.75px] border-white/10 bg-black backdrop-blur-sm overflow-hidden">
                {children}
            </div>
        </div>
    );
};

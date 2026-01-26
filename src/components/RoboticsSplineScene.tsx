'use client'

import { SplineScene } from "@/components/ui/splite"

export function RoboticsSplineScene() {
  return (
    <div className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden rounded-2xl border border-white/10">
      <SplineScene
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  )
}

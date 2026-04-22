"use client";

import { useEffect, useRef } from "react";
import { useISSPosition } from "@/hooks/useISSPosition";
import { generateISSTrail } from "@/lib/nasa";
import { GlobeInstance } from "@/types";

// globe.gl is ESM-only, must be dynamically imported
let GlobeGL: (new (el: HTMLElement, config?: object) => GlobeInstance) | null = null;

export default function ISSGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeInstance | null>(null);
  const { position, loading, error } = useISSPosition(5000);

  // Initialize globe once
  useEffect(() => {
    if (!containerRef.current) return;
    let mounted = true;

    import("globe.gl").then((mod) => {
      if (!mounted || !containerRef.current) return;
      GlobeGL = mod.default;

      const globe = new GlobeGL(containerRef.current)
        .globeImageUrl(
          "//unpkg.com/three-globe/example/img/earth-night.jpg"
        )
        .bumpImageUrl(
          "//unpkg.com/three-globe/example/img/earth-topology.png"
        )
        .backgroundImageUrl(
          "//unpkg.com/three-globe/example/img/night-sky.png"
        )
        .width(containerRef.current.offsetWidth)
        .height(containerRef.current.offsetHeight)
        .atmosphereColor("#00e5ff")
        .atmosphereAltitude(0.18)
        .enablePointerInteraction(false);

      // Auto-rotate slowly
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.4;
      globe.controls().enableZoom = false;

      globeRef.current = globe;
    });

    return () => {
      mounted = false;
    };
  }, []);

  // Update ISS marker whenever position changes
  useEffect(() => {
    if (!globeRef.current || !position) return;

    const trail = generateISSTrail(position.latitude, position.longitude);

    // ISS point
    globeRef.current.pointsData([
      {
        lat: position.latitude,
        lng: position.longitude,
        alt: 0.08,
        radius: 0.6,
        color: "#00e5ff",
      },
    ]);
    globeRef.current.pointAltitude("alt");
    globeRef.current.pointColor("color");
    globeRef.current.pointRadius("radius");

    // Trail as arc
    globeRef.current.arcsData([
      {
        startLat: trail[0][0],
        startLng: trail[0][1],
        endLat: position.latitude,
        endLng: position.longitude,
        color: ["rgba(0,229,255,0.05)", "rgba(0,229,255,0.7)"],
      },
    ]);
    globeRef.current.arcColor("color");
    globeRef.current.arcAltitudeAutoScale(0.3);
    globeRef.current.arcStroke(0.5);
    globeRef.current.arcDashLength(0.4);
    globeRef.current.arcDashGap(0.2);
    globeRef.current.arcDashAnimateTime(2000);
  }, [position]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (globeRef.current && containerRef.current) {
        globeRef.current
          .width(containerRef.current.offsetWidth)
          .height(containerRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {/* ISS stats overlay */}
      {position && (
        <div className="absolute bottom-6 left-6 font-mono text-xs text-cyan-400/80 space-y-1 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>ISS LIVE</span>
          </div>
          <div>LAT {position.latitude.toFixed(4)}°</div>
          <div>LNG {position.longitude.toFixed(4)}°</div>
          <div>ALT {position.altitude.toFixed(1)} km</div>
          <div>VEL {position.velocity.toFixed(0)} km/h</div>
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-cyan-400/50 font-mono text-sm animate-pulse">
            ACQUIRING SIGNAL…
          </div>
        </div>
      )}

      {error && (
        <div className="absolute bottom-6 left-6 font-mono text-xs text-red-400/70">
          SIGNAL LOST — {error}
        </div>
      )}
    </div>
  );
}
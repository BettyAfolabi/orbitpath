"use client";

import { useEffect, useRef, useState } from "react";
import { useISSPosition } from "@/hooks/useISSPosition";
import { motion, AnimatePresence } from "framer-motion";
import { generateISSTrail } from "@/lib/nasa";
import { GlobeInstance } from "@/types";

let GlobeGL: (new (el: HTMLElement, config?: object) => GlobeInstance) | null = null;

export default function ISSGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeInstance | null>(null);
  const [globeLoaded, setGlobeLoaded] = useState(false);
  const { position, loading, error } = useISSPosition(5000);

  useEffect(() => {
    if (!containerRef.current) return;
    let mounted = true;

    import("globe.gl").then((mod) => {
      if (!mounted || !containerRef.current) return;
      GlobeGL = mod.default;

      const globe = new GlobeGL(containerRef.current)
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
        .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
        .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
        .width(containerRef.current.offsetWidth)
        .height(containerRef.current.offsetHeight)
        .atmosphereColor("#00e5ff")
        .atmosphereAltitude(0.18)
        .enablePointerInteraction(false);

      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.3;
      globe.controls().enableZoom = false;

      globeRef.current = globe;
      setGlobeLoaded(true);
    });

    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!globeRef.current || !position) return;

    const globe = globeRef.current;
    const trail = generateISSTrail(position.latitude, position.longitude);


    globe
      .pointsData([{
        lat: position.latitude,
        lng: position.longitude,
        size: 0.6,
        color: "#00e5ff",
      }])
      .pointColor("color")
      .pointRadius("size")

    globe
      .arcsData([{
        startLat: trail[0][0],
        startLng: trail[0][1],
        endLat: position.latitude,
        endLng: position.longitude,
        color: ["rgba(0,229,255,0.05)", "rgba(0,229,255,0.8)"],
      }])
      .arcColor("color")
      .arcAltitudeAutoScale(0.3)
      .arcStroke(0.6)
      .arcDashLength(0.5)
      .arcDashGap(0.1)
      .arcDashAnimateTime(1500);

  }, [position]);

  useEffect(() => {
    const handleResize = () => {
      if (globeRef.current && containerRef.current) {
        globeRef.current.width(containerRef.current.offsetWidth).height(containerRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* Globe Container with CSS transition for smooth fade-in */}
      <div 
        ref={containerRef} 
        className={`w-full h-full transition-opacity duration-1000 ${globeLoaded && !loading ? 'opacity-100' : 'opacity-0'}`} 
      />

      <AnimatePresence>
        {position && !loading && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute bottom-6 left-6 font-mono text-xs text-cyan-400/80 space-y-1 pointer-events-none"
          >
            <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>ISS LIVE</span>
            </div>
            <div>LAT {position.latitude.toFixed(4)}°</div>
            <div>LNG {position.longitude.toFixed(4)}°</div>
            <div>ALT {position.altitude.toFixed(1)} km</div>
            <div>VEL {position.velocity.toFixed(0)} km/h</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading */}
      <AnimatePresence>
        {(loading || !globeLoaded) && !error && (
          <motion.div
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50"
          >
            <div className="relative w-24 h-24">
              {[1, 1.5, 2].map((s, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border border-cyan-500/20 rounded-full"
                  animate={{ scale: s, opacity: [0, 0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
              </div>
            </div>
            <p className="mt-8 text-cyan-400/60 font-mono text-[10px] tracking-[0.3em] uppercase">
              Establishing Orbital Link...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50"
          >
            <div className="text-center space-y-4">
              <div className="text-red-500 font-mono text-sm tracking-tighter">CONNECTION_TERMINATED</div>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-1 border border-red-500/50 text-red-500 text-xs hover:bg-red-500/10 transition-colors"
              >
                REBOOT SYSTEM
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
"use client";

import dynamic from "next/dynamic";

const ISSGlobe = dynamic(() => import("@/components/home/ISSGlobe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-cyan-400/30 font-mono text-sm animate-pulse tracking-widest">
        INITIALIZING GLOBE…
      </div>
    </div>
  ),
});

export default function GlobeWrapper() {
  return <ISSGlobe />;
}
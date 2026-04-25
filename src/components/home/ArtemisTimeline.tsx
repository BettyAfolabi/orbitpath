"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { artemisTimeline } from "@/data/crew";

const statusLabel = {
  complete: "COMPLETE",
  upcoming: "UPCOMING",
  planned: "PLANNED",
};

const statusBg = {
  complete: "bg-green-500/10 text-green-400 border-green-500/30",
  upcoming: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  planned: "bg-amber-500/10 text-amber-400 border-amber-500/30",
};

export default function ArtemisTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-slate-950 to-black" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="text-xs tracking-[0.3em] text-blue-400 uppercase mb-4 font-mono">
            Mission Sequence
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
            The Road Back to the{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-violet-400">
              Moon
            </span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Artemis is NASA‘s program to return humans to the lunar surface —
            and use the Moon as a proving ground for the journey to Mars.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-slate-700 to-transparent md:-translate-x-px" />

          <div className="space-y-12">
            {artemisTimeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  className={`relative flex items-start gap-8 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Desktop: spacer for the other side */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Dot on the line */}
                  <div
                    className="absolute left-8 md:left-1/2 top-6 w-3 h-3 rounded-full border-2 border-current -translate-x-1/2 z-10"
                    style={{ color: item.color, backgroundColor: item.color + "33" }}
                  />

                  {/* Card */}
                  <div
                    className={`ml-16 md:ml-0 md:w-1/2 ${
                      isLeft ? "md:pr-14" : "md:pl-14"
                    }`}
                  >
                    <div
                      className="group relative rounded-2xl border border-white/6 bg-white/2 p-6 backdrop-blur-sm hover:border-white/12 hover:bg-white/4 transition-all duration-300"
                      style={{
                        boxShadow: `0 0 40px -20px ${item.color}40`,
                      }}
                    >
                      {/* Glow on hover */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(600px at 50% 0%, ${item.color}08, transparent 70%)`,
                        }}
                      />

                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p
                            className="text-xs font-mono tracking-widest mb-1"
                            style={{ color: item.color }}
                          >
                            {item.date}
                          </p>
                          <h3 className="text-xl font-medium text-white">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-400 mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 text-[10px] tracking-widest px-2.5 py-1 rounded-full border font-mono uppercase ${statusBg[item.status]}`}
                        >
                          {statusLabel[item.status]}
                        </span>
                      </div>

                      <p className="text-sm text-slate-400 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div
                        className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border"
                        style={{
                          color: item.color,
                          borderColor: item.color + "40",
                          backgroundColor: item.color + "10",
                        }}
                      >
                        <span className="w-1 h-1 rounded-full bg-current" />
                        {item.highlight}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
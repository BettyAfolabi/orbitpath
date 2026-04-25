"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { artemisIICrew } from "@/data/crew";

export default function CrewPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-28 px-6 overflow-hidden bg-black">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-xs tracking-[0.3em] text-blue-400 uppercase mb-4 font-mono">
              Artemis II Crew
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
              Meet the{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-violet-400">
                Pioneers
              </span>
            </h2>
            <p className="mt-3 text-slate-400 text-sm max-w-sm leading-relaxed">
              Four astronauts. One free-return trajectory around the Moon. The
              most significant human spaceflight in 50 years.
            </p>
          </div>
          <Link
            href="/crew"
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 text-slate-300 text-sm hover:border-blue-500/40 hover:text-white transition-all duration-300 self-start md:self-auto"
          >
            View full profiles
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {artemisIICrew.map((member, i) => (
            <motion.div
              key={member.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
            >
              <Link href={`/crew/${member.slug}`} className="group block">
                <div className="relative rounded-2xl overflow-hidden border border-white/6 bg-white/2 hover:border-white/[0.14] transition-all duration-500 hover:-translate-y-1">
                  {/* Photo */}
                  <div className="relative h-64 bg-slate-900 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                      sizes="(max-width: 640px) 100vw, 25vw"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?w=400&q=80";
                      }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                    {/* Agency badge */}
                    <div className="absolute top-3 right-3 text-[10px] font-mono tracking-widest px-2 py-1 rounded bg-black/60 text-slate-300 border border-white/10">
                      {member.agency}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-[10px] tracking-[0.2em] text-blue-400 uppercase font-mono mb-1">
                      {member.role}
                    </p>
                    <h3 className="text-base font-medium text-white group-hover:text-blue-300 transition-colors duration-200">
                      {member.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {member.shortBio}
                    </p>

                    <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                      <span>View profile</span>
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-slate-600">
            Could you join them someday?
          </p>
          <Link
            href="/pathfinder"
            className="inline-flex items-center gap-2 mt-3 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Discover your space career path →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
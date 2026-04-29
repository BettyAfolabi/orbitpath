"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CrewImage from "@/components/crew/CrewImage";
import { artemisIICrew } from "@/data/crew";

export default function CrewGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {artemisIICrew.map((member, i) => (
        <motion.div
          key={member.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{
            duration: 0.5,
            delay: i * 0.08,
            ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
          }}
          whileHover={{ y: -6, transition: { duration: 0.22 } }}
        >
          <Link href={`/crew/${member.slug}`}>
            <article className="group relative rounded-2xl overflow-hidden border border-white/6 bg-white/2 hover:border-white/12 transition-colors duration-500 cursor-pointer">
              <div className="flex flex-col sm:flex-row gap-0">
                <div className="relative w-full sm:w-44 h-52 sm:h-auto shrink-0 bg-slate-900 overflow-hidden">
                  <CrewImage
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                        sizes="(max-width: 640px) 100vw, 176px"
                        priority={i === 0}     
                        loading={i === 0 ? "eager" : "lazy"}
                    />
                  <div className="absolute inset-0 bg-linear-to-b sm:bg-linear-to-r from-transparent to-black/60" />
                </div>
                <div className="flex-1 p-5 md:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-[10px] tracking-[0.25em] text-blue-400 uppercase font-mono mb-1">
                        {member.role} · {member.agency}
                      </p>
                      <h2 className="text-lg md:text-xl font-medium text-white group-hover:text-blue-200 transition-colors">
                        {member.name}
                      </h2>
                    </div>
                    <span className="shrink-0 ml-3 text-[10px] font-mono tracking-widest px-2 py-1 rounded bg-white/5 text-slate-400 border border-white/10">
                      {member.nationality}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {member.shortBio}
                  </p>
                  <div className="flex flex-wrap gap-4 md:gap-3">
                    {member.stats.slice(0, 2).map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="text-sm font-medium text-white">{s.value}</div>
                        <div className="text-[10px] text-slate-600 uppercase tracking-widest font-mono">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </article>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
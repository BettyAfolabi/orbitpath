"use client";

import { COUNTRIES } from "@/data/countries";

interface CountryStepProps {
  selected: string;
  onSelect: (country: string) => void;
}

export default function CountryStep({ selected, onSelect }: CountryStepProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-white">Where are you based?</h2>
        <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">
          Your location helps us recommend universities, programs, and
          opportunities that are actually within reach, not just the ones
          everyone already knows about.
        </p>
        {/* Reason callout */}
        <div className="mt-4 flex gap-3 rounded-xl border border-sky-500/20 bg-sky-500/5 px-4 py-3">
          <span className="text-sky-400 mt-0.5 shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
          <p className="text-sky-300/80 text-xs leading-relaxed">
            We use your country to surface regional universities, space agency
            programs, and scholarships relevant to where you are, not just MIT
            and NASA. Your location is only used to personalise your roadmap.
          </p>
        </div>
      </div>

      <div className="relative">
        <select
          value={selected}
          onChange={(e) => onSelect(e.target.value)}
          className="
            w-full appearance-none rounded-xl border border-slate-700 bg-slate-900
            px-4 py-3 pr-10 text-sm text-white
            focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500/40
            disabled:opacity-50 transition-colors
          "
        >
          <option value="" disabled>Select your country…</option>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        {/* Custom chevron */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {selected && (
        <p className="text-xs text-slate-500">
          Roadmap will be tailored for opportunities available in{" "}
          <span className="text-slate-300">{selected}</span> and nearby regions.
        </p>
      )}
    </div>
  );
}
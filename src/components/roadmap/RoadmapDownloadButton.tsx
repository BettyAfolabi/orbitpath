"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import RoadmapPDF from "./RoadmapPDF";
import { Roadmap } from "@/lib/generateRoadmap";

export default function RoadmapDownloadButton({ roadmap }: { roadmap: Roadmap }) {
  const fileName = `orbithpath-roadmap-${roadmap.career_track
    .toLowerCase()
    .replace(/\s+/g, "-")}.pdf`;

  return (
    <PDFDownloadLink
      document={<RoadmapPDF roadmap={roadmap} />}
      fileName={fileName}
      className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/70 backdrop-blur-sm transition-all duration-200 hover:border-sky-400/40 hover:bg-sky-500/10 hover:text-sky-300"
    >
      {({ loading }) => (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:translate-y-0.5"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {loading ? "Preparing PDF…" : "Download Roadmap"}
        </>
      )}
    </PDFDownloadLink>
  );
}
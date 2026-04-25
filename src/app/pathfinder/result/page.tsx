"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { QuizAnswers } from "@/hooks/useQuizState";
import { motion } from "framer-motion";

function getAnswersFromStorage(): QuizAnswers | null {
  try {
    const raw = sessionStorage.getItem("launchpad_quiz_answers");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function PathfinderResultPage() {
  const router = useRouter();
  const [answers] = useState<QuizAnswers | null>(getAnswersFromStorage);

  if (!answers) {
    router.replace("/pathfinder");
    return null;
  }

  if (!answers) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg text-center space-y-4"
      >
        <div className="text-4xl">🛰️</div>
        <h1 className="text-2xl font-bold tracking-tight">
          Quiz complete!
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Answers saved. Day 5 will wire this page up to the Gemini API and
          render your personalized roadmap here.
        </p>

        {/* Debug: show what was captured */}
        <div className="mt-6 text-left bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-xs text-slate-400 space-y-2 font-mono">
          <div><span className="text-slate-600">skills:</span> {answers.skills.join(", ") || "—"}</div>
          <div><span className="text-slate-600">interests:</span> {answers.interests.join(", ") || "—"}</div>
          <div><span className="text-slate-600">education:</span> {answers.education || "—"}</div>
          <div><span className="text-slate-600">goals:</span> {answers.goals || "—"}</div>
        </div>

        <button
          onClick={() => router.push("/pathfinder")}
          className="mt-4 text-xs text-slate-500 hover:text-slate-300 underline underline-offset-4 transition-colors"
        >
          ← Retake quiz
        </button>
      </motion.div>
    </div>
  );
}
"use client";

import { useRouter } from "next/navigation";
import { submitQuiz } from "./actions";
import { useQuizState } from "@/hooks/useQuizState";
import ProgressBar from "@/components/pathfinder/ProgressBar";
import QuizStep from "@/components/pathfinder/QuizStep";
import SkillsStep from "@/components/pathfinder/SkillStep";
import InterestsStep from "@/components/pathfinder/InterestsStep";
import EducationStep from "@/components/pathfinder/EducationStep";
import GoalsStep from "@/components/pathfinder/GoalStep";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function PathfinderPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    step,
    direction,
    answers,
    hydrated,
    toggleSkill,
    toggleInterest,
    updateAnswer,
    goNext,
    goBack,
    isStepValid,
    totalSteps,
  } = useQuizState();

  async function handleSubmit() {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const answers = JSON.parse(
        sessionStorage.getItem("launchpad_quiz_answers") ?? "{}"
      );
      const { id } = await submitQuiz(answers);
      router.push(`/pathfinder/result?id=${id}`);
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  const isLast = step === totalSteps - 1;

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-sky-400/30 border-t-sky-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Subtle star field bg */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 15%, rgba(255,255,255,0.15) 0%, transparent 100%), radial-gradient(1px 1px at 75% 40%, rgba(255,255,255,0.1) 0%, transparent 100%), radial-gradient(1.5px 1.5px at 55% 70%, rgba(255,255,255,0.12) 0%, transparent 100%), radial-gradient(1px 1px at 10% 80%, rgba(255,255,255,0.08) 0%, transparent 100%)",
        }}
      />

      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-sky-950/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-xs tracking-widest uppercase mb-6 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Launchpad
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">
            Space Career{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-violet-400">
              Pathfinder
            </span>
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            4 questions. A personalized roadmap. Built by AI.
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-10"
        >
          <ProgressBar current={step} total={totalSteps} />
        </motion.div>

        {/* Step content */}
        <div className="min-h-90">
          <QuizStep stepKey={step} direction={direction}>
            {step === 0 && (
              <SkillsStep selected={answers.skills} onToggle={toggleSkill} />
            )}
            {step === 1 && (
              <InterestsStep selected={answers.interests} onToggle={toggleInterest} />
            )}
            {step === 2 && (
              <EducationStep
                selected={answers.education}
                onSelect={(v) => updateAnswer("education", v)}
              />
            )}
            {step === 3 && (
              <GoalsStep
                selected={answers.goals}
                onSelect={(v) => updateAnswer("goals", v)}
              />
            )}
          </QuizStep>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="flex items-center justify-between mt-10 pt-6 border-t border-slate-800/60"
        >
          <button
            onClick={goBack}
            disabled={step === 0}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 disabled:opacity-0 disabled:pointer-events-none transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>

          <div className="text-xs text-slate-600 tracking-widest">
            {step + 1} / {totalSteps}
          </div>

          {isLast ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="..."
            >
              {isSubmitting ? "Generating your roadmap..." : "Launch My Roadmap 🚀"}
            </button>
          ) : (
            <button
              onClick={goNext}
              disabled={!isStepValid(step)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-slate-800 text-slate-200 border border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 hover:border-slate-600 transition-all duration-200"
            >
              Continue
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          {submitError && (
            <p className="mt-2 text-sm text-red-400">{submitError}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
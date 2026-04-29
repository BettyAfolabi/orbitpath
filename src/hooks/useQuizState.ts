"use client";

import { useState, useEffect } from "react";

export type QuizAnswers = {
  skills: string[];
  interests: string[];
  education: string;
  goals: string;
};

const STORAGE_KEY = "orbitpath_quiz_answers";
const STEP_KEY = "orbitpath_quiz_step";

const defaultAnswers: QuizAnswers = {
  skills: [],
  interests: [],
  education: "",
  goals: "",
};

export function useQuizState() {
  const [step, setStep] = useState<number>(() => {
    try {
      const saved = sessionStorage.getItem(STEP_KEY);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [direction, setDirection] = useState<1 | -1>(1);

  const [answers, setAnswers] = useState<QuizAnswers>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultAnswers;
    } catch {
      return defaultAnswers;
    }
  });

  // Persist to sessionStorage whenever answers or step change
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
      sessionStorage.setItem(STEP_KEY, String(step));
    } catch {
      // ignore
    }
  }, [answers, step]);

  const updateAnswer = <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSkill = (skill: string) => {
    setAnswers((prev) => {
      const exists = prev.skills.includes(skill);
      return {
        ...prev,
        skills: exists ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
      };
    });
  };

  const toggleInterest = (interest: string) => {
    setAnswers((prev) => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest],
      };
    });
  };

  const goNext = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const reset = () => {
    setAnswers(defaultAnswers);
    setStep(0);
    setDirection(1);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STEP_KEY);
    } catch {
      // ignore
    }
  };

  const isStepValid = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0:
        return answers.skills.length > 0;
      case 1:
        return answers.interests.length > 0;
      case 2:
        return answers.education !== "";
      case 3:
        return answers.goals !== "";
      default:
        return false;
    }
  };

  return {
    step,
    direction,
    answers,
    hydrated: true, 
    updateAnswer,
    toggleSkill,
    toggleInterest,
    goNext,
    goBack,
    reset,
    isStepValid,
    totalSteps: 4,
  };
}
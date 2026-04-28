"use server";

import { supabase } from "@/lib/supabase";
import { generateRoadmap, QuizAnswers } from "@/lib/generateRoadmap";

export async function submitQuiz(
  answers: QuizAnswers
): Promise<{ id: string }> {
  // Generate roadmap via Gemini
  const roadmap = await generateRoadmap(answers);

  // Save answers + roadmap to Supabase
  const { data, error } = await supabase
    .from("roadmaps")
    .insert({ answers, roadmap })
    .select("id")
    .single();

  if (error) throw new Error(`Supabase insert failed: ${error.message}`);

  return { id: data.id };
}
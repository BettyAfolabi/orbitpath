import { supabase } from "@/lib/supabase";
import RoadmapDisplay from "@/components/roadmap/RoadmapDisplay";
import Link from "next/link";
import { Roadmap } from "@/lib/generateRoadmap";
import FeedbackBar from "@/components/roadmap/FeedbackBar";

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export default async function ResultPage({ searchParams }: Props) {
  const { id } = await searchParams;

  if (!id) {
    return <ErrorState message="No roadmap ID found. Please retake the quiz." />;
  }

  const { data, error } = await supabase
    .from("roadmaps")
    .select("id, roadmap")
    .eq("id", id)
    .single();

  if (error || !data) {
    return (
      <ErrorState message="We couldn't load your roadmap. It may have expired." />
    );
  }

  return (
    <main className="min-h-screen bg-[#080B14]">
      <RoadmapDisplay
        roadmap={data.roadmap as Roadmap}
        roadmapId={data.id}
      />
      <FeedbackBar roadmapId={data.id} />
    </main>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#080B14] px-4 text-center">
      <p className="mb-2 text-4xl">🛸</p>
      <h1 className="mb-2 text-xl font-bold text-white">Lost in Space</h1>
      <p className="mb-6 text-sm text-white/50">{message}</p>
      <Link
        href="/pathfinder"
        className="rounded-full bg-sky-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-sky-400"
      >
        Retake the Quiz
      </Link>
    </main>
  );
}
import { supabase } from "@/lib/supabase";
import RoadmapDisplay from "@/components/roadmap/RoadmapDisplay";
import { Roadmap } from "@/lib/generateRoadmap";
import FeedbackBar from "@/components/roadmap/FeedbackBar";
import RetakeButton from "@/components/pathfinder/RetakeButton";

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
    <main className="min-h-screen bg-[#080B14] pb-28 md:pb-20">
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
      <RetakeButton />
    </main>
  );
}
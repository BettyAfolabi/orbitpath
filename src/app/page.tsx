import Hero from "@/components/home/Hero";
import GlobeWrapper from "@/components/home/GlobeWrapper";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#050810] overflow-hidden">
      {/* Star field background */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 50% 60%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 10% 80%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 70%, rgba(255,255,255,0.4) 0%, transparent 100%)`,
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        <div className="flex-1 flex items-center lg:max-w-[50%]">
          <Hero />
        </div>
        <div className="flex-1 h-[50vh] lg:h-screen lg:max-w-[55%] relative">
          <GlobeWrapper />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#050810] to-transparent pointer-events-none" />
    </main>
  );
}
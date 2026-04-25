import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { artemisIICrew, getCrewBySlug } from "@/data/crew";
import CrewImage from "@/components/crew/CrewImage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return artemisIICrew.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = getCrewBySlug(slug);
  if (!member) return { title: "Not Found" };
  return {
    title: `${member.name} — Artemis II Crew | Launchpad`,
    description: member.shortBio,
  };
}

export default async function CrewProfilePage({ params }: Props) {
  const { slug } = await params;
  const member = getCrewBySlug(slug);
  if (!member) notFound();

  const idx = artemisIICrew.findIndex((m) => m.slug === slug);
  const prev = idx > 0 ? artemisIICrew[idx - 1] : null;
  const next = idx < artemisIICrew.length - 1 ? artemisIICrew[idx + 1] : null;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Back nav */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/80 backdrop-blur-md border-b border-white/4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link href="/" className="text-sm text-slate-500 hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-slate-700">·</span>
            <Link href="/crew" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
              ← All Crew
            </Link>
          </div>
          <span className="text-xs font-mono tracking-widest text-slate-600 uppercase">Artemis II</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative pt-20 min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <CrewImage
            src={member.image}
            alt={member.name}
            fill
            priority
            className="object-cover object-[center_20%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 w-full">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-mono tracking-[0.3em] text-blue-400 uppercase">{member.agency}</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-slate-400 uppercase">{member.nationality}</span>
            </div>
            <p className="text-xs tracking-[0.25em] text-blue-300 uppercase font-mono mb-3">{member.role}</p>
            <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-4">{member.name}</h1>
            <p className="text-slate-300 text-base leading-relaxed max-w-lg">{member.shortBio}</p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="relative z-10 border-y border-white/6 bg-black/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/6">
            {member.stats.map((stat) => (
              <div key={stat.label} className="py-6 px-6 text-center">
                <div className="text-2xl font-light text-white mb-1">{stat.value}</div>
                <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-xs tracking-[0.3em] text-blue-400 uppercase font-mono mb-5">Biography</h2>
              <p className="text-slate-300 leading-[1.85] text-[15px]">{member.bio}</p>
            </div>
            <div>
              <h2 className="text-xs tracking-[0.3em] text-blue-400 uppercase font-mono mb-4">Specialization</h2>
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-blue-500/30 bg-blue-500/10">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-sm text-blue-200">{member.specialization}</span>
              </div>
            </div>
            <div>
              <h2 className="text-xs tracking-[0.3em] text-blue-400 uppercase font-mono mb-4">Previous Missions</h2>
              {member.previousMissions.length > 0 ? (
                <ul className="space-y-2">
                  {member.previousMissions.map((m) => (
                    <li key={m} className="flex items-center gap-3 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500 italic">
                  Artemis II was {member.name.split(" ")[0]}&apos;s first spaceflight.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/6 bg-white/2 p-6">
              <h3 className="text-xs tracking-[0.25em] text-amber-400 uppercase font-mono mb-4">Did You Know</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{member.funFact}</p>
            </div>
            {member.socials && (
              <div className="rounded-2xl border border-white/6 bg-white/2 p-6">
                <h3 className="text-xs tracking-[0.25em] text-slate-400 uppercase font-mono mb-4">More</h3>
                <div className="space-y-2">
                  {member.socials.nasa && (
                    <a href={member.socials.nasa} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between text-sm text-slate-400 hover:text-white transition-colors group">
                      <span>NASA Profile</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between text-sm text-slate-400 hover:text-white transition-colors group">
                      <span>Twitter / X</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </a>
                  )}
                </div>
              </div>
            )}
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
              <p className="text-xs tracking-[0.2em] text-blue-400 uppercase font-mono mb-3">Inspired?</p>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Discover what skills, degrees, and programs could take you to space.
              </p>
              <Link href="/pathfinder"
                className="block text-center text-sm px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200">
                Find Your Path →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Crew nav */}
      <section className="border-t border-white/4 bg-black">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between gap-4">
            {prev ? (
              <Link href={`/crew/${prev.slug}`} className="group flex items-center gap-4 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 border border-white/10">
                  <CrewImage src={prev.image} alt={prev.name} fill className="object-cover object-top grayscale" sizes="40px" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">Previous</p>
                  <p className="text-sm text-slate-300 group-hover:text-white transition-colors">← {prev.name}</p>
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/crew/${next.slug}`} className="group flex items-center gap-4 text-right hover:opacity-80 transition-opacity">
                <div>
                  <p className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">Next</p>
                  <p className="text-sm text-slate-300 group-hover:text-white transition-colors">{next.name} →</p>
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 border border-white/10">
                  <CrewImage src={next.image} alt={next.name} fill className="object-cover object-top grayscale" sizes="40px" />
                </div>
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </main>
  );
}
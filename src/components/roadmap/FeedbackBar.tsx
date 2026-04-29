"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  roadmapId: string;
}

type Thumb = "up" | "down" | null;

export default function FeedbackBar({ roadmapId }: Props) {
  const [thumb, setThumb] = useState<Thumb>(null);
  const [stars, setStars] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error" | "loading">("loading");

  useEffect(() => {
    async function checkExisting() {
      try {
        const res = await fetch(`/api/label?roadmapId=${roadmapId}`);
        const data = await res.json();
        if (data.label) {
          setThumb(data.label.thumb);
          setStars(data.label.stars);
          setStatus("saved");
        } else {
          setStatus("idle");
        }
      } catch {
        setStatus("idle");
      }
    }
    checkExisting();
  }, [roadmapId]);

  async function submit(t: Thumb, s: number) {
    if (!t || !s || status === "saved") return;
    setStatus("saving");
    try {
      const res = await fetch("/api/label", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roadmapId, thumb: t, stars: s }),
      });
      if (!res.ok) throw new Error();
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  function handleThumb(val: "up" | "down") {
    if (status === "saved") return;
    setThumb(val);
    if (stars) submit(val, stars);
  }

  function handleStar(val: number) {
    if (status === "saved") return;
    setStars(val);
    if (thumb) submit(thumb, val);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#080B14]/95 backdrop-blur-md">
      <div className="mx-auto max-w-3xl px-4 md:px-6">

        <div className="flex items-center justify-center gap-3 py-3 md:hidden border-b border-white/6">
          {status === "loading" ? (
            <p className="text-xs text-white/20">Loading…</p>
          ) : status === "saved" ? (
            <div className="flex items-center gap-3">
              <p className="text-xs text-green-400 font-mono tracking-wide">✓ Rated</p>
              {thumb === "up" ? (
                <ThumbsUp size={13} className="text-indigo-300" />
              ) : (
                <ThumbsDown size={13} className="text-indigo-300" />
              )}
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={13}
                    className={n <= stars ? "fill-yellow-400 text-yellow-400" : "text-white/20"}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/30 uppercase tracking-widest">Rate</span>
              {/* Thumbs */}
              <div className="flex gap-1.5">
                {(["up", "down"] as const).map((val) => (
                  <button
                    key={val}
                    onClick={() => handleThumb(val)}
                    className={`p-1.5 rounded-full border transition-all ${
                      thumb === val
                        ? "border-indigo-400 bg-indigo-500/20 text-indigo-300"
                        : "border-white/10 text-white/30 hover:border-white/30 hover:text-white/60"
                    }`}
                  >
                    {val === "up" ? <ThumbsUp size={13} /> : <ThumbsDown size={13} />}
                  </button>
                ))}
              </div>
              {/* Stars */}
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => handleStar(n)}
                    onMouseEnter={() => setHovered(n)}
                    onMouseLeave={() => setHovered(0)}
                    className="p-0.5"
                  >
                    <Star
                      size={16}
                      className={
                        n <= (hovered || stars)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-white/20"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 py-3 md:hidden">
          <Link
            href="/pathfinder"
            className="flex items-center gap-1.5 text-sm text-white/40 transition hover:text-white/70"
          >
            <ArrowLeft size={14} />
            Retake
          </Link>
          <Link
            href="/crew"
            className="rounded-full bg-sky-500 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-sky-400 whitespace-nowrap"
          >
            Meet the crew →
          </Link>
        </div>

        <div className="hidden md:flex items-center justify-between gap-4 py-4">
          <Link
            href="/pathfinder"
            className="flex items-center gap-2 text-sm text-white/40 transition hover:text-white/70 shrink-0"
          >
            <ArrowLeft size={15} />
            Retake quiz
          </Link>

          {status === "loading" ? (
            <p className="text-xs text-white/20">Loading…</p>
          ) : status === "saved" ? (
            <div className="flex items-center gap-3">
              <p className="text-sm text-green-400">✓ Rated</p>
              <div className="flex gap-1">
                {thumb === "up" ? (
                  <ThumbsUp size={14} className="text-indigo-300" />
                ) : (
                  <ThumbsDown size={14} className="text-indigo-300" />
                )}
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={14}
                    className={n <= stars ? "fill-yellow-400 text-yellow-400" : "text-white/20"}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/30 uppercase tracking-widest">
                Rate this roadmap
              </span>
              <div className="flex gap-2">
                {(["up", "down"] as const).map((val) => (
                  <button
                    key={val}
                    onClick={() => handleThumb(val)}
                    className={`p-2 rounded-full border transition-all ${
                      thumb === val
                        ? "border-indigo-400 bg-indigo-500/20 text-indigo-300"
                        : "border-white/10 text-white/30 hover:border-white/30 hover:text-white/60"
                    }`}
                  >
                    {val === "up" ? <ThumbsUp size={15} /> : <ThumbsDown size={15} />}
                  </button>
                ))}
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => handleStar(n)}
                    onMouseEnter={() => setHovered(n)}
                    onMouseLeave={() => setHovered(0)}
                  >
                    <Star
                      size={18}
                      className={
                        n <= (hovered || stars)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-white/20"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          <Link
            href="/crew"
            className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-400 whitespace-nowrap shrink-0"
          >
            Meet the crew →
          </Link>
        </div>

      </div>
    </div>
  );
}
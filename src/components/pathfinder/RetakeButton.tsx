"use client";

export default function RetakeButton() {
  return (
    <button
      onClick={() => {
        try {
          sessionStorage.removeItem("orbitpath_quiz_answers");
          sessionStorage.removeItem("orbitpath_quiz_step");
        } catch {}
        window.location.href = "/pathfinder";
      }}
      className="rounded-full bg-sky-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-sky-400"
    >
      Retake the Quiz
    </button>
  );
}
<div align="center">

```
 ██████╗ ██████╗ ██████╗ ██╗████████╗██████╗  █████╗ ████████╗██╗  ██╗
██╔═══██╗██╔══██╗██╔══██╗██║╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██║  ██║
██║   ██║██████╔╝██████╔╝██║   ██║   ██████╔╝███████║   ██║   ███████║
██║   ██║██╔══██╗██╔══██╗██║   ██║   ██╔═══╝ ██╔══██║   ██║   ██╔══██║
╚██████╔╝██║  ██║██████╔╝██║   ██║   ██║     ██║  ██║   ██║   ██║  ██║
 ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
```

**Your AI-powered path to a career in space.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Groq](https://img.shields.io/badge/Groq-LLaMA_3-F55036?style=flat-square)](https://groq.com)
[![Supabase](https://img.shields.io/badge/Supabase-postgres-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

[Live Demo](https://orbitpath.vercel.app) · [Report a Bug](#)

</div>

---

## What is OrbitPath?

Most people who want to work in space don't know where to start.

OrbitPath is a two-part application: a **live Artemis mission dashboard** that tracks the ISS in real time and profiles the Artemis II crew, and an **AI-powered career pathfinder** that takes your background and goals and generates a personalised roadmap into the space industry — complete with programs, certifications, and milestones.

---

## Features

### Mission Dashboard
- **Live ISS tracker** — 3D interactive globe powered by `globe.gl`, polling position every 5 seconds
- **Artemis II crew profiles** — detailed pages for all four astronauts with stats, bios, and mission context
- **Mission timeline** — scrolling sequence of Artemis I through Artemis V with status indicators

### Career Pathfinder
- **5-step quiz** — captures country, skills, interests, education level, and career goals
- **AI roadmap generation** — Groq produces a structured multi-phase career roadmap personalised to your answers
- **Localised recommendations** — universities, programs, and resources tailored to the user's country, prioritising regional institutions over default US/European ones
- **Verified links** — every URL in the roadmap is checked server-side before delivery; broken paths are stripped to root domain or removed entirely
- **Download as PDF** — users can save their personalised roadmap as a PDF for offline reference or sharing
- **Data labeling loop** — users rate each recommendation, storing labeled data in Supabase for future model improvement

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Globe | globe.gl + Three.js |
| AI | Groq |
| Database | Supabase (PostgreSQL) |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Groq API key](https://console.groq.com) (free tier works)
- A [Supabase](https://supabase.com) project

### Installation

```bash
git clone https://github.com/BettyAfolabi/orbitpath.git
cd orbitpath
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
GROQ_API_KEY=your_groq_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Schema

Run this in your Supabase SQL editor:

```sql
-- Stores quiz inputs + generated roadmaps
create table roadmaps (
  id uuid primary key default gen_random_uuid(),
  answers jsonb not null,
  roadmap jsonb not null,
  created_at timestamptz default now()
);

-- Stores user feedback labels on roadmap recommendations
create table labels (
  id uuid primary key default gen_random_uuid(),
  roadmap_id uuid references roadmaps(id) on delete cascade,
  recommendation_id text not null,
  rating int check (rating between 1 and 5),
  thumbs_up boolean,
  created_at timestamptz default now()
);
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
orbitpath/
├── app/
│   ├── page.tsx                  # Homepage — hero, globe, story, timeline
│   ├── crew/
│   │   ├── page.tsx              # Crew grid
│   │   └── [slug]/page.tsx       # Individual astronaut profile
│   ├── pathfinder/
│   │   ├── page.tsx              # Multi-step quiz
│   │   ├── actions.ts            # Server action — calls Groq
│   │   └── result/page.tsx       # AI roadmap display + PDF download
│   └── api/label/route.ts        # Saves feedback to Supabase
├── components/
│   ├── home/                     # Hero, ISSGlobe, StorySection, etc.
│   ├── crew/                     # CrewGrid, CrewImage
│   ├── pathfinder/               # Quiz step components (incl. CountryStep)
│   └── roadmap/                  # RoadmapDisplay, LabelingWidget, etc.
├── lib/
│   ├── generateRoadmap.ts        # Groq API integration + URL verification
│   ├── nasa.ts                   # ISS position helpers
│   └── supabase.ts               # Supabase client
├── types/
│   └── index.ts
├── hooks/
│   ├── useISSPosition.ts         # Polls ISS every 5s
│   └── useQuizState.ts           # Multi-step quiz state
└── data/
    ├── crew.ts                   # Artemis II crew + timeline data
    └── countries.ts              # Country list for localisation
```

---

## How the AI Roadmap Works

1. User completes the 5-step pathfinder quiz, starting with their country
2. Answers are passed to a Next.js server action
3. The server action calls Groq with a structured prompt that includes localisation rules based on the user's country
4. Groq returns a JSON roadmap with phases, milestones, and recommended programs — prioritising regional universities and institutions
5. Every URL in the roadmap is verified server-side in parallel — broken paths are stripped to their root domain or dropped entirely
6. The roadmap is saved to Supabase and the user is redirected to their result page
7. The user can download their roadmap as a PDF for offline reference or sharing
8. The user rates each recommendation — labels are stored for dataset creation

The labeling loop is intentional: every rating is a training signal. The long-term vision is a fine-tuned model that improves recommendations based on what real aspiring space professionals found useful.

---

## Roadmap

- [ ] User accounts — save and revisit roadmaps
- [ ] Roadmap comparison — see how your path differs from the crew's
- [ ] NASA jobs API integration — surface real open roles matching your roadmap
- [ ] Fine-tuned model trained on collected labels

---

## About

Built by **Betty Afolabi** ([@devduchess](https://github.com/BettyAfolabi)) as a passion project — the kind of tool that should have existed when she first started wondering if a career in space was possible.

The space industry is growing faster than most people realise. OrbitPath exists to make the entry point visible.

---

<div align="center">
  <sub>ISS position via wheretheiss.at · Built with ♥ and a lot of <code>npm run dev</code></sub>
</div>
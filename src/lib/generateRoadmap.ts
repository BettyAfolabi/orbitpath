export type Resource = {
  title: string;
  url: string;
  type: "course" | "book" | "program" | "community" | "certification";
};

export type Milestone = {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  resources: Resource[];
};

export type Phase = {
  id: string;
  title: string;
  summary: string;
  milestones: Milestone[];
};

export type RecommendedProgram = {
  name: string;
  organization: string;
  description: string;
  url: string;
  deadline?: string;
};

export type Roadmap = {
  headline: string;
  summary: string;
  career_track: string;
  phases: Phase[];
  recommended_programs: RecommendedProgram[];
  encouragement: string;
};

export type QuizAnswers = {
  country: string;      
  skills: string[];
  interests: string[];
  education: string;
  goals: string;
};

// URL Verification 

function getRootUrl(url: string): string {
  try {
    const { protocol, host } = new URL(url);
    return `${protocol}//${host}`;
  } catch {
    return url;
  }
}

async function checkUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(5000),
      redirect: "follow",
    });
    return res.ok || res.status === 405; // 405 = HEAD not allowed but site exists
  } catch {
    return false;
  }
}

async function verifyUrl(url: string): Promise<string | null> {
  if (await checkUrl(url)) return url;          // full URL works — keep it
  const root = getRootUrl(url);
  if (root !== url && (await checkUrl(root))) return root;  // strip to root
  return null;                                  // both failed — drop it
}

async function verifyAllUrls(roadmap: Roadmap): Promise<Roadmap> {
  const urlSet = new Set<string>();

  for (const phase of roadmap.phases)
    for (const milestone of phase.milestones)
      for (const resource of milestone.resources)
        if (resource.url) urlSet.add(resource.url);

  for (const program of roadmap.recommended_programs)
    if (program.url) urlSet.add(program.url);

  // Fire all checks in parallel
  const results = await Promise.all(
    [...urlSet].map(async (url) => [url, await verifyUrl(url)] as const)
  );
  const urlMap = new Map(results);

  const verifiedPhases = roadmap.phases.map((phase) => ({
    ...phase,
    milestones: phase.milestones.map((milestone) => ({
      ...milestone,
      resources: milestone.resources
        .map((resource) => {
          const verified = urlMap.get(resource.url);
          if (!verified) return null;
          return { ...resource, url: verified };
        })
        .filter(Boolean) as Resource[],
    })),
  }));

  const verifiedPrograms = roadmap.recommended_programs
    .map((program) => {
      const verified = urlMap.get(program.url);
      if (!verified) return null;
      return { ...program, url: verified };
    })
    .filter(Boolean) as RecommendedProgram[];

  return { ...roadmap, phases: verifiedPhases, recommended_programs: verifiedPrograms };
}

export async function generateRoadmap(answers: QuizAnswers): Promise<Roadmap> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is not set");

  const prompt = `
You are a space career advisor helping someone build a personalized roadmap toward working in the space industry.

Here are the user's quiz answers:
- Country: ${answers.country}
- Skills: ${answers.skills.join(", ")}
- Interests: ${answers.interests.join(", ")}
- Education level: ${answers.education}
- Career goal: ${answers.goals}

Generate a detailed, realistic, and inspiring space career roadmap for this person.

LOCALISATION RULES — follow these strictly:
1. The user is based in ${answers.country}. Prioritise universities, programs, and institutions that are accessible from ${answers.country} or nearby countries in the same region.
2. Only suggest internationally remote or online programs (Coursera, edX, etc.) if no strong regional alternative exists for that specific need.
3. For recommended_programs: lead with institutions in ${answers.country} or the same continent/region. If the user is in Africa, surface African universities with aerospace or STEM programs (e.g. University of Lagos, University of Nairobi, Obafemi Awolowo University, Cairo University, University of Cape Town, African Leadership University). If in Asia, surface Asian institutions. If in South America, surface Latin American universities. Only include MIT, Stanford, or similar US/European institutions if they offer free/online access or if no regional alternative exists.
4. For resources inside milestones: prefer platforms and resources accessible without US or EU payment restrictions (e.g. Coursera, edX, YouTube, national space agency portals).
5. Do not invent institutions — only name real, verifiable universities and programs.

Respond ONLY with a valid JSON object matching this exact structure — no markdown, no backticks, no extra text:

{
  "headline": "short punchy title for their career track — based on their skills and goal, never their country or nationality (max 8 words)",
  "summary": "2-3 sentence overview written directly to the user in second person (use 'you' and 'your', never 'they' or 'their'). Make it feel personal and energising, not like a report about them.",
  "career_track": "specific job title or role they are working toward",
  "phases": [
    {
      "id": "phase-1",
      "title": "Phase title",
      "summary": "1-2 sentence description of this phase",
      "milestones": [
        {
          "id": "m-1-1",
          "title": "Milestone title",
          "description": "What to do and why it matters (2-3 sentences)",
          "timeframe": "Months 1–3",
          "resources": [
            {
              "title": "Resource name",
              "url": "https://real-url.com",
              "type": "course"
            }
          ]
        }
      ]
    }
  ],
  "recommended_programs": [
    {
      "name": "Program name",
      "organization": "University / Agency / Institution name",
      "description": "1-2 sentences on what it is and why it fits this person",
      "url": "https://real-url.com",
      "deadline": "Rolling / April 2025 / etc (optional)"
    }
  ],
  "encouragement": "One powerful closing sentence personalized to their goal"
}

Rules:
- Exactly 3 phases
- Each phase has 2–3 milestones
- Each milestone has 1–2 resources with real, working URLs
- 3–5 recommended programs
- All content must be specific to the space industry
- Tailor everything tightly to their skills, interests, education, goal, and country
- Do not invent fake organizations — only use real ones
`.trim();

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 4000,
      messages: [
        {
          role: "system",
          content:
            "You are a space career advisor. Always respond with valid JSON only — no markdown, no backticks, no extra text.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq API error: ${res.status} — ${err}`);
  }

  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content;

  if (!raw) throw new Error("Empty response from Groq");

  const cleaned = raw.replace(/```json|```/g, "").trim();

  let roadmap: Roadmap;
  try {
    roadmap = JSON.parse(cleaned) as Roadmap;
  } catch {
    throw new Error(
      `Failed to parse Groq response as JSON: ${cleaned.slice(0, 200)}`
    );
  }

  // Verify all URLs — fix or drop broken ones
  const verified = await verifyAllUrls(roadmap);
  return verified;
}
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
  skills: string[];
  interests: string[];
  education: string;
  goals: string;
};

export async function generateRoadmap(answers: QuizAnswers): Promise<Roadmap> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is not set");

  const prompt = `
You are a space career advisor helping someone build a personalized roadmap toward working in the space industry.

Here are the user's quiz answers:
- Skills: ${answers.skills.join(", ")}
- Interests: ${answers.interests.join(", ")}
- Education level: ${answers.education}
- Career goal: ${answers.goals}

Generate a detailed, realistic, and inspiring space career roadmap for this person.

Respond ONLY with a valid JSON object matching this exact structure — no markdown, no backticks, no extra text:

{
  "headline": "short punchy title for their career path (max 8 words)",
  "summary": "2-3 sentence overview of their unique path into the space industry",
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
      "organization": "NASA / ESA / SpaceX / University name / etc",
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
- Tailor everything tightly to their skills, interests, education, and goal
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

  try {
    return JSON.parse(cleaned) as Roadmap;
  } catch {
    throw new Error(
      `Failed to parse Groq response as JSON: ${cleaned.slice(0, 200)}`
    );
  }
}
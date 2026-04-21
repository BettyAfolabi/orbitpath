import { QuizAnswers, CareerRoadmap } from "@/types";

export async function generateRoadmap(
  userProfile: QuizAnswers
): Promise<CareerRoadmap> {
  const prompt = `
    You are a NASA career counselor and space industry expert.
    
    A user has completed a career interest quiz. Based on their profile,
    generate a personalized space career roadmap.
    
    USER PROFILE:
    - Current skills: ${userProfile.skills.join(", ")}
    - Education level: ${userProfile.education}
    - Interests in space: ${userProfile.interests.join(", ")}
    - Career goals: ${userProfile.goals}
    - Years of experience: ${userProfile.experience}
    
    Return a JSON object with this exact structure:
    {
      "careerTrack": "string",
      "summary": "string - 2-3 sentence personalized summary",
      "recommendations": [
        {
          "id": "string",
          "title": "string",
          "description": "string",
          "timeframe": "string e.g. 0-6 months",
          "skills": ["skill1", "skill2"],
          "relevanceScore": number between 1 and 5
        }
      ],
      "programs": [
        {
          "name": "string - real NASA or space industry program",
          "url": "string",
          "why": "string"
        }
      ],
      "nextStep": "string - single most important thing to do this week"
    }
    
    Return ONLY the JSON. No explanation, no markdown, no backticks.
  `;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7 },
      }),
    }
  );

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean) as CareerRoadmap;
}
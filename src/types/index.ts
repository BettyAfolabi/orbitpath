
export interface AstronautProfile {
  id: string;
  slug: string;
  name: string;
  role: string;
  agency: "NASA" | "CSA" | "ESA";
  bio: string;
  imageUrl: string;
  missions: string[];
}

export interface QuizAnswers {
  skills: string[];
  education: string;
  interests: string[];
  goals: string;
  experience: string;
}

export interface RoadmapRecommendation {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  skills: string[];
  relevanceScore: number;
}

export interface SpaceProgram {
  name: string;
  url: string;
  why: string;
}

export interface CareerRoadmap {
  careerTrack: string;
  summary: string;
  recommendations: RoadmapRecommendation[];
  programs: SpaceProgram[];
  nextStep: string;
}

export interface LabelEntry {
  quizAnswers: QuizAnswers;
  recommendationId: string;
  recommendationTitle: string;
  rating: number;
  createdAt: string;
}

export interface ISSPosition {
  latitude: number;
  longitude: number;
  timestamp: number;
}
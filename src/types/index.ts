
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
  altitude: number;
  velocity: number;
  timestamp: number;
}

export interface GlobeInstance {
  // Config
  globeImageUrl: (url: string) => GlobeInstance;
  bumpImageUrl: (url: string) => GlobeInstance;
  backgroundImageUrl: (url: string) => GlobeInstance;
  atmosphereColor: (color: string) => GlobeInstance;
  atmosphereAltitude: (alt: number) => GlobeInstance;
  enablePointerInteraction: (val: boolean) => GlobeInstance;
  width: (val: number) => GlobeInstance;
  height: (val: number) => GlobeInstance;
  controls: () => { autoRotate: boolean; autoRotateSpeed: number; enableZoom: boolean };
  // Points
  pointsData: (data: object[]) => GlobeInstance;
  pointAltitude: (key: string) => GlobeInstance;
  pointColor: (key: string) => GlobeInstance;
  pointRadius: (key: string) => GlobeInstance;
  // Arcs
  arcsData: (data: object[]) => GlobeInstance;
  arcColor: (key: string) => GlobeInstance;
  arcAltitudeAutoScale: (val: number) => GlobeInstance;
  arcStroke: (val: number) => GlobeInstance;
  arcDashLength: (val: number) => GlobeInstance;
  arcDashGap: (val: number) => GlobeInstance;
  arcDashAnimateTime: (val: number) => GlobeInstance;
}
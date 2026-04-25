
export interface CrewMember {
  slug: string;
  name: string;
  role: string;
  agency: string;
  nationality: string;
  image: string;
  badge: string;
  bio: string;
  shortBio: string;
  stats: { label: string; value: string }[];
  previousMissions: string[];
  funFact: string;
  specialization: string;
  socials?: { twitter?: string; nasa?: string };
}

// Using NASA Images API CDN — stable public domain portraits
export const artemisIICrew: CrewMember[] = [
  {
    slug: "reid-wiseman",
    name: "Reid Wiseman",
    role: "Commander",
    agency: "NASA",
    nationality: "American",
    image: "/crew/Reid_Wiseman.jpg",
    badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Artemis_II_insignia.png/240px-Artemis_II_insignia.png",
    shortBio: "Commander of Artemis II — the first crewed lunar flyby since Apollo 17. Former Chief of the NASA Astronaut Office and ISS veteran.",
    bio: "Reid Wiseman commanded NASA's Artemis II mission in April 2026, becoming the first person to command a lunar mission since Gene Cernan on Apollo 17, and at 50, the oldest person to travel beyond low Earth orbit. He previously flew on Expedition 41 to the ISS in 2014, spending 165 days in orbit. A former U.S. Navy test pilot with over 3,000 flight hours, Wiseman served as Chief of the Astronaut Office from 2020–2022. During Artemis II, the crew set the record for farthest distance from Earth by humans — 252,756 miles — surpassing Apollo 13.",
    specialization: "Flight Systems & Mission Command",
    stats: [
      { label: "Days in Space", value: "175" },
      { label: "Spacewalks", value: "3" },
      { label: "Max Distance", value: "252,756 mi" },
      { label: "Missions", value: "Exp. 41, Artemis II" },
    ],
    previousMissions: ["Expedition 40/41 (ISS, 2014)"],
    funFact: "During Artemis II, Wiseman's crewmate Jeremy Hansen formally requested a newly discovered lunar crater be named 'Carroll' — after Wiseman's late wife, who passed away from cancer in 2020.",
    socials: {
      twitter: "https://twitter.com/astro_reid",
      nasa: "https://www.nasa.gov/people/reid-wiseman/",
    },
  },
  {
    slug: "victor-glover",
    name: "Victor Glover",
    role: "Pilot",
    agency: "NASA",
    nationality: "American",
    image: "/crew/Victor_Glover.jpg",
    badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Artemis_II_insignia.png/240px-Artemis_II_insignia.png",
    shortBio: "Pilot of Artemis II. First person of color to travel beyond low Earth orbit. Previously the first Black astronaut on a long-duration ISS mission.",
    bio: "Victor Glover piloted NASA's Artemis II mission in April 2026, becoming the first person of color to travel beyond low Earth orbit and around the Moon. He previously flew as pilot of Crew Dragon Resilience on Crew-1, the first operational Commercial Crew mission, and served on ISS Expedition 64 — becoming the first Black astronaut to serve on a long-duration ISS expedition. A U.S. Navy Commander and test pilot, Glover has logged over 3,000 flight hours across more than 40 aircraft types.",
    specialization: "Spacecraft Piloting & Systems",
    stats: [
      { label: "Days in Space", value: "178" },
      { label: "Spacewalks", value: "4" },
      { label: "Flight Hours", value: "3,000+" },
      { label: "Missions", value: "Crew-1, Artemis II" },
    ],
    previousMissions: ["Crew-1 / Expedition 64 (ISS, 2020–2021)"],
    funFact: "Glover played football at Cal Poly before becoming a Navy fighter pilot and test pilot — he's called Artemis II 'the most incredible adventure imaginable.'",
    socials: {
      twitter: "https://twitter.com/AstroVicGlover",
      nasa: "https://www.nasa.gov/people/victor-glover/",
    },
  },
  {
    slug: "christina-koch",
    name: "Christina Koch",
    role: "Mission Specialist",
    agency: "NASA",
    nationality: "American",
    image: "/crew/Christina_Koch.jpg",
    badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Artemis_II_insignia.png/240px-Artemis_II_insignia.png",
    shortBio: "First woman to travel beyond low Earth orbit. Holds the record for longest single spaceflight by a woman — 328 days on the ISS.",
    bio: "Christina Koch made history on Artemis II as the first woman to travel beyond low Earth orbit and around the Moon. She already held the record for the longest single spaceflight by a woman — 328 consecutive days aboard the ISS during Expedition 59/60/61 — and participated in the first all-female spacewalk alongside Jessica Meir in 2019. Before NASA, Koch worked in remote Antarctic stations, training that mirrors the isolation required for deep space. Artemis II cemented her place as one of the most decorated astronauts of her generation.",
    specialization: "Science Operations & EVA",
    stats: [
      { label: "Days in Space", value: "338" },
      { label: "Spacewalks", value: "6" },
      { label: "Record", value: "Longest female spaceflight" },
      { label: "Missions", value: "Exp. 59–61, Artemis II" },
    ],
    previousMissions: ["Expedition 59/60/61 (ISS, 2019–2020)"],
    funFact: "Koch worked in remote Antarctic research stations before becoming an astronaut — isolation and self-reliance training that directly prepared her for the mental demands of deep space.",
    socials: {
      twitter: "https://twitter.com/Astro_Christina",
      nasa: "https://www.nasa.gov/people/christina-hammock-koch/",
    },
  },
  {
    slug: "jeremy-hansen",
    name: "Jeremy Hansen",
    role: "Mission Specialist",
    agency: "CSA",
    nationality: "Canadian",
    image: "/crew/Jeremy_Hansen.jpg",
    badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Artemis_II_insignia.png/240px-Artemis_II_insignia.png",
    shortBio: "First non-American to travel beyond low Earth orbit. Canadian Space Agency astronaut on his very first spaceflight.",
    bio: "Jeremy Hansen became the first Canadian — and first non-American — to travel beyond low Earth orbit when Artemis II launched on April 1, 2026. Remarkably, it was his first spaceflight ever. A former Royal Canadian Air Force fighter pilot with over 2,000 flight hours, Hansen was selected by the CSA in 2009. During the mission, he formally requested that a newly discovered lunar crater be named 'Carroll,' in honor of Commander Wiseman's late wife — a gesture that became one of the most emotional moments of the mission.",
    specialization: "Mission Systems & International Ops",
    stats: [
      { label: "Days in Space", value: "10" },
      { label: "Fighter Hours", value: "2,000+" },
      { label: "Agency", value: "CSA" },
      { label: "Historic First", value: "1st non-American beyond LEO" },
    ],
    previousMissions: [],
    funFact: "Artemis II was Hansen's first ever spaceflight — and it went directly to the Moon. He also formally requested a lunar crater be named 'Carroll' after Commander Wiseman's late wife during the mission.",
    socials: {
      twitter: "https://twitter.com/Astro_Jeremy",
      nasa: "https://www.asc-csa.gc.ca/eng/astronauts/canadian/active/bio-jeremy-hansen.asp",
    },
  },
];

export function getCrewBySlug(slug: string): CrewMember | undefined {
  return artemisIICrew.find((c) => c.slug === slug);
}

export const artemisTimeline = [
  {
    id: "artemis-1",
    date: "Nov 16, 2022",
    title: "Artemis I",
    subtitle: "Uncrewed lunar flyby",
    description:
      "The inaugural SLS/Orion mission sent an uncrewed capsule 40,000 miles beyond the Moon — farther than any human-rated spacecraft had ever traveled. A 25-day mission that proved every system before humans boarded.",
    status: "complete" as const,
    highlight: "40,000 mi beyond the Moon",
    color: "#4ade80",
  },
  {
    id: "artemis-2",
    date: "Apr 1–10, 2026",
    title: "Artemis II",
    subtitle: "First crewed lunar flyby since Apollo 17",
    description:
      "Reid Wiseman, Victor Glover, Christina Koch, and Jeremy Hansen flew a free-return trajectory around the Moon, setting the record for farthest distance from Earth by humans at 252,756 miles. The crew splashed down April 10 off San Diego.",
    status: "complete" as const,
    highlight: "252,756 mi — new human distance record",
    color: "#60a5fa",
  },
  {
    id: "artemis-3",
    date: "2028 (planned)",
    title: "Artemis III",
    subtitle: "First Moon landing since Apollo 17",
    description:
      "The first crewed lunar surface landing of the 21st century. Two astronauts will descend to the lunar South Pole aboard SpaceX's Human Landing System — including the first woman and first person of color on the Moon.",
    status: "planned" as const,
    highlight: "First Moon landing in 50+ years",
    color: "#f59e0b",
  },
  {
    id: "gateway",
    date: "2027–2030",
    title: "Lunar Gateway",
    subtitle: "Permanent lunar orbit station",
    description:
      "A small space station in lunar orbit, serving as a staging point for surface missions and eventually as a waystation for Mars. International partners include ESA, JAXA, and CSA.",
    status: "planned" as const,
    highlight: "Humanity's first deep-space station",
    color: "#a78bfa",
  },
];
import { AstronautProfile } from "@/types";

export const artemisIICrew: AstronautProfile[] = [
  {
    id: "1",
    slug: "reid-wiseman",
    name: "Reid Wiseman",
    role: "Commander",
    agency: "NASA",
    bio: "NASA astronaut and Artemis II commander. Naval aviator and test pilot with a background in electrical engineering. Flew to the ISS on Expedition 40/41.",
    imageUrl: "https://www.nasa.gov/wp-content/uploads/2023/03/wiseman.jpg",
    missions: ["Expedition 40", "Expedition 41", "Artemis II"],
  },
  {
    id: "2",
    slug: "victor-glover",
    name: "Victor Glover",
    role: "Pilot",
    agency: "NASA",
    bio: "NASA astronaut and Artemis II pilot. Naval aviator with over 3,000 flight hours. First Black astronaut to live and work aboard the ISS on Crew Dragon.",
    imageUrl: "https://www.nasa.gov/wp-content/uploads/2023/03/glover.jpg",
    missions: ["Crew-1", "Expedition 64", "Artemis II"],
  },
  {
    id: "3",
    slug: "christina-koch",
    name: "Christina Koch",
    role: "Mission Specialist",
    agency: "NASA",
    bio: "NASA astronaut holding the record for the longest single spaceflight by a woman. Electrical engineer and first woman to fly on an Artemis mission.",
    imageUrl: "https://www.nasa.gov/wp-content/uploads/2023/03/koch.jpg",
    missions: ["Expedition 59", "Expedition 60", "Expedition 61", "Artemis II"],
  },
  {
    id: "4",
    slug: "jeremy-hansen",
    name: "Jeremy Hansen",
    role: "Mission Specialist",
    agency: "CSA",
    bio: "Canadian Space Agency astronaut and Artemis II mission specialist. Former Royal Canadian Air Force fighter pilot. First Canadian to travel to the Moon.",
    imageUrl: "https://www.nasa.gov/wp-content/uploads/2023/03/hansen.jpg",
    missions: ["Artemis II"],
  },
];

export const getCrewBySlug = (slug: string): AstronautProfile | undefined => {
  return artemisIICrew.find((member) => member.slug === slug);
};
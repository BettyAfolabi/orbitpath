import { ISSPosition } from "@/types";

export async function getISSPosition(): Promise<ISSPosition> {
  const response = await fetch("http://api.open-notify.org/iss-now.json", {
    cache: "no-store",
  });
  const data = await response.json();
  return {
    latitude: parseFloat(data.iss_position.latitude),
    longitude: parseFloat(data.iss_position.longitude),
    timestamp: data.timestamp,
  };
}

export async function getAstronautsInSpace(): Promise<string[]> {
  const response = await fetch("http://api.open-notify.org/astros.json");
  const data = await response.json();
  return data.people
    .filter((p: { craft: string; name: string }) => p.craft === "ISS")
    .map((p: { name: string }) => p.name);
}
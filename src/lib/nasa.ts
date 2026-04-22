

export async function getISSPositionFull() {
  const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544", {
    cache: "no-store",
  });
  const data = await res.json();
  return {
    latitude: data.latitude as number,
    longitude: data.longitude as number,
    altitude: data.altitude as number,
    velocity: data.velocity as number,
    timestamp: data.timestamp as number,
  };
}


export async function getAstronautsInSpace(): Promise<string[]> {
  const response = await fetch("http://api.open-notify.org/astros.json");
  const data = await response.json();
  return data.people
    .filter((p: { craft: string; name: string }) => p.craft === "ISS")
    .map((p: { name: string }) => p.name);
}

export function generateISSTrail(
  lat: number,
  lng: number,
  count = 20
): [number, number][] {
  // ISS moves ~7.66 km/s, ~0.065° of longitude per second at equator
  const trail: [number, number][] = [];
  for (let i = count; i >= 0; i--) {
    const offsetLng = (lng - i * 2.5 + 360) % 360 - 180;
    const offsetLat = lat + Math.sin((i * Math.PI) / 10) * 3;
    trail.push([offsetLat, offsetLng]);
  }
  return trail;
}
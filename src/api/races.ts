import Race from "./models/race.ts";

const API: string = window.location.origin;

export async function getRaces(): Promise<Race[]> {
    const response = await fetch(API + "/races.json");
    const data: Race[] = await response.json();

    for (const race of data) {
        race.beginTime = new Date(race.beginTime);
    }

    return data;
}

export async function getRace(id: number): Promise<Race | null> {
    const races = await getRaces();
    const race = races.filter(r => r.id == id);
    return race.length ? race[0] : null;
}
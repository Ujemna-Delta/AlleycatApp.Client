import Race from "./models/race.ts";

const API: string = "./";

export default async function getRaces(): Promise<Race[]> {
    const response = await fetch(API + "/races.json");
    const data: Race[] = await response.json();

    for (const race of data) {
        race.beginTime = new Date(race.beginTime);
    }

    return data;
}
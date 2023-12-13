import Race from "./models/race.ts";

const API: string = "./";

export default async function getRaces(): Promise<Race[]> {
    const response = await fetch(API + "/races.json");
    const data = response.json();
    return data;
}
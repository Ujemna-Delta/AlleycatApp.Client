import Race from "./models/race.ts";
import {RaceForm} from "./models/race-form.ts";
import {mergeDate} from "../utils/mergeDate.ts";

const API: string = "https://alleycatapp-persistence.azurewebsites.net/api";

export async function getRaces(): Promise<Race[]> {
    const response = await fetch(API + "/races");
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

export async function getUpcomingRaces(): Promise<Race[]> {
    let allRaces = await getRaces();

    const currentDate = new Date();

    return allRaces
        .filter(race => new Date(race.beginTime) > currentDate)
        .sort((a, b) => new Date(a.beginTime).getTime() - new Date(b.beginTime).getTime())
        .slice(0, 5);
}

export async function addRace(raceForm: RaceForm): Promise<Race> {
    const race = {
        name: raceForm.name,
        description: raceForm.description,
        beginTime: mergeDate(raceForm.beginHour, raceForm.beginDate),
        startAddress: raceForm.startAddress,
        valueModifier: raceForm.valueModifier,
        isActive: raceForm.isActive,
        isFreeOrder: raceForm.isFreeOrder
    }

    const response = await fetch(API + "/races", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "false"
        },
        body: JSON.stringify(
            race
        )
    });

    if (response.status != 201) {
        throw new Error(response.statusText);
    }

    return await response.json();
}
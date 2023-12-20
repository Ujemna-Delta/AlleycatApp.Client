import Race from "./models/race.ts";
import {RaceForm} from "./models/race-form.ts";
import {mergeDate} from "../utils/mergeDate.ts";

const API: string = "https://alleycatapp-persistence.azurewebsites.net/api";

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
        method: "PUT",
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
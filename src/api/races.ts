import Race from "./models/race.ts";
import {RaceForm} from "./models/race-form.ts";
import {mergeDate} from "../utils/mergeDate.ts";
import User from "./models/user.ts";
import {getLeague} from "./users.ts";

export async function getRaces(): Promise<Race[]> {
    const response = await fetch("/api/Races");
    const data: Race[] = await response.json();

    for (const race of data) {
        race.beginTime = new Date(race.beginTime);
        race.attendeesCount = await getRaceAttendeesCount(race.id)
    }

    return data;
}

export async function getRaceAttendees(id: number): Promise<User[] | null> {
    const response = await fetch(`/api/Races/attendances/race/${id}`);
    return await response.json();
}

export async function getRaceAttendeesCount(id: number): Promise<number> {
    const response = await fetch(`/api/Races/attendances/race/count/${id}`);
    return await response.json();
}

export async function putAttendance(id: number, userId: string): Promise<boolean> {
    try {
        const response = await fetch("/api/Races/attendances", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "false"
            },
            body: JSON.stringify({
                isConfirmed: true,
                attendeeId: userId,
                raceId: id
            })
        })

        return response.status == 200;
    } catch (error) {
        return false;
    }
}

export async function removeAttendance(id: number): Promise<boolean> {
    try {
        const response = await fetch(`/api/Races/attendances/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "false"
            }
        });

        return response.status == 204;
    } catch (error) {
        return false;
    }
}

export async function getRace(id: number): Promise<Race | null> {
    const race_t = await fetch(`/api/Races/${id}`);
    const users = await getRaceAttendees(id)
    const usersCount = await getRaceAttendeesCount(id)
    const race: Race = await race_t.json();
    if (race) {
        let leagueName = ''
        if (race.leagueId) {
            const league = await getLeague(race.leagueId)
            leagueName = league!.name
        }

        return {
            ...race,
            leagueName: leagueName,
            attendees: users,
            attendeesCount: usersCount
        };
    }
    return null;
}

export async function getUpcomingRaces(): Promise<Race[]> {
    const allRaces = await getRaces();

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
        isFreeOrder: raceForm.isFreeOrder,
        leagueId: raceForm.leagueId
    }

    const response = await fetch("/api/Races", {
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
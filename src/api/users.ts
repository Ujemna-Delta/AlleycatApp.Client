import User from "./models/user.ts";
import UserLeagueScore from "./models/user-league-score.ts";
import League from "./models/league.ts";
import {LeagueForm} from "./models/league-form.ts";
import LeaderboardEntry from "./models/leaderboard.ts";
import {getRaces} from "./races.ts";

export async function getUsers(): Promise<User[]> {
    const response = await fetch("/api/users");
    return await response.json();
}

export async function getUsersLeagueScores(): Promise<UserLeagueScore[]> {
    const response = await fetch("/api/Leagues/scores");
    return await response.json()
}

export async function getLeagues(): Promise<League[]> {
    const response = await fetch("/api/Leagues");
    const leagues =  await response.json()
    const races = await getRaces();

    return leagues.map((league: League) => {
        const racesForLeague = races.filter(race => race.leagueId === league.id);
        const racesCount = racesForLeague.length;
        const participantsCount = racesForLeague.reduce((sum, race) => sum + race.attendeesCount, 0);

        return {
            ...league,
            racesCount,
            participantsCount,
        };
    });
}

export async function getLeague(id: number): Promise<League | null> {
    const leagues = await getLeagues();
    const league = leagues.filter(r => r.id == id);
    return league.length ? league[0] : null;
}

export async function addLeague(leagueForm: LeagueForm): Promise<League> {
    const league = {
        name: leagueForm.name,
        description: leagueForm.description,
    }

    const response = await fetch("/api/Leagues", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "false"
        },
        body: JSON.stringify(
            league
        )
    });

    if (response.status != 201) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

export async function getLeaderboardData() {
    const [users, scores, leagues] = await Promise.all([
        getUsers(),
        getUsersLeagueScores(),
        getLeagues(),
    ]);

    const usersMap: { [key: string]: User } = {};
    for (const user of users) {
        usersMap[user.id] = user;
    }


    const leaguesMap: { [key: number]: League } = {};
    for (const league of leagues) {
        leaguesMap[league.id] = league;
    }

    const leaderboardDataByLeague: { [key: string]: { leagueName: string; leaderboard: LeaderboardEntry[] } } = {};

    for (const score of scores) {
        const user = usersMap[score.attendeeId];
        const league = leaguesMap[score.leagueId];

        if (league) {
            const leagueName = league.name;
            const leaderboardEntry = {
                rank: 0, // Initialize rank as 0
                participantName: user ? user.userName : 'Unknown User',
                points: score.score,
            };

            if (!leaderboardDataByLeague[leagueName]) {
                leaderboardDataByLeague[leagueName] = {
                    leagueName,
                    leaderboard: [leaderboardEntry],
                };
            } else {
                leaderboardDataByLeague[leagueName].leaderboard.push(leaderboardEntry);
            }
        }

        for (const leagueData of Object.values(leaderboardDataByLeague)) {
            leagueData.leaderboard.sort((a, b) => b.points - a.points);

            leagueData.leaderboard.forEach((entry, index) => {
                entry.rank = index + 1;
            });

            leagueData.leaderboard = leagueData.leaderboard.slice(0, 5);
        }
    }


    return Object.values(leaderboardDataByLeague);
}

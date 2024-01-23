import {ReactElement, useEffect, useState} from "react";
import '../right-side-tables.css';
import {getLeaderboardData} from "../../../../../api/users.ts";
import LeaderboardEntry from "../../../../../api/models/leaderboard.ts";
import LoadingIcon from "../../../../../components/loading-icon";

export default function LeaderboardTable(): ReactElement {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
    const [leagueName, setLeagueName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        setIsLoading(true);

        getLeaderboardData()
            .then((data) => {
                setIsLoading(false);
                if (data.length > 0) {
                    setLeagueName(data[1].leagueName);
                    setLeaderboardData(data[1].leaderboard);
                }
            })
            .catch((error) => {
                console.error('Error fetching leaderboard data:', error);
            });
    }, []);

    if (isLoading) {
        return (
            <div className="general-container">
                <div className="container-load">
                    <LoadingIcon color="black"/>
                </div>
            </div>
        );
    }

    return (
        <div className="general-container">
            <h2> Leaderboard for {leagueName}</h2>
            <div className="general-header">
                <span className="leaderboard-rank">Rank</span>
                <span className="leaderboard-participant">Participant Name</span>
                <span className="leaderboard-points">Points</span>
            </div>
            {leaderboardData.map((item, index) => (
                <div className="general-item" key={index}>
                    <span className="leaderboard-rank">{item.rank}</span>
                    <span className="leaderboard-participant">{item.participantName}</span>
                    <span className="leaderboard-points">{item.points}</span>
                </div>
            ))}
        </div>
    );
}
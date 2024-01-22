import {ReactElement, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./league-page.css";
import {getLeague} from "../../api/users.ts";
import League from "../../api/models/league.ts";

type LeaguePageParameters = {
    id: string;
}

export default function LeaguePage(): ReactElement {
    const parameters = useParams<LeaguePageParameters>();
    const [league, setLeague] = useState<League | null>(null);

    useEffect(() => {
        const fetchLeague = async () => {
            const league = await getLeague(parseInt(parameters.id as string));
            return setLeague(league);
        }

        fetchLeague();
    }, [parameters.id]);

    if (league == null) {
        return <div>
            Loading...
        </div>
    }

    return (
        <div className="league-page">
            <div className="league-page-background">
            </div>

            <div className="league-page-content">
                <div className="league-page-name">
                    {league.name}
                </div>
                <div className="league-page-description">
                    {league.description}
                </div>

                <div className="league-page-details">
                    <div className="league-detail">
                        <span className="league-detail-key">leagues in league: </span>
                        <span className="league-detail-value">{"lista wyścigów per liga"}</span>
                    </div>
                    <div className="league-detail">
                        <span className="league-detail-key">Attendees:</span>
                        <span className="league-detail-value">{"123"} {/* Mocked attendees count */}</span>
                    </div>
                    <div className="league-detail">
                        <span className="league-detail-key">Attendess list: </span>
                        <span className="league-detail-value">{"lista uczestników"}</span>
                    </div>
                </div>

            </div>
        </div>
)
}
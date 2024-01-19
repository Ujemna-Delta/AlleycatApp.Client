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
            </div>
        </div>
    )
}
import {ReactElement} from "react";
import League from "../../../api/models/league.ts";
import LeagueListElement from "../leagues-list-emement";
import "./leagues-list.css"

interface LeaguesListProps {
    leagues: League[]
}

export default function LeaguesList({ leagues }: LeaguesListProps): ReactElement {
    return (
        <div className="races-list">
            {leagues.map(league => <LeagueListElement league={league}/>)}
        </div>
    )
}
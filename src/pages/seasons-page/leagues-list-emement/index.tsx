import {ReactElement} from "react";
import League from "../../../api/models/league.ts";
import "./league-list-element.css"
import FeatherIcon from "../../../components/feather-icon";
import {NavLink} from "react-router-dom";
import {PrimaryButton} from "@fluentui/react";

interface LeagueListElementProps {
    league: League
}

export default function LeagueListElement({league}: LeagueListElementProps): ReactElement {

    return (
        <div className="league-list-element">
            <div className="league-list-element-group league-list-element-summary">
                <div className="league-list-element-id">#{league.id}</div>
                <div className="league-list-element-name">{league.name}</div>
                <div className="league-list-element-participants">
                    <FeatherIcon icon="users"/>
                    {league.id + 23}
                </div>
            </div>
            <div className="league-list-element-group">
                <NavLink to={`../season/${league.id}`}>
                    <PrimaryButton text="Details"/>
                </NavLink>
            </div>
        </div>
    );
}
import {ReactElement, useEffect, useState} from "react";
import {PrimaryButton} from "@fluentui/react";
import {NavLink} from "react-router-dom";
import League from "../../api/models/league.ts";
import {getLeagues} from "../../api/users.ts";
import LeaguesList from "./leagues-list";
import "./seasons-page.css"

export default function SeasonsPage(): ReactElement {
    const [leagues, setLeagues] = useState<League[]>([]);


    const updateleagues = async () => {
        const leagues = await getLeagues();
        return setLeagues(leagues);
    }

    useEffect(() => {
        updateleagues();
    }, []);

    return (
        <div className="leagues-page">
            <div className="leagues-page-controls">
                <NavLink to="./new">
                    <PrimaryButton text="New"/>
                </NavLink>
            </div>
            <LeaguesList leagues={leagues}/>
        </div>
    );
}
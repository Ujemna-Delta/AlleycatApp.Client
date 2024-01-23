import {ReactElement, useEffect, useState} from "react";
import {PrimaryButton} from "@fluentui/react";
import {NavLink} from "react-router-dom";
import League from "../../api/models/league.ts";
import {getLeagues} from "../../api/users.ts";
import LeaguesList from "./leagues-list";
import "./seasons-page.css"
import LoadingIcon from "../../components/loading-icon";

export default function SeasonsPage(): ReactElement {
    const [leagues, setLeagues] = useState<League[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const updateleagues = async () => {
        const leagues = await getLeagues();
        return setLeagues(leagues);
    }

    useEffect(() => {
        setIsLoading(true);
        updateleagues().then(() => {
            setIsLoading(false);
        })
    }, []);

    return (
        <div className="leagues-page">
            <div className="leagues-page-controls">
                <NavLink to="./new">
                    <PrimaryButton text="New"/>
                </NavLink>
            </div>

            {isLoading ? (
                <div className="page-load">
                    <LoadingIcon color="black"/>
                </div>
            ) : (
                <LeaguesList leagues={leagues}/>
            )}
        </div>
    );
}
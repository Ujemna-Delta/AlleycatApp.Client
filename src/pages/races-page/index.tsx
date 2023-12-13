import {ReactElement, useEffect, useState} from "react";
import Race from "../../api/models/race.ts";
import {PrimaryButton} from "@fluentui/react";
import RacesList from "./components/races-list";
import "./races-page.css";
import {NavLink} from "react-router-dom";
import {getRaces} from "../../api/races.ts";

export default function RacesPage(): ReactElement {
    const [races, setRaces] = useState<Race[]>([]);
    const [refreshBit, setRefreshBit] = useState<boolean>(false);

    const updateRaces = async () => {
        const races = await getRaces();
        return setRaces(races);
    }

    const handleRefresh = () => {
        setRefreshBit(!refreshBit);
    }

    useEffect(() => {
        updateRaces();
    }, [refreshBit]);

    return (
        <div className="races-page">
            <div className="races-page-controls">
                <NavLink to="./new">
                    <PrimaryButton text="New"/>
                </NavLink>
                <PrimaryButton text="Refresh" onClick={handleRefresh}/>
            </div>
            <RacesList races={races}/>
        </div>
    );
}
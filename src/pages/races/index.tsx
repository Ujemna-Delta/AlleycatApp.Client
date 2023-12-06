import {ReactElement, useEffect, useState} from "react";
import Race from "../../models/race.ts";
import RaceListElement from "./components/race-list-element";
import {PrimaryButton} from "@fluentui/react";

export default function Races(): ReactElement {
    const url = "https://alleycatapp-persistence.azurewebsites.net/api/races";
    const [results, setResults] = useState<Race[]>([]);
    const [refreshBit, setRefreshBit] = useState<boolean>(false);
    const [refreshData, setRefreshData] = useState<Date>(new Date());

    const fetchInfo = async () => {
        const response = await fetch(url);
        const data = await response.json();
        setRefreshData(new Date());
        return setResults(data);
    }

    const refresh = () => {
        setRefreshBit(!refreshBit);
    }

    useEffect(() => {
        fetchInfo();
    }, [refreshBit]);

    return (
        <div className="races-page">
            {refreshData.toString()}
            <PrimaryButton text="Refresh" onClick={refresh}/>
            {results.map((race) => <RaceListElement race={race}/>)}
        </div>
    );
}
import {ReactElement, useEffect, useState} from "react";
import Race from "../../api/models/race.ts";
import getRaces from "../../api/races.ts";
import {PrimaryButton} from "@fluentui/react";

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
            <PrimaryButton text="Refresh" onClick={handleRefresh}/>
            {races.map(race=>
                <div>{race.id}</div>
            )}
        </div>
    );
}
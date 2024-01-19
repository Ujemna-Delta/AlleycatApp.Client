import {ReactElement, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Race from "../../api/models/race.ts";
import {getRace} from "../../api/races.ts";
import "./race-page.css";

type RacePageParameters = {
    id: string;
}

export default function RacePage(): ReactElement {
    const parameters = useParams<RacePageParameters>();
    const [race, setRace] = useState<Race | null>(null);


    useEffect(() => {
        const fetchRace = async () => {
            const race = await getRace(parseInt(parameters.id as string));
            return setRace(race);
        }

        fetchRace();
    }, [parameters.id]);

    if (race == null) {
        return <div>
            Loading...
        </div>
    }

    return (
        <div className="race-page">
            <div className="race-page-background">
            </div>

            <div className="race-page-content">
                <div className="race-page-name">
                    {race.name}
                </div>
                <div className="race-page-description">
                    {race.description}
                </div>
            </div>
        </div>
    )
}
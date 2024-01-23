import {ReactElement} from "react";
import Race from "../../../../api/models/race.ts";
import RacesListElement from "../races-list-element";
import "./races-list.css";

interface RacesListProps {
    races: Race[]
}

export default function RacesList({ races }: RacesListProps): ReactElement {
    return (
        <div className="races-list">
            {races.map(race => <RacesListElement key={race.id} race={race}/>)}
        </div>
    )
}
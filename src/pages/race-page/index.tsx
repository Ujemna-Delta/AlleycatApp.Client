import {ReactElement, useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import Race from "../../api/models/race.ts";
import {getRace} from "../../api/races.ts";
import "./race-page.css";
import {ERole} from "../../components/protected-view/role.ts";
import ProtectedView from "../../components/protected-view";

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
                <div className="race-page-details">
                    <div className="race-detail">
                        <span className="race-detail-key">Begin Time: </span>
                        <span className="race-detail-value">{race.beginTime.toString().replace(/\s\(.*?\)/, '')}</span>
                    </div>
                    <div className="race-detail">
                        <span className="race-detail-key">Start Address: </span>
                        <span className="race-detail-value">{race.startAddress}</span>
                    </div>
                    <div className="race-detail">
                        <span className="race-detail-key">Attendees:</span>
                        <span className="race-detail-value">{race.attendeesCount}</span>
                    </div>
                    <div className="race-detail">
                        <span className="race-detail-key">Value Modifier: </span>
                        <span className="race-detail-value">{race.valueModifier}</span>
                    </div>
                    <div className="race-detail">
                        <span className="race-detail-key">Is Active: </span>
                        <span className="race-detail-value">{race.isActive ? "Yes" : "No"}</span>
                    </div>
                    <div className="race-detail">
                        <span className="race-detail-key">Free Order: </span>
                        <span className="race-detail-value">{race.isFreeOrder ? "Yes" : "No"}</span>
                    </div>
                    <div className="race-detail">
                        <span className="race-detail-key">League: </span>
                        <NavLink to={`../season/${race.leagueId}`}>
                            <span className="race-detail-value">{race.leagueName ? race.leagueName : "N/A"}</span>
                        </NavLink>
                    </div>
                </div>
                <ProtectedView role={ERole.Manager}>
                    <h2 className="attendees-title">Attendees Data</h2>
                    <div className="race-page-attendees">
                        <table className="attendees-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Last Name</th>
                                <th>Nick Name</th>
                                <th>User Name</th>
                                <th>Marks</th>
                            </tr>
                            </thead>
                            <tbody>
                            {race.attendees && race.attendees.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.nickname}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.marks}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </ProtectedView>
            </div>
        </div>
    )
}




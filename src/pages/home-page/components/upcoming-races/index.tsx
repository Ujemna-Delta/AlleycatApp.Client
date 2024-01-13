import  { ReactElement, useEffect, useState } from "react";
import Race from "../../../../api/models/race.ts";
import { getUpcomingRaces } from "../../../../api/races.ts";
import './upcoming-races.css';  //

// Rename the component
export default function UpcomingRaces(): ReactElement {
    const [upcomingRaces, setUpcomingRaces] = useState<Race[]>([]);
    const [expandedRaceId, setExpandedRaceId] = useState<number | null>(null);

    useEffect(() => {
        const fetchUpcomingRaces = async () => {
            try {
                const upcomingRaces = await getUpcomingRaces();
                setUpcomingRaces(upcomingRaces);
            } catch (error) {
                console.error("Failed to fetch upcoming races:", error);
            }
        };

        fetchUpcomingRaces();
    }, []);

    const toggleDescription = (id: number) => {
        setExpandedRaceId(expandedRaceId === id ? null : id);
    };

    return (
            <div className="upcoming-races">
                <h2>Upcoming Races</h2>
                <div className="race-preview-header">
                    <span className="race-name">Race Name</span>
                    <span className="race-date">Date</span>
                    <span className="race-address">Address</span>
                    <span className="race-description">Description</span>
                </div>
                {upcomingRaces.map(race => (
                    <div
                        className={`race-preview ${expandedRaceId === race.id ? 'expanded' : ''}`}
                        key={race.id}
                        onClick={() => toggleDescription(race.id)}
                    >
                        <span className="race-name">{race.name}</span>
                        <span className="race-date">{race.beginTime.toLocaleDateString()}</span>
                        <span className="race-address">{race.startAddress}</span>
                        <span className="race-description">{race.description}</span>
                    </div>
                ))}
            </div>
    );
}
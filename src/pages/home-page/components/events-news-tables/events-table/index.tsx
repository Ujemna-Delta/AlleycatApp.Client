import { ReactElement, useState } from "react";
import { upcomingEventsData } from '../../../../../../public/mockData.ts';
import '../events-news-table.css';

export default function EventsTable(): ReactElement {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleDescription = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="info-table">
            {upcomingEventsData.map((item, index) => (
                <div
                    className={`info-item ${expandedIndex === index ? 'expanded' : ''}`}
                    key={index}
                    onClick={() => toggleDescription(index)}
                >
                    <img src={item.imageUrl} alt={item.name} className="info-image" />
                    <div className="info-content">
                        <div className="info-title-date">
                            <h3 className="info-title">{item.name}</h3>
                            <p className="info-date">{item.date}</p>
                        </div>
                        <p className="info-description-text">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
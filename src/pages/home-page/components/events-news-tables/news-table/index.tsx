import { ReactElement, useEffect, useState } from "react";
import { newsData } from '../../../../../../public/mockData.ts';
import '../events-news-table.css';

export default function NewsTable(): ReactElement {
    const [timeElapsed, setTimeElapsed] = useState<string[]>([]);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    // Calculate the time elapsed for each news item
    useEffect(() => {
        const calculateTimeElapsed = () => {
            const currentTime = new Date().getTime(); // Get current time in milliseconds
            const elapsedTimes = newsData.map((item) => {
                const postedTime = new Date(item.date).getTime(); // Get posted time in milliseconds
                const timeDifference = currentTime - postedTime;
                if (timeDifference < 60 * 60 * 1000) { // Less than 1 hour
                    return "now";
                }
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                if (days > 0) {
                    return `${days}d, ${hours}h`;
                } else {
                    return `${hours}h`;
                }
            });
            setTimeElapsed(elapsedTimes);
        };

        calculateTimeElapsed();
    }, []);

    const toggleDescription = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="info-table">
            {newsData.map((item, index) => (
                <div
                    className={`info-item ${expandedIndex === index ? 'expanded' : ''}`}
                    key={index}
                    onClick={() => toggleDescription(index)}
                >
                    <img src={item.imageUrl} alt={item.title} className="info-image" />
                    <div className="info-content">
                            <span className="info-time">{timeElapsed[index]}</span>
                        <p className="info-description-text">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

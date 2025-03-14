import React from 'react';
import './CalorieProgressTracker.css';

const CalorieProgressTracker = ({ caloriesBurned, calorieGoal }) => {
    // Calculate percentage completed (capped at 100%)
    const percentage = Math.min(Math.round((caloriesBurned / calorieGoal) * 100), 100);

    // Calculate the stroke dash offset for the circle
    // The formula is: circumference - (percentage / 100 * circumference)
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100 * circumference);

    // Determine color based on percentage
    const getColor = () => {
        if (percentage < 30) return "#FF6B6B"; // Red-ish
        if (percentage < 70) return "#FFD166"; // Yellow-ish
        return "#06D6A0"; // Green-ish
    };

    return (
        <div className="circular-progress-container">
            <div className="circular-progress">
                <svg className="progress-ring" width="170" height="170" viewBox="0 0 170 170">
                    {/* Background circle */}
                    <circle
                        className="progress-ring-circle-bg"
                        cx="85"
                        cy="85"
                        r={radius}
                        strokeWidth="12"
                    />
                    {/* Progress circle */}
                    <circle
                        className="progress-ring-circle"
                        cx="85"
                        cy="85"
                        r={radius}
                        strokeWidth="12"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        stroke={getColor()}
                    />
                    {/* Display percentage in the middle */}
                    <text
                        x="85"
                        y="85"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="percentage-text"
                        transform="rotate(90,85,85)"
                    >
                        {percentage}%
                    </text>
                </svg>
            </div>

            <div className="progress-info">
                <h4>Today's Progress</h4>
                <p className="calorie-text">{caloriesBurned} / {calorieGoal}</p>
                <p className="calorie-label">Calories Burned</p>
            </div>
        </div>
    );
};

export default CalorieProgressTracker;

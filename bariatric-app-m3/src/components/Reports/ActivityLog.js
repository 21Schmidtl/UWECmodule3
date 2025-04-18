import React, { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import './ActivityLog.css'; // Assuming you will create this CSS file

const ActivityLog = ({ exerciseLog, timeFilter }) => {
    const [selectedMetric, setSelectedMetric] = useState("duration"); // Keep lowercase for logic

    // Helper function to filter logs based on the selected date range
    const filterLogByTime = (log, timeFilter) => {
        if (!timeFilter?.startDate || !timeFilter?.endDate) return log;

        const start = new Date(timeFilter.startDate);
        const end = new Date(timeFilter.endDate);
        end.setHours(23, 59, 59, 999); // include end of day

        return log.filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate >= start && entryDate <= end;
        });
    };

    const filteredLog = useMemo(() => filterLogByTime(exerciseLog, timeFilter), [exerciseLog, timeFilter]);

    // Summarize the exercises by name (aggregated by duration or calories)
    const summaryMap = filteredLog.reduce((acc, log) => {
        if (!acc.has(log.name)) {
            acc.set(log.name, { duration: 0, calories: 0 });
        }
        const current = acc.get(log.name);
        acc.set(log.name, {
            duration: current.duration + log.duration,
            calories: current.calories + log.calories,
        });
        return acc;
    }, new Map());

    const dataForChart = [...summaryMap.entries()].map(([name, stats]) => ({
        name,
        value: stats[selectedMetric], // Direct mapping
    }));

    return (
        <div className="activity-log">
            <h4>Top Exercises This Period</h4>

            {/* Metric Buttons */}
            <div className="metric-buttons">
                <button
                    onClick={() => setSelectedMetric("duration")}
                    className={`metric-btn ${selectedMetric === "duration" ? "active" : ""}`}
                >
                    Duration
                </button>
                <button
                    onClick={() => setSelectedMetric("calories")}
                    className={`metric-btn ${selectedMetric === "calories" ? "active" : ""}`}
                >
                    Calories Burned
                </button>
            </div>

            {/* Bar Chart */}
            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dataForChart} margin={{ bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            label={{
                                value: "Exercises",
                                position: "insideBottom",
                                offset: -8,
                                style: { fontSize: 14, fontWeight: "bold", textAnchor: "middle" }
                            }}
                        />
                        <YAxis label={{
                            value: selectedMetric === "duration" ? "Duration (min)" : "Calories (kcal)",
                            position: "insideLeft",
                            angle: -90,
                            style: { textAnchor: "middle", fontSize: 14, fontWeight: "bold" }
                        }} />
                        <Tooltip formatter={(value) => [`${value}`, selectedMetric === "duration" ? "Duration" : "Calories"]} />
                        {/*<Legend />*/}
                        <Bar
                            dataKey="value"
                            fill="rgba(75, 192, 192, 0.6)"
                            stroke="rgba(75, 192, 192, 1)"
                            barSize={30}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* No Activity Message */}
            {filteredLog.length === 0 ? (
                <p>No activity logged yet.</p>
            ) : (
                <ul className="log-list">
                    {filteredLog
                        .slice()
                        .sort((a,b) => b[selectedMetric]- a[selectedMetric])
                        .map((log, index) => (
                        <li key={index} className="log-item">
                            <span className="exercise-name">{log.name}</span>
                            <span className="log-detail">Total Time: {log.duration} min</span>
                            <span className="log-detail">Calories: {log.calories}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ActivityLog;

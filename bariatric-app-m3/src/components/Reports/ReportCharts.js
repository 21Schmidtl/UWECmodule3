import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './ReportCharts.css';

const ReportCharts = ({ exerciseLog, timeFilter }) => {
    // Aggregate data based on the selected filter (daily, weekly, monthly)
    console.log("exerciseLog in ReportCharts:", exerciseLog); // Debugging log

    const processData = () => {
        if (!exerciseLog || !Array.isArray(exerciseLog)) {
            return [];
        }

        if (!timeFilter?.startDate || !timeFilter?.endDate) {
            return exerciseLog; // fallback
        }

        const start = new Date(timeFilter.startDate).setHours(0, 0, 0, 0);
        const end = new Date(timeFilter.endDate).setHours(0, 0, 0, 0);

        const filteredData = exerciseLog.filter(log => {
            const logDate = new Date(log.date).setHours(0, 0, 0, 0);
            return logDate >= start && logDate <= end;
        });

        return filteredData.map(log => ({
            date: new Date(log.date).toLocaleDateString(),
            calories: log.calories,
            duration: log.duration
        }));
    };

    const data = processData();
    console.log("data: ", data);

    return (
        <div className="report-charts">
            <h2>Report Charts</h2>
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Line yAxisId="left" type="monotone" dataKey="calories" stroke="#8884d8" />
                        <Line yAxisId="right" type="monotone" dataKey="duration" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                <p>No data available to display</p>
            )}
        </div>
    );
};

export default ReportCharts;

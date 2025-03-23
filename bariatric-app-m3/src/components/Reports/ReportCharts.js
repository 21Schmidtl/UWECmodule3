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

    const now = new Date();
    let filteredData = exerciseLog;

    if (timeFilter === "weekly") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        filteredData = exerciseLog.filter(log => new Date(log.date) >= oneWeekAgo);
    } else if (timeFilter === "monthly") {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        filteredData = exerciseLog.filter(log => new Date(log.date) >= oneMonthAgo);
    } else if (timeFilter === "daily") {
        const today = now.toLocaleDateString();
        filteredData = exerciseLog.filter(log => new Date(log.date).toLocaleDateString() === today);
    }

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

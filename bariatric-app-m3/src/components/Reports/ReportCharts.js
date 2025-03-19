import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ReportCharts = ({ exerciseLog, timeFilter }) => {
    // Aggregate data based on the selected filter (daily, weekly, monthly)
    const processData = () => {
        if (!exerciseLog || !Array.isArray(exerciseLog)) {
        return []; // return an empty array if exerciseLog is null or not an array
    }
        // Example: Simple aggregation (you can enhance this)
        return exerciseLog.map(log => ({
            date: log.date.toLocaleDateString(),
            calories: log.calories,
            duration: log.duration
        }));
    };

    const data = processData();

    return (
        <div className="charts-container">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="calories" stroke="#8884d8" />
                    <Line type="monotone" dataKey="duration" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ReportCharts;

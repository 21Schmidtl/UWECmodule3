import React, { useState, useEffect } from "react";
import ReportFilters from "../components/Reports/ReportFilters";
import ReportCharts from "../components/Reports/ReportCharts";
import ActivityLog from "../components/Reports/ActivityLog";

const ReportsTab = () => {
    const [timeFilter, setTimeFilter] = useState({ startDate: "", endDate: "" });
    const [filteredExercises, setFilteredExercises] = useState([]);
    const userId = "user1"

    // Fetch exercises when timeFilter updates
    useEffect(() => {
        if (timeFilter.startDate && timeFilter.endDate) {
            fetchExercises(userId, timeFilter.startDate, timeFilter.endDate)
                .then(() => console.log("Fetch completed"))  // ✅ Handles Promise properly
                .catch(error => console.error("Fetch error:", error));  // ✅ Error handling
        }
    }, [timeFilter]);

    const fetchExercises = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/get-exercises-by-user?user_id=${userId}&start_date=${timeFilter.startDate}&end_date=${timeFilter.endDate}`);
            console.log("API Response:", response);
            const data = await response.json();
            console.log("Fetched Data:", data);
            setFilteredExercises(data.exercises || []); // Prevent undefined errors
        } catch (error) {
            console.error("Error fetching exercises:", error);
        }
    };

    return (
        <div className="tab-content">
            <h3>Activity Reports</h3>

            {/* Report Filters */}
            <ReportFilters timeFilter={timeFilter} setTimeFilter={setTimeFilter} />

            {/* Charts Display */}
            <ReportCharts exerciseLog={filteredExercises} timeFilter={timeFilter} />

            {/* Activity Log */}
            <ActivityLog exerciseLog={filteredExercises} timeFilter={timeFilter}/>
        </div>
    );
};

export default ReportsTab;

import React, { useState } from "react";
import ReportFilters from "../components/Reports/ReportFilters";
import ReportCharts from "../components/Reports/ReportCharts";
import ActivityLog from "../components/Reports/ActivityLog";

const ReportsTab = ({ exerciseLog = [] }) => {
    const [timeFilter, setTimeFilter] = useState("daily");

    console.log("exerciseLog in ReportsTab:", exerciseLog); // Debugging log

    return (
        <div className="tab-content">
            <h3>Activity Reports</h3>

            {/* Report Filters */}
            <ReportFilters timeFilter={timeFilter} setTimeFilter={setTimeFilter} />

            {/* Charts Display */}
            <ReportCharts exerciseLog={exerciseLog} timeFilter={timeFilter} />

            {/* Activity Log */}
            <ActivityLog exerciseLog={exerciseLog} />
        </div>
    );
};

export default ReportsTab;

import React, { useEffect, useState } from "react";

const ReportFilters = ({ timeFilter, setTimeFilter }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

    // Set default range to past 7 days on mount
    useEffect(() => {
        const today = new Date();
        const pastWeek = new Date();
        pastWeek.setDate(today.getDate() - 7);

        const format = (date) => date.toISOString().split("T")[0];

        setStartDate(format(pastWeek));
        setEndDate(format(today));
        setMaxDate(format(today));
        setTimeFilter({ startDate: format(pastWeek), endDate: format(today) });
    }, []);

    const handleStartChange = (e) => {
        const newStart = e.target.value;
        setStartDate(newStart);
        setTimeFilter({ startDate: newStart, endDate });
    };

    const handleEndChange = (e) => {
        const newEnd = e.target.value;
        setEndDate(newEnd);
        setTimeFilter({ startDate, endDate: newEnd });
    };

    //Maybe do this instead of handleXChange if we don't want the chart to change when hovering over dates
    const applyFilters = () => {
        if (startDate && endDate) {
            setTimeFilter({ startDate, endDate });
        }
    };

    return (
        <div className="report-filters">
            <h4>Report Filters</h4>
            <div>
                <label>Start Date:</label>
                <input className="ms-1" type="date" value={startDate} onChange={handleStartChange} max={maxDate}/>
            </div>
            <div>
                <label>End Date:</label>
                {/*<div className="mr-2">*/}
                    <input className="ms-1" type="date" value={endDate} onChange={handleEndChange} max={maxDate}/>
                {/*</div>*/}
            </div>
        </div>
    );
};

export default ReportFilters;

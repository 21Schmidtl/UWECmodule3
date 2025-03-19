const ReportFilters = ({ timeFilter, setTimeFilter }) => {
    return (
        <div className="report-filters">
            {["daily", "weekly", "monthly"].map((filter) => (
                <button
                    key={filter}
                    className={timeFilter === filter ? "active" : ""}
                    onClick={() => setTimeFilter(filter)}
                >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
            ))}
        </div>
    );
};

export default ReportFilters;

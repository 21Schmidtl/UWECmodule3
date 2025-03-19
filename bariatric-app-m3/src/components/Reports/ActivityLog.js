const ActivityLog = ({ exerciseLog }) => {
    return (
        <div className="activity-log">
            <h4>Recent Activity</h4>
            <ul className="log-list">
                {exerciseLog.length === 0 ? (
                    <p>No activity logged yet.</p>
                ) : (
                    exerciseLog.map((log) => (
                        <li key={log.id} className="log-item">
                            <span>{log.name}</span>
                            <span>{log.duration} min</span>
                            <span>{log.calories} cal</span>
                            <span>{log.date.toLocaleDateString()}</span>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default ActivityLog;

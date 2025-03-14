import React, {useState} from 'react';
import './ExerciseTracker.css'; // You'll need to create this CSS file
import CalorieProgressTracker from '../components/CalorieProgressTracker';
import LogExerciseModal from '../components/LogExerciseModal'

const ExerciseTracker = () => {
    // State management for the component
    const [activeTab, setActiveTab] = useState('logExercise');
    const [exerciseLog, setExerciseLog] = useState([]);
    const [caloriesBurned, setCaloriesBurned] = useState(0);
    const [calorieGoal, setCalorieGoal] = useState(300); // Default goal



    // Handler for exercise log submission
    const handleExerciseSubmit = (exercise, duration) => {
        const calories = exercise.caloriesPerMinute * duration;
        const newLog = {
            id: Date.now(),
            name: exercise.name,
            duration,
            calories,
            date: new Date()
        };

        setExerciseLog([...exerciseLog, newLog]);
        setCaloriesBurned(caloriesBurned + calories);
    };

    // Components for different tabs

    const LogExerciseTab = () => {
        const [showModal, setShowModal] = useState(false);

        return (
            <div className="tab-content">
                <h3>Log Exercise</h3>
                <div className="exercise-form">
                    <button className="primary-button" onClick={() => setShowModal(true)}>Log Exercise</button>
                </div>

                <CalorieProgressTracker caloriesBurned={150} calorieGoal={calorieGoal}/>

                <LogExerciseModal
                    show={showModal} handleClose={() => setShowModal(false)}
                    handleExerciseSubmit={handleExerciseSubmit}
                />
            </div>
        );
    };


    const GuidedRoutinesTab = () => (
        <div className="tab-content">
            <h3>Guided Routines</h3>
            <div className="routine-filters">
                <select>
                    <option>All Phases</option>
                    <option>Early Post-Op (1-4 weeks)</option>
                    <option>Recovery (1-3 months)</option>
                    <option>Active (3+ months)</option>
                </select>
                <select>
                    <option>All Difficulty Levels</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                </select>
            </div>
            <div className="routine-list">
                <p>List of recommended exercises based on post-op phase will appear here</p>
            </div>
        </div>
    );

    const GoalsTab = () => (
        <div className="tab-content">
            <h3>Activity Goals</h3>
            <div className="goals-container">
                <div className="goal-setting">
                    <h4>Set New Goal</h4>
                    <p>Form for setting calorie, steps, or exercise duration goals</p>
                </div>
                <div className="current-goals">
                    <h4>Current Goals</h4>
                    <p>Display of active goals and progress</p>
                </div>
            </div>
            <div className="achievements">
                <h4>Your Achievements</h4>
                <div className="badges-container">
                    <p>Badges and streaks will appear here</p>
                </div>
            </div>
        </div>
    );

    const ReportsTab = () => (
            <div className="tab-content">
                <h3>Activity Reports</h3>
                <div className="report-filters">
                    <button>Daily</button>
                    <button>Weekly</button>
                    <button>Monthly</button>
                </div>
                <div className="charts-container">
                    <p>Charts showing exercise progress, calorie trends, etc.</p>
                </div>
                <div className="activity-log">
                    <h4>Recent Activity</h4>
                    <ul className="log-list">
                        {exerciseLog.map(log => (
                            <li key={log.id} className="log-item">
                                <span>{log.name}</span>
                                <span>{log.duration} min</span>
                                <span>{log.calories} cal</span>
                                <span>{log.date.toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    ;

    return (
        <div className="exercise-tracker-container">
            <h2>Exercise Tracker</h2>

            {/* Navigation Tabs */}
            <div className="tabs">
                <button
                    className={activeTab === 'logExercise' ? 'active' : ''}
                    onClick={() => setActiveTab('logExercise')}
                >
                    Log Exercise
                </button>
                <button
                    className={activeTab === 'guidedRoutines' ? 'active' : ''}
                    onClick={() => setActiveTab('guidedRoutines')}
                >
                    Guided Routines
                </button>
                <button
                    className={activeTab === 'goals' ? 'active' : ''}
                    onClick={() => setActiveTab('goals')}
                >
                    Goals
                </button>
                <button
                    className={activeTab === 'reports' ? 'active' : ''}
                    onClick={() => setActiveTab('reports')}
                >
                    Reports
                </button>
            </div>

            {/* Tab Content */}
            <div className="tab-container">
                {activeTab === 'logExercise' && <LogExerciseTab/>}
                {activeTab === 'guidedRoutines' && <GuidedRoutinesTab/>}
                {activeTab === 'goals' && <GoalsTab/>}
                {activeTab === 'reports' && <ReportsTab/>}
            </div>
        </div>
    );
};

export default ExerciseTracker;
import React, {useState, useEffect} from 'react';
import './ExerciseTracker.css';
import CalorieProgressTracker from '../components/CalorieProgressTracker';
import LogExerciseModal from '../components/LogExerciseModal'
import GuidedRoutines from "../components/GuidedRoutines";
import ReportsTab from "../components/ReportsTab";

const ExerciseTracker = () => {
    // State management for the component
    const [activeTab, setActiveTab] = useState('logExercise');
    const [exerciseLog, setExerciseLog] = useState([]);
    const [caloriesBurned, setCaloriesBurned] = useState(0);
    const [calorieGoal, setCalorieGoal] = useState(300); // Default goal
    const [exerciseList, setExerciseList] = useState([]); // State for exercises




    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/exercises")  // Replace with actual path or API endpoint
            .then(response => response.json())
            .then(data => {
                setExerciseList(data)
            })
            .catch(error => console.error("Error fetching exercises:", error));
    }, []);



    // Handler for exercise log submission
    const handleExerciseSubmit = async (exercise, duration) => {
        // if (!exercise || !exercise.caloriesPerMinute) {
        if(!exercise){
        console.error("Invalid exercise data:", exercise);
        return;
    }
        // const calories = exercise.caloriesPerMinute * duration;
        const calories = 0;
        const newLog = {
            exercise: exercise.name,
            duration,
            calories,
        };

        try{
            const user_id = 'user1'
            // const response = await fetch(`http://127.0.0.1:5000//add-exercise-log?user_id=${user_id}&exercise=${exercise.Title}&duration=${duration}`);
            const response = await fetch(`http://127.0.0.1:5000//add-exercise-log?{newLog}`)
        }catch{

        }


        console.log('handleExerciseSubmit: newLog', newLog);

        setExerciseLog([...exerciseLog, newLog]);
        // setCaloriesBurned(caloriesBurned + calories);
    };

    // Components for different tabs

    const LogExerciseTab = ({exerciseList}) => {
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
                    exerciseList={exerciseList}
                />
            </div>
        );
    };


    const GuidedRoutinesTab = () => (
        <div className="tab-content">
            <h3>Guided Routines</h3>
            <GuidedRoutines></GuidedRoutines>
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
                {/*<button*/}
                {/*    className={activeTab === 'goals' ? 'active' : ''}*/}
                {/*    onClick={() => setActiveTab('goals')}*/}
                {/*>*/}
                {/*    Goals*/}
                {/*</button>*/}
                <button
                    className={activeTab === 'reports' ? 'active' : ''}
                    onClick={() => setActiveTab('reports')}
                >
                    Reports
                </button>
            </div>

            {/* Tab Content */}
            <div className="tab-container">
                {activeTab === 'logExercise' && <LogExerciseTab exerciseList={exerciseList}/>}
                {activeTab === 'guidedRoutines' && <GuidedRoutinesTab/>}
                {activeTab === 'goals' && <GoalsTab/>}
                {activeTab === 'reports' && <ReportsTab/>}
            </div>
        </div>
    );
};

export default ExerciseTracker;
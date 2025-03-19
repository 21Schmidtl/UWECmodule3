import React, { useState } from 'react';
import './GuidedRoutines.css';
import { FaDumbbell, FaRunning, FaHeartbeat } from 'react-icons/fa';


const exercises = [
    { name: 'Seated Knee Extensions', phase: 'Early Post-Op (1-4 weeks)', types: ['Recovery'], image: 'seated_knee_extensions.jpg' },
    { name: 'Ankle Pumps', phase: 'Early Post-Op (1-4 weeks)', types: ['Recovery'], image: 'ankle_pumps.jpg' },
    { name: 'Standing Hamstring Curls', phase: 'Recovery (1-3 months)', types: ['Strength'], image: 'standing_hamstring_curls.jpg' },
    { name: 'Leg Press', phase: 'Recovery (1-3 months)', types: ['Strength'], image: 'leg_press.jpg' },
    { name: 'Lunges', phase: 'Active (3+ months)', types: ['Cardio'], image: 'lunges.jpg' },
    { name: 'Squats', phase: 'Active (3+ months)', types: ['Strength'], image: 'squats.jpg' }
];

const GuidedRoutines = () => {
    const [selectedPhase, setSelectedPhase] = useState('All Phases');
    const [selectedType, setSelectedType] = useState('All Types');
    const [selectedExercise, setSelectedExercise] = useState(null);

    const typeIcons = {
        Strength: <FaDumbbell />,
        Cardio: <FaRunning />,
        Recovery: <FaHeartbeat />
    };

    const handlePhaseChange = (event) => {
        setSelectedPhase(event.target.value);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleExerciseClick = (exercise) => {
        setSelectedExercise(exercise);
    }

    const filteredExercises = exercises.filter(exercise =>
        (selectedPhase === 'All Phases' || exercise.phase === selectedPhase) &&
        (selectedType === 'All Types' || exercise.types.includes(selectedType))
    );

    return (
        <div className="tab-content">
            {/*<h3>Guided Routines</h3>*/}
            <div className="routine-filters">
                <select value={selectedPhase} onChange={handlePhaseChange}>
                    <option>All Phases</option>
                    <option>Early Post-Op (1-4 weeks)</option>
                    <option>Recovery (1-3 months)</option>
                    <option>Active (3+ months)</option>
                </select>
                <select value={selectedType} onChange={handleTypeChange}>
                    <option>All Types</option>
                    <option>Cardio</option>
                    <option>Strength</option>
                    <option>Recovery</option>
                </select>
            </div>
            <div className="routine-list">
                {filteredExercises.length > 0 ? (
                    <div className="exercise-cards d-flex">
                        {filteredExercises.map((exercise, index) => (
                            <div
                                key={index}
                                className="exercise-card"
                                onClick={() => handleExerciseClick(exercise)}
                            >
                                <div className="exercise-info">
                                    <h4>{exercise.name}</h4>
                                    <img src={exercise.image} alt={exercise.name} className="exercise-image" />
                                    <p>{exercise.phase}</p>
                                    <div className="exercise-types">
                                        {exercise.types.map((type, i) => (
                                            <span key={i} className={`exercise-type ${type.toLowerCase()}`}>{typeIcons[type]} {type}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No exercises match the selected filters.</p>
                )}
            </div>
        </div>
    );
};

export default GuidedRoutines;

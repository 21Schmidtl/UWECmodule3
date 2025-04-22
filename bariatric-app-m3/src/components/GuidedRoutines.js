import React, { useState, useEffect } from 'react';
import './GuidedRoutines.css';
import { FaDumbbell, FaRunning, FaHeartbeat } from 'react-icons/fa';

const GuidedRoutines = () => {
    const [selectedPhase, setSelectedPhase] = useState('All Phases');
    const [selectedType, setSelectedType] = useState('All Types');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [exercises, setExercises] = useState([]);

    const typeIcons = {
        Strength: <FaDumbbell />,
        Cardio: <FaRunning />,
        Recovery: <FaHeartbeat />
    };

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/exercises")
            .then(response => response.json())
            .then(data => setExercises(data))
            .catch(error => console.error("Error fetching exercises:", error));
    }, []);

    const handlePhaseChange = (event) => {
        setSelectedPhase(event.target.value);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleExerciseClick = (exercise) => {
        setSelectedExercise(exercise);
    };

    const filteredExercises = exercises.filter(exercise =>
        (selectedPhase === 'All Phases' || exercise.Level === selectedPhase) &&
        (selectedType === 'All Types' || exercise.Type === selectedType) &&
        (exercise.Title.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="tab-content">
            <div className="routine-filters">
                <select value={selectedPhase} onChange={handlePhaseChange}>
                    <option>All Phases</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                </select>
                <select value={selectedType} onChange={handleTypeChange}>
                    <option>All Types</option>
                    <option>Cardio</option>
                    <option>Strength</option>
                    <option>Recovery</option>
                </select>
                <input
                    type="text"
                    placeholder="Search exercises..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
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
                                    <h4>{exercise.Title}</h4>
                                    <img
                                        src={exercise.staticImage}
                                        alt={exercise.Title}
                                        className="exercise-image"
                                        onMouseOver={(e) => (e.currentTarget.src = exercise.src)}
                                        onMouseOut={(e) => (e.currentTarget.src = exercise.staticImage)}
                                    />
                                    <p>{exercise.Level}</p>
                                    <div className="exercise-types">
                                        <span className={`exercise-type ${exercise.Type}`}>
                                            {typeIcons[exercise.Type]} {exercise.Type}
                                        </span>
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

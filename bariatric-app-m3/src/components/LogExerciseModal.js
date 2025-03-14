import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const LogExerciseModal = ({ show, handleClose, handleExerciseSubmit }) => {
    const [selectedExercise, setSelectedExercise] = useState("");
    const [calories, setCalories] = useState("");
    const [minutes, setMinutes] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = () => {
        const selected = predefinedExercises.find(exercise => exercise.name === selectedExercise);
        handleExerciseSubmit(selected, minutes);  // Pass the selected exercise object, not just the name
        handleClose();
    };

    // Mock data - in a real app, this would come from an API or database
    const predefinedExercises = [
        { id: 1, name: 'Walking', caloriesPerMinute: 4, lowImpact: true },
        { id: 2, name: 'Seated Leg Lifts', caloriesPerMinute: 3, lowImpact: true },
        { id: 3, name: 'Arm Circles', caloriesPerMinute: 2.5, lowImpact: true },
        { id: 4, name: 'Light Stretching', caloriesPerMinute: 2, lowImpact: true },
        { id: 5, name: 'Stationary Bike', caloriesPerMinute: 7, lowImpact: true }
    ];

    const filteredExercises = predefinedExercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Log New Exercise</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Exercise</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedExercise}
                            onChange={(e) => setSelectedExercise(e.target.value)}
                        >
                            <option value="">Select Exercise</option>
                            {filteredExercises.map((exercise) => (
                                <option key={exercise.id} value={exercise.name}>
                                    {exercise.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Total Minutes</Form.Label>
                        <Form.Control
                            type="number"
                            value={minutes}
                            onChange={(e) => setMinutes(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={handleSubmit}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LogExerciseModal;

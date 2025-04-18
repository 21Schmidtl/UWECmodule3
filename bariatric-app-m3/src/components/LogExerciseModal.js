import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const LogExerciseModal = ({ show, handleClose, handleExerciseSubmit, exerciseList }) => {
    const [selectedExercise, setSelectedExercise] = useState("");
    const [calories, setCalories] = useState("");
    const [minutes, setMinutes] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = () => {
        const selected = exerciseList.find(exercise => exercise.Title === selectedExercise);
        handleExerciseSubmit(selected, minutes);  // Pass the selected exercise object, not just the name
        handleClose();
    };

    const filteredExercises = exerciseList.filter(exercise =>
        exercise.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Log New Exercise</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className={"mb-3"}>
                        <Form.Label>Exercise</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedExercise}
                            onChange={(e) => setSelectedExercise(e.target.value)}
                        >
                            <option value="">Select Exercise</option>
                            {filteredExercises.map((exercise, idx) => (
                                <option key={idx} value={exercise.Title}>
                                    {exercise.Title}
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

import './App.css';
import Home from "./pages/home";
import ExerciseTracker from "./pages/ExerciseTracker";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/exercise-tracker" element={<ExerciseTracker />} />
          </Routes>
      </Router>
  );
}

export default App;

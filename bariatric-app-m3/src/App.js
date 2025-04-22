import './App.css';
import Home from "./pages/home";
import ExerciseTracker from "./pages/ExerciseTracker";
import CalorieTracker from "./pages/CalorieTracker";
import FatSecretSearch from "./pages/apitest"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/exercise-tracker" element={<ExerciseTracker />} />
              <Route path="/calorie-tracker" element={<CalorieTracker />} />
              <Route path="/FatSecretSearch" element={<FatSecretSearch />} />
          </Routes>
      </Router>
  );
}

export default App;

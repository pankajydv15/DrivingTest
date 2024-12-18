// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from './pages/Home'
import Login from './pages/Login'
import TestSelection from "./pages/TestSelection";
import PreTest from "./pages/PreTest"; // assuming PreTest component exists
import PostTest from "./pages/PostTest"; // assuming PostTest component exists
import ColorBlindTest from "./pages/ColorBlindTest"; // assuming ColorBlindTest component exists
import RoadTest from "./pages/RoadTest"; // assuming RoadTest component exists
import ProgressReport from "./pages/ProgressReport"
import NewRegistration from "./pages/NewRegistration";
import UserData from "./pages/UserData";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test-selection" element={<TestSelection />} />
        <Route path="/pre-test" element={<PreTest />} />
        <Route path="/post-test" element={<PostTest />} />
        <Route path="/color-blind" element={<ColorBlindTest />} />
        <Route path="/road-test" element={<RoadTest />} />
        <Route path="/progress-report" element={<ProgressReport />} />
        <Route path="/new-registration" element={<NewRegistration />} />
        <Route path="/user-Data" element={<UserData />} />
      </Routes>
    </Router>
  );
}

export default App;

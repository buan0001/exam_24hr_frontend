import { Routes, Route } from "react-router-dom";
import "./App.css";
import ParticipantPage from "./components/participants/ParticipantPage";
import NavHeader from "./components/NavHeader";
import ResultsPage from "./components/results/ResultsPage";
import DisciplinePage from "./components/disciplines/DisciplinePage";

function App() {
  return (
    <>
      <NavHeader />
      <Routes>
        <Route path="/" element={<ParticipantPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/disciplines" element={<DisciplinePage />} />
      </Routes>
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import "./App.css";
import ParticipantPage from "./components/participants/ParticipantPage";
import NavHeader from "./components/NavHeader";
import ResultsPage from "./components/results/ResultsPage";

function App() {
  return (
    <>
      <NavHeader />
      <Routes>
        <Route path="/" element={<ParticipantPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </>
  );
}

export default App;

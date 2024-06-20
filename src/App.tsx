import { Routes, Route } from "react-router-dom";
import "./App.css";
import ParticipantPage from "./components/participants/ParticipantPage";
import NavHeader from "./components/NavHeader";

function App() {
  return (
    <>
      <NavHeader />
      <Routes>
        <Route path="/" element={<ParticipantPage />} />
        <Route path="/results" element={<ParticipantPage />} />
      </Routes>
    </>
  );
}

export default App;

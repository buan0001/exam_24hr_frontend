import { Routes, Route } from "react-router-dom";
import "./App.css";
import ParticipantPage from "./components/ParticipantPage";
import NavHeader from "./components/NavHeader";


function App() {
  return (
    <>
      <NavHeader />
      <Routes>
        <Route path="/" element={<ParticipantPage />} />
        
      </Routes>
    </>
  );
}

export default App;

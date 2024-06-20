import { useEffect, useState } from "react";
import DisciplineForm from "./DisciplineForm";
import DisciplineList from "./DisciplineList";
import { getDisciplines } from "../../services/FetchHandler";
import { Discipline } from "../../global_interfaces/participantInterface";

export default function DisciplinePage() {
  const [disciplines, setDisciplines] = useState([]);
  const [formDiscipline, setFormDiscipline] = useState({} as Discipline);

  useEffect(() => {
    async function fetchData() {
      console.log("Fetching disciplines");
      setDisciplines(await getDisciplines());
    }
    fetchData();
  }, []);
  return (
    <div style={{ display: "flex", gap: "4em", margin: "1em", padding: "1em" }}>
      <DisciplineForm setDisciplines={setDisciplines} formDiscipline={formDiscipline} setFormDiscipline={setFormDiscipline} />

      <DisciplineList disciplines={disciplines} setFormDiscipline={setFormDiscipline} />
    </div>
  );
}

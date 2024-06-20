import { useEffect, useState } from "react";
import ResultsForm from "./ResultsForm";
import ResultsTable from "./ResultsTable";
import {  getDisciplines, getParticipants, getResults } from "../../services/FetchHandler";
import {   NewResult, Participant, ResultListItem } from "../../global_interfaces/participantInterface";

export default function ResultsPage() {
  const [results, setResults] = useState<ResultListItem[]>([]);
  const [formResult, setFormResult] = useState<NewResult>();
  const [disciplines, setDisciplines] = useState([]);
  const [participants, setParticipants] = useState<Participant[]>([])

  useEffect(() => {
    async function fetchData() {
      console.log("Fetching results");
      setParticipants(await getParticipants());
      setResults(await getResults());
      setDisciplines(await getDisciplines());
    }
    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>
        <ResultsForm formResult={formResult} setFormResult={setFormResult} disciplines={disciplines} setResults={setResults} participants={participants} />
      </div>
      <div>
        <ResultsTable results={results} disciplines={disciplines} setFormResult={setFormResult} setResults={setResults} />
      </div>
    </div>
  );
}

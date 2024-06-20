import { useEffect, useState } from "react";
import ResultsForm from "./ResultsForm";
import ResultsTable from "./ResultsTable";
import {  getDisciplines, getResults } from "../../services/FetchHandler";
import {  ResultListItem } from "../../global_interfaces/participantInterface";

export default function ResultsPage() {
  const [results, setResults] = useState<ResultListItem[]>([]);
  const [formResult, setFormResult] = useState();
  const [disciplines, setDisciplines] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log("Fetching results");
    //   setResults(await getParticipants());
      setResults(await getResults());
      setDisciplines(await getDisciplines());
    }
    fetchData();
  }, []);

  return (
    <div>
      <ResultsForm formResult={formResult} setFormResult={setFormResult} disciplines={disciplines} />
      {/* <ResultsTable ={results} /> */}
      <ResultsTable results={results} disciplines={disciplines} />
    </div>
  );
}

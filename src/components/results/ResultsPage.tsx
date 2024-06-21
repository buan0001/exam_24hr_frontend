import { useEffect, useState } from "react";
import ResultsForm from "./ResultsForm";
import ResultsTable, { FilterObject } from "./ResultsTable";
import {  getDisciplines, getParticipants, getResults } from "../../services/FetchHandler";
import {   NewResult, Participant, ResultListItem } from "../../global_interfaces/participantInterface";

export default function ResultsPage() {
  const [results, setResults] = useState<ResultListItem[]>([]);
  const [formResult, setFormResult] = useState<NewResult>();
  const [disciplines, setDisciplines] = useState([]);
  const [participants, setParticipants] = useState<Participant[]>([])
  const [creatingMultiple, setCreatingMultiple] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterObject>({ discipline: "100m hurdles", ageGroup: "", gender: "" });

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
        <ResultsForm
          formResult={formResult}
          setFormResult={setFormResult}
          disciplines={disciplines}
          setResults={setResults}
          participants={participants}
          creatingMultiple={creatingMultiple}
          setCreatingMultiple={setCreatingMultiple}
          setFilter={setFilter}
          filter={filter}
        />
      </div>
      <div>
        <ResultsTable results={results} disciplines={disciplines} setFormResult={setFormResult} setResults={setResults} creatingMultiple={creatingMultiple} filter={filter} setFilter={setFilter} />
      </div>
    </div>
  );
}

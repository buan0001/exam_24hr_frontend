import {  Discipline, ResultListItem } from "../../global_interfaces/participantInterface";
import { useState } from "react";

export default function ResultsTable({ results, disciplines }: { results: ResultListItem[]; disciplines: Discipline[] }) {
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [ageGroupFilter, setAgeGroupFilter] = useState<string>("all");

  console.log("Results", results);


  function sortedAndFilteredResults() {
    
  }

  return (
    <div>
      <h3>
        <label htmlFor="discipline">Discipline</label>
        <select name="discipline">
          {disciplines.map((discipline) => (
            <option key={discipline.name} value={discipline.name}>
              {discipline.name}
            </option>
          ))}
        </select>
        <label htmlFor="ageGroup">Age Group</label>
        <select name="ageGroup">
          <option value={"Child"}>Child</option>
          <option value={"Youth"}>Youth</option>
          <option value={"Junior"}>Junior</option>
          <option value={"Adult"}>Adult</option>
          <option value={"Senior"}>Senior</option>
        </select>
        <label htmlFor="discipline">Discipline</label>
        <select name="discipline">
          {disciplines.map((discipline) => (
            <option key={discipline.name} value={discipline.name}>
              {discipline.name}
            </option>
          ))}
        </select>
      </h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Result</th>
            <th>Discipline</th>
            <th>Participant</th>
            <th>Age group</th>
          </tr>
        </thead>
        <tbody>
          {results?.map((result) => (
            <tr key={result.id}>
              <td>{result.date}</td>
              <td>{result.result}</td>
              <td>{result.discipline.name}</td>
              <td>{result.participant.name}</td>
              <td>{result.participant.ageGroup}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
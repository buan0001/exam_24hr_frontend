import { Discipline, NewResult, ResultListItem } from "../../global_interfaces/participantInterface";
import React, { useState } from "react";
import { capitalizeFirstLetter, convertResultToReadable } from "../../helpers/helperFunctions";
import { deleteResult, getResults } from "../../services/FetchHandler";

type FilterObject = {
  discipline: string;
  ageGroup: string;
  gender: string;

  [key: string]: string;
};

export default function ResultsTable({
  results,
  disciplines,
  setFormResult,
  setResults,
  creatingMultiple,
}: {
  results: ResultListItem[];
  disciplines: Discipline[];
  setFormResult: (r: NewResult) => void;
  setResults: (r: ResultListItem[]) => void;
  creatingMultiple: boolean;
}) {
  const [filter, setFilter] = useState<FilterObject>({ discipline: "100m hurdles", ageGroup: "", gender: "" });

  // console.log("Results", results);

  function sortedAndFilteredResults() {
    // console.log("results",results);
    
    // if (!results) {return [<div>No results found</div>]}
    const filteredResults = results.filter((result) => {
      if (filter.discipline !== "" && filter.discipline.toLocaleLowerCase() != result.discipline.name.toLocaleLowerCase()) return false;
      if (filter.ageGroup !== "" && filter.ageGroup.toLocaleLowerCase() != result.participant.ageGroup.toLocaleLowerCase()) return false;
      if (filter.gender !== "" && filter.gender.toLocaleLowerCase() != result.participant.gender.toLocaleLowerCase()) return false;

      return true;
    });
    const sortedResults = filteredResults.sort((a, b) => {
      return a.resultValue - b.resultValue;
    });
    // console.log("filtered and sorted results", sortedResults);

    return sortedResults;
  }

  function handleFilterChanged(e: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    // console.log("name", name, "value", value);
    setFilter({ ...filter, [name]: value });
    // console.log("filter", filter);
    sortedAndFilteredResults();
  }

  async function handleDeleteClicked(id: number) {
    console.log("delete clicked");
    const res = await deleteResult(id);
    if (res) {
      console.log("Result deleted");
      setResults(await getResults());
    }
  }

  async function handleFormClicked(result: ResultListItem) {
    if (creatingMultiple) {
      console.log("Creating multiple results, cannot edit");
      return;
    }
    setFormResult({ participant: result.participant, id: result.id, resultValue: convertResultToReadable(result), discipline: result.discipline, date: result.date });
  }

  return (
    <div>
      <h3>
        <label htmlFor="discipline">Discipline</label>
        <select name="discipline" onChange={handleFilterChanged}>
          {disciplines.map((discipline) => (
            <option key={discipline.name} value={discipline.name}>
              {discipline.name}
            </option>
          ))}
        </select>
        <label htmlFor="ageGroup">Age Group</label>
        <select name="ageGroup" onChange={handleFilterChanged}>
          <option value={""}>All</option>
          <option value={"Child"}>Child</option>
          <option value={"Youth"}>Youth</option>
          <option value={"Junior"}>Junior</option>
          <option value={"Adult"}>Adult</option>
          <option value={"Senior"}>Senior</option>
        </select>
        <label htmlFor="gender">Gender</label>
        <select name="gender" onChange={handleFilterChanged}>
          <option value="">All</option>
          <option value="WOMAN">Women</option>
          <option value="MAN">Men</option>
          <option value="OTHER">Other</option>
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
            <th>Gender</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredResults().map((result) => (
            <tr key={result.id}>
              <td>{result.date}</td>
              <td>{result.result}</td>
              <td>{result.discipline.name}</td>
              <td>{result.participant.name}</td>
              <td>{result.participant.ageGroup}</td>
              <td>{capitalizeFirstLetter(result.participant.gender)}</td>
              <td>
                <button onClick={() => handleFormClicked(result)}>Edit result</button>
              </td>
              <td>
                <button onClick={() => handleDeleteClicked(result.id)}>Delete result</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React, { useState } from "react";
import { Discipline, ListParticipant, NewResult, Participant, ResultListItem } from "../../global_interfaces/participantInterface";
import { getResults, postResults, updateResult } from "../../services/FetchHandler";
import { cleanResult, convertResultToReadable } from "../../helpers/helperFunctions";
import { FilterObject } from "./ResultsTable";

const emptyObj = {
  participant: {} as ListParticipant,
  date: "",
  resultValue: "",
  discipline: { name: "", resultType: "" },
};

export default function ResultsForm({
  formResult = emptyObj,
  setFormResult,
  disciplines,
  setResults,
  participants,
  creatingMultiple,
  setCreatingMultiple,
  filter,
  setFilter,
}: {
  formResult: NewResult | undefined;
  setFormResult: (n: NewResult) => void;
  disciplines: Discipline[];
  setResults: (r: ResultListItem[]) => void;
  participants: Participant[];
  creatingMultiple: boolean;
  setCreatingMultiple: (b: boolean) => void;
  filter: FilterObject;
  setFilter: (obj: FilterObject) => void;
}) {
  const [error, setError] = useState<string>("");
  const [finalResults, setFinalResults] = useState<NewResult[]>([]);

  function validate(result: NewResult): NewResult | false {
    if (!formResult.participant || !formResult.participant.id || !formResult.discipline || !formResult.date || !formResult.resultValue) {
      setError("All fields must be filled out");
      return false;
    }
    const cleanedValue = cleanResult(result);
    if (!cleanedValue) {
      console.error("Invalid result value", result.resultValue);
      setError("Invalid result value");
      return false;
    }
    return { ...formResult, resultValue: cleanedValue };
  }

  async function handleSubmit(result: NewResult) {
    const submitObj = validate(result);
    if (!submitObj) {
      return;
    }
    console.log("Submitting result", submitObj);

    try {
      if (finalResults.length == 0 && submitObj.id) {
        await updateResult(submitObj);
      } else {
        finalResults.push(submitObj);
        await postResults(finalResults);
        setFinalResults([]);
        setCreatingMultiple(false);
      }
      setFilter({ ...filter, discipline: formResult.discipline.name });
      setResults(await getResults());
      setFormResult(emptyObj);
      setError("");
    } catch (error) {
      console.error("Error submitting result", error);
    }
  }

  function handleMoreResults() {
    const submitObj = validate(formResult);
    if (!submitObj) {
      return;
    }
    finalResults.push(submitObj);
    setFormResult({ ...formResult, resultValue: "" });
    setCreatingMultiple(true);
    setFinalResults(finalResults);
  }

  function handleFormInputChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    // console.log("e.target.name", e.target.name);
    // console.log("e.target.value", e.target.value);

    const { name, value } = e.target;
    if (name == "discipline") {
      const s = value.split("-");
      console.log("form", formResult);
      if (formResult.participant.disciplines && !formResult.participant.disciplines.find((d) => Number(d.id) == Number(s[2]))) {
        console.log("discipline not found in participant", s[2]);

        setFormResult({ ...formResult, participant: {} as ListParticipant, discipline: { name: s[0], resultType: s[1], id: Number(s[2]) } });
      } else {
        setFormResult({ ...formResult, discipline: { name: s[0], resultType: s[1], id: Number(s[2]) } });
      }
    } else if (name == "participant") {
      const p = participants.find((p) => p.id == Number(value));
      console.log("participant", p);
      if (p) {
        setFormResult({ ...formResult, participant: p });
      }
    } else {
      setFormResult({ ...formResult, [name]: value });
    }
  }

  function generateResultInput() {
    const ret = formResult.discipline.resultType;
    // console.log(ret);

    return (
      <label>
        {ret == "THROW" || ret == "JUMP" ? "Format: m,cm" : ret === "POINTS" ? "Points" : "Format: mm.ss.mss"}
        <input type="text" name="resultValue" value={formResult.resultValue} onChange={handleFormInputChange} />
      </label>
    );
  }

  async function handleSaveAll() {
    try {
      await postResults(finalResults);
      setFilter({...filter, discipline:formResult.discipline.name});
      setFinalResults([]);
      setCreatingMultiple(false);
      setResults(await getResults());
      setFormResult(emptyObj);
    } catch (error) {
      console.error("Error saving results", error);
    }
  }

  function generateParticipants() {
    // console.log(formResult.discipline);

    const res = participants.filter((parti) => parti.disciplines.find((dis) => dis.id == formResult.discipline.id));
    // console.log("elligbile participants", res);
// selected={participant.name == formResult.participant.name}
    return res.map((participant) => (
      <>
        <option key={participant.id} value={participant.id} >
          {participant.name}
        </option>
      </>
    ));
  }

  return (
    <div style={{ display: "flex" }}>
      <div>
        {finalResults.length > 0 && (
          <>
            <h2>Results to be submitted</h2>
            <button className="submit-btn" onClick={handleSaveAll}>
              Save all
            </button>
          </>
        )}
        {finalResults.length > 0 &&
          finalResults.map((result, index) => (
            <ul key={result.participant.name + index}>
              <li>{result.discipline.name}</li>
              <li>{result.participant.name}</li>
              <li>{convertResultToReadable(result)}</li>
              <li>{result.date}</li>
            </ul>
          ))}
      </div>
      <div>
        <h2>Results form</h2>

        {error && <div>{error}</div>}
        <form style={{ display: "flex", flexDirection: "column", gap: "1vw", padding: "1vw", margin: "1vw" }}>
          <label>
            Discipline
            <select name="discipline" onChange={handleFormInputChange} disabled={creatingMultiple}>
              <option value="">Select discipline</option>
              {disciplines.map((discipline) => (
                <option key={discipline.name} selected={discipline.name === formResult.discipline.name} value={discipline.name + "-" + discipline.resultType + "-" + discipline.id}>
                  {discipline.name}
                </option>
              ))}
            </select>
          </label>
          <div>
            <label>
              Date
              <input type="date" name="date" value={formResult.date} onChange={handleFormInputChange} />
            </label>
          </div>
          <select name="participant" id="" value={formResult.participant.id} onChange={handleFormInputChange}>
            <option value="">Select participant</option>
            {participants && generateParticipants()}
          </select>
          {generateResultInput()}

          <button type="button" style={{ backgroundColor: "rgba(0, 255, 0, .5)" }} onClick={() => handleMoreResults()}>
            Add more results
          </button>

          <button className="submit-btn" type="button" onClick={() => handleSubmit(formResult)}>
            {formResult.id ? "Update" : "Submit"}
          </button>
          <button className="reset-btn" type="reset" onClick={() => setFormResult(emptyObj)}>
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}

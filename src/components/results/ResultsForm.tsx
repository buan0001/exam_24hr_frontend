import React, { useState } from "react";
import { Discipline, ListParticipant, NewResult, Participant, ResultListItem } from "../../global_interfaces/participantInterface";
import { getResults, submitResult } from "../../services/FetchHandler";
import { cleanResult } from "../../helpers/helperFunctions";

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
}: {
  formResult: NewResult | undefined;
  setFormResult: (n: NewResult) => void;
  disciplines: Discipline[];
  setResults: (r: ResultListItem[]) => void;
  participants: Participant[];
}) {
  const [error, setError] = useState<string>("");


  async function handleSubmit(result: NewResult) {
    if (!formResult.participant || !formResult.discipline || !formResult.date || !formResult.resultValue) {
      setError("All fields must be filled out");
      return;
    }
    const cleanedValue = cleanResult(result);
    if (!cleanedValue) {
      console.error("Invalid result value", result.resultValue);
      setError("Invalid result value");
      return;
    }
    const submitObj = { ...formResult, resultValue: cleanedValue };
    console.log("Submitting result", submitObj);

    try {
      await submitResult(submitObj);
      setResults(await getResults());
      setError("");
    } catch (error) {
      console.error("Error submitting result", error);
    }
  }

  function handleFormInputChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    console.log("e.target.name", e.target.name);
    console.log("e.target.value", e.target.value);
    

    const { name, value } = e.target;
    if (name == "discipline") {
      const s = value.split("-");
      console.log("split", s);

      setFormResult({ ...formResult, discipline: { name: s[0], resultType: s[1] } });
    } 
    else if (name == "participant") {
      const p = participants.find((p) => p.id == Number(value));
      console.log("participant", p);
      if (p) {
        setFormResult({ ...formResult, participant: p });
      }
    }
    else {
      setFormResult({ ...formResult, [name]: value });
    }
  }

  function generateResultInput() {
    const ret = formResult.discipline.resultType;
    console.log(ret);

    return (
      <label>
        {ret == "THROW" || ret == "JUMP" ? "Format: M,CM" : ret === "POINTS" ? "Points" : "Format: MM.SS.MSS"}
        <input type="text" name="resultValue" value={formResult.resultValue} onChange={handleFormInputChange} />
      </label>
    );

  }

  return (
    <div>
      <h2>Results form</h2>
      {error && <div>{error}</div>}
      <form style={{ display: "flex", flexDirection: "column", gap: "1vw", padding: "1vw", margin: "1vw" }}>
        <label>
          Discipline
          <select name="discipline" onChange={handleFormInputChange}>
            <option value="">Select discipline</option>
            {disciplines.map((discipline) => (
              <option key={discipline.name} selected={discipline.name === formResult.discipline.name} value={discipline.name + "-" + discipline.resultType}>
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
        <select name="participant" id="" onChange={handleFormInputChange}>
          <option value="">Select participant</option>
          {participants &&
            participants.map((participant) => (
              <option key={participant.id} value={participant.id} selected={participant.id == formResult.participant.id}>
                {participant.name}
              </option>
            ))}
        </select>
        {generateResultInput()}

        <button type="button" onClick={() => handleSubmit(formResult)}>
          Submit
        </button>
        <button type="reset" onClick={() => setFormResult(emptyObj)}>
          Reset
        </button>
      </form>
    </div>
  );
}

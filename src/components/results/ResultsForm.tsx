import React from "react";
import { Discipline, NewResult, ResultListItem } from "../../global_interfaces/participantInterface";
import { getResults, submitResult } from "../../services/FetchHandler";

const emptyObj = {
  date: "",
  result: "",
  discipline: { name: "", resultType: "" },
};

export default function ResultsForm({
  formResult = emptyObj,
  setFormResult,
  disciplines,
  setResults,
}: {
  formResult: NewResult | undefined;
  setFormResult: (n: NewResult) => void;
  disciplines: Discipline[];
  setResults: (r: ResultListItem[]) => void;
}) {
  async function handleSubmit(result: NewResult) {
    const submitObj = {
      date: formResult.date,
      discipline: { name: formResult.discipline },
      result: formResult.result,
    };
    console.log("Submitting result", result);

    try {
      await submitResult(submitObj);
      setResults(await getResults());
    } catch (error) {
      console.error("Error submitting result", error);
    }
  }

  function handleFormInputChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    console.log("e.target.name", e.target.name);

    const { name, value } = e.target;
    if (name == "discipline") {
      const s = value.split("-");
      console.log("split", s);

      setFormResult({ ...formResult, discipline: { name: s[0], resultType: s[1] } });
    } else {
      setFormResult({ ...formResult, [name]: value });
    }
  }

  function generateResultInput() {
    if (formResult.discipline)
      <label>
        Result
        <input type="number" name="result" value={formResult.result} onChange={handleFormInputChange} />
        {/* <input type="text" name="result" value={formResult.result} onChange={(e) => setFormResult({ ...formResult, result: e.target.value })} /> */}
      </label>;

    return <div>hej</div>;
  }

  return (
    <div>
      <h2>Results form</h2>
      <form style={{ display: "flex", flexDirection: "column", gap: "1vw", padding: "1vw", margin: "1vw" }}>
        <label>
          Discipline
          <select name="discipline" value={formResult.discipline.name} onChange={handleFormInputChange}>
            {disciplines.map((discipline) => (
              <option key={discipline.name} value={discipline.name + "-" + discipline.resultType}>
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

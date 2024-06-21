import { useState } from "react";
import { Discipline } from "../../global_interfaces/participantInterface";
import { getDisciplines, submitDiscipline } from "../../services/FetchHandler";

const defaultDiscipline = {
  name: "",
  resultType: "JUMP",
};

export default function DisciplineForm({
  setDisciplines,
  formDiscipline = defaultDiscipline,
  setFormDiscipline,
}: {
  setDisciplines: (discipline: Discipline[]) => void;
  formDiscipline: Discipline;
  setFormDiscipline: (d: Discipline) => void;
}) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log("posting discipline", formDiscipline);
    if (!formDiscipline.name || !formDiscipline.resultType || formDiscipline.name === "" || formDiscipline.resultType === "") {
        console.log("not allowed");
        
      return setErrorMessage("Please fill out all fields");
    } else {
      const response = await submitDiscipline(formDiscipline);
      console.log("new discipline", response);
      setErrorMessage("");
      setFormDiscipline(defaultDiscipline);
      setDisciplines(await getDisciplines());
    }
  }

  function handleDisciplineInputChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    console.log("name", name, "value", value);
    setFormDiscipline({ ...formDiscipline, [name]: value });
  }

  return (
    <>
      <div>
        <div>
          <h1>Discipline Form</h1>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <div>
          <form style={{ display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center", gap: "1em" }}>
            <label>
              Discipline name
              <input type="text" name="name" value={formDiscipline.name} onChange={handleDisciplineInputChange} />
            </label>
            <label>
              Result type
              <select name="resultType" value={formDiscipline.resultType} onChange={handleDisciplineInputChange}>
                <option value="TIME">Time</option>
                <option value="JUMP">Jump</option>
                <option value="THROW">Throw</option>
                <option value="POINTS">Points</option>
              </select>
            </label>
            <div>
              <button style={{ width: "50%", backgroundColor: "rgba(0, 255, 0, .5)" }} onClick={handleSubmit}>
                Submit
              </button>
              <button type="reset" onClick={() => setFormDiscipline(defaultDiscipline)} style={{ width: "50%", backgroundColor: "rgba(150, 100, 0, .5)" }}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

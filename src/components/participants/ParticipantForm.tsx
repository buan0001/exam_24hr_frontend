import { useState } from "react";
import { Discipline, Participant } from "../../global_interfaces/participantInterface";
import { getParticipants, postParticipant } from "../../services/FetchHandler";
import { defaultParticipant } from "../../global_interfaces/emptyInstancedInterfaces";

export default function ParticipantForm({
  setParticipants,
  formParticipant,
  setFormParticipant,
  clubs,
  disciplines,
}: {
  setParticipants: (participants: Participant[]) => void;
  formParticipant: Participant;
  setFormParticipant: (participant: Participant) => void;
  clubs: string[];
  disciplines: Discipline[];
}) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("posting participant", formParticipant);
    if (formParticipant.name === "" || formParticipant.birthDate === "" || formParticipant.club === "" || formParticipant.gender === "") return setErrorMessage("Please fill out all fields");

    const response = await postParticipant(formParticipant);

    console.log(response);

    setErrorMessage("");
    setFormParticipant(defaultParticipant);
    setParticipants(await getParticipants());
  }

  function handleParticipantInputChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    console.log("name", name, "value", value);
    
    setFormParticipant({ ...formParticipant, [name]: value });
    
  }

  function disciplineChanged(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log("target value", e.target.value);
    if (formParticipant.disciplines.find((discipline) => discipline.name === e.target.value)) {
      setFormParticipant({
        ...formParticipant,
        disciplines: formParticipant.disciplines.filter((discipline) => {
          return discipline.name !== e.target.value;
        }),
      });
    } else {
      setFormParticipant({ ...formParticipant, disciplines: [...formParticipant.disciplines, { name: e.target.value }] });
    }
  }

  function generateDisciplineOptions() {
    // console.log("form part",formParticipant);

    if (disciplines.length === 0) {
      return <option value={""}>No disciplines available</option>;
    }
    return disciplines.map((discipline) => (
      <option key={discipline.name} value={discipline.name}>
        {discipline.name}
      </option>
    ));
  }

  function generateClubOptions() {
    return clubs.map((club) => (
      <option key={club} value={club} selected={club.toLocaleLowerCase() == formParticipant.club.toLocaleLowerCase()}>
        {/* {capitalizeFirstLetter(club)}
         */}
        {club}
      </option>
    ));
  }

  // function capitalizeFirstLetter(string: string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase();
  // }
  return (
    <>
      <h1>Participant Form</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {errorMessage && <p>{errorMessage}</p>}
        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "10px",
            padding: "10px",
            gap: "10px",
          }}
        >
          <label>Name</label>
          <input type="text" name="name" value={formParticipant.name} onChange={handleParticipantInputChange} />
          <label>Gender</label>
          <select name="gender" id="" onChange={handleParticipantInputChange} value={formParticipant.gender}>
            <option value=""></option>
            <option value="MAN">Man</option>
            <option value="WOMAN">Woman</option>
            <option value="OTHER">Other</option>
          </select>
          <label>Birthdate</label>
          <input type="date" name="birthDate" value={formParticipant.birthDate} onChange={handleParticipantInputChange} />
          <label>Club</label>
          <select name="club" onChange={handleParticipantInputChange}>
            <option value="">Select a club</option>
            {generateClubOptions()}
          </select>
          <label>Disciplines</label>
          <select name="discipline" id="" onChange={disciplineChanged}>
            <option value={""}>Select disciplines</option>
            {generateDisciplineOptions()}
          </select>
          <button type="submit">Submit</button>
        </form>
        <div>
          <h3>Selected disciplines:</h3>
          <ul>
            {formParticipant.disciplines.map((discipline) => (
              <li key={discipline.name}>{discipline.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

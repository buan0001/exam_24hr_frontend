import { DetailedParticipant, Participant } from "../../global_interfaces/participantInterface";
import { defaultParticipant } from "../../global_interfaces/emptyInstancedInterfaces";


export default function ParticipantDetails({ selectedParticipant, setSelectedParticipant }: { selectedParticipant: DetailedParticipant; setSelectedParticipant: (participant: Participant) => void }) {
  function generateResults() {
    console.log("selected participant", selectedParticipant);

    if (selectedParticipant.results.length === 0)
      return (
        <>
          <div> {selectedParticipant.name} has no results</div>
        </>
      );
    else {
      return (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Result</th>
              <th>Discipline</th>
            </tr>
          </thead>
          <tbody>
            {selectedParticipant.results.map((result) => (
              <tr key={result.id}>
                <td>{result.date}</td>
                <td>{result.result}</td>
                {/* <td>{convertResultToReadable(result)}</td> */}
                <td>{result.discipline.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }

  if (selectedParticipant === defaultParticipant) return <h2>No participant selected</h2>;
  else {
    return (
      <>
        <h3>
          {selectedParticipant.name} is {selectedParticipant.age} years old & member of {selectedParticipant.club}
        </h3>
          <button className="details-button" onClick={() => setSelectedParticipant(defaultParticipant)}>Close</button>

        <h2>Disciplines:</h2>
        <ul>
          {selectedParticipant.disciplines && selectedParticipant.disciplines.map((discipline) => (
            <li key={discipline.name}>{discipline.name}</li>
          ))}
        </ul>
        <h2>Results</h2>
        {generateResults()}

      </>
    );
  }
}

import { useEffect, useState } from "react";
import ParticipantsTable from "./ParticipantTable";
import { Discipline, Participant } from "../global_interfaces/participantInterface";
import ParticipantDetails from "./ParticipantDetails";
import ParticipantForm from "./ParticipantForm";
import { defaultParticipant } from "../global_interfaces/emptyInstancedInterfaces";
import { getClubs, getDisciplines } from "../services/FetchHandler";

export default function ParticipantPage() {
  const [selectedParticipant, setSelectedParticipant] = useState<Participant>(defaultParticipant);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [formParticipant, setFormParticipant] = useState<Participant>(defaultParticipant);
  const [clubs, setClubs] = useState<string[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

  useEffect(() => {
    async function run ()  {
      console.log("Fetching participants");
      
      setDisciplines(await getDisciplines());
      setClubs(await getClubs());
    }
    run();
  }, []);

  // TODO: Implement CRUD functionality to trophies
  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            margin: "10px",
            padding: "10px",
          }}
        >
          <div
            style={{
              margin: "10px",
              padding: "10px",
            }}
          >
            <ParticipantsTable
              setSelectedParticipant={setSelectedParticipant}
              participants={participants}
              setParticipants={setParticipants}
              setFormParticipant={setFormParticipant}
              clubs={clubs}
              disciplines={disciplines}
            />
          </div>
          <div
            style={{
              margin: "10px",
              padding: "10px",
            }}
          >
            <ParticipantDetails setSelectedParticipant={setSelectedParticipant} selectedParticipant={selectedParticipant} />
          </div>

          <div
            style={{
              margin: "10px",
              padding: "10px",
            }}
          >
            <ParticipantForm setParticipants={setParticipants} formParticipant={formParticipant} setFormParticipant={setFormParticipant} clubs={clubs} disciplines={disciplines} />
          </div>
        </div>
      </div>
    </>
  );
}

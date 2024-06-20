import { Participant } from "../global_interfaces/participantInterface";

const API_URL = "http://localhost:8080/";
const PARTICIPANT_URL = API_URL + "participants";
const DISCIPLINE_URL = API_URL + "disciplines";

async function getParticipants(): Promise<Participant[]> {
  // console.log("Fetching participants");

  const response = await fetch(PARTICIPANT_URL).then((response) => response.json());
  console.log(response);

  return response;
}

async function getParticipant(id: number): Promise<Participant> {
  if (id) {
    const response = await fetch(`${PARTICIPANT_URL}/${id}`).then((response) => response.json());

    return response;
  }
  throw new Error("No id provided");
}

async function postParticipant(participant: Participant): Promise<Participant> {
  const URL = participant.id ? `${PARTICIPANT_URL}/${participant.id}` : PARTICIPANT_URL;
  const response = await fetch(URL, {
    method: participant.id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(participant),
  }).then((response) => response.json());

  return response;
}

async function deleteParticipant(id: number) {
  const response = await fetch(`${PARTICIPANT_URL}/${id}`, {
    method: "DELETE",
  });

  if (response.status === 200) return console.log("participant deleted");
}

async function getDisciplines() {
  const response = await fetch(DISCIPLINE_URL).then((response) => response.json());
  // console.log("DISCIPLINES", response);

  return response;
}

async function getClubs() {
  // console.log("Fetching clubs");

  const response = await fetch(`${PARTICIPANT_URL}/clubs`).then((response) => response.json());

  return response;
}

export { getParticipants, getParticipant, postParticipant, deleteParticipant, getDisciplines, getClubs };

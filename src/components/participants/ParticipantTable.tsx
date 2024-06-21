import { useEffect, useState } from "react";
import { deleteParticipant, getParticipant, getParticipants } from "../../services/FetchHandler";
import { Discipline, Participant } from "../../global_interfaces/participantInterface";
import { capitalizeFirstLetter } from "../../helpers/helperFunctions";

type FilterValues = {
  filterClub: string;
  filterGender: string;
  filterDiscipline: string;
  filterAgeGroup: string;

  [key: string]: string;
};

export default function ParticipantTable({
  setSelectedParticipant,
  participants,
  setParticipants,
  setFormParticipant,
  clubs,
  disciplines,
}: {
  setSelectedParticipant: (participant: Participant) => void;
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
  setFormParticipant: (participant: Participant) => void;
  clubs: string[];
  disciplines: Discipline[];
}) {
  const [sort, setSort] = useState<string>("name");
  const [sortDir, setSortDir] = useState<boolean>(true); // true = ascending, false = descending
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterValues, setFilterValues] = useState<FilterValues>({} as FilterValues);

  useEffect(() => {
    async function get() {
      const response = await getParticipants();

      setParticipants(response);
    }
    get();
  }, []);

  async function getDetailsClicked(id: number | undefined) {
    if (!id) return;
    const response = await getParticipant(id);

    setSelectedParticipant(response);
  }

  async function handleUpdateClicked(participant: Participant) {
    const res = await getParticipant(participant.id!);
    if (!res) return console.log("No participant found");
    setFormParticipant(res);
  }

  async function handleDelete(id: number | undefined) {
    if (!id) return;
    await deleteParticipant(id);

    setParticipants(await getParticipants());
  }

  function sortChanged(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    setSort(e.target.value);
  }

  function filterValuesChanged(e: React.ChangeEvent<HTMLSelectElement>) {
    
      setFilterValues({ ...filterValues, [e.target.name]: e.target.value });
      console.log("filterValues", filterValues);
    
  }

  function filteredAndSortedParticipants() {
    const searched = participants.filter((participant) => {
      return participant.name.toLowerCase().includes(searchValue.toLowerCase());
    });

    const sorted = searched.sort((a, b) => {
      if (sort === "age") return a.age - b.age;
      else {return a[sort].localeCompare(b[sort]);}
    });
    if (!sortDir) sorted.reverse();
    // console.log("filter values", filterValues);
    const filtered = sorted.filter((participant) => {
      let bool = true;
      for (const key in filterValues) {

        if (filterValues[key] === "") continue;
        else if (key === "disciplines") {
          if (!participant.disciplines) {
            bool = false;
            break;
          }
          let bool2 = false;
          for (const discipline of participant.disciplines) {
            // console.log("discipline", discipline.name);

            if (discipline.name.toLocaleLowerCase() === filterValues[key].toLocaleLowerCase()) {
              bool2 = true;
            }
          }
          if (!bool2) {
            bool = false;
          }
        } else if (filterValues[key].toLocaleLowerCase() !== participant[key].toLocaleLowerCase()) {
          bool = false;
        }
      }
      return bool;
    });


    return filtered;
  }

  function generateClubOptions() {
    return clubs.map((club) => (
      <option key={club} value={club}>
        {capitalizeFirstLetter(club)}
      </option>
    ));
  }

  function generateDisciplineOptions() {
    if (!disciplines || disciplines.length === 0) {
      return <option value={""}>No disciplines available</option>;
    }
    return disciplines.map((discipline) => (
      <option key={discipline.name} value={discipline.name}>
        {discipline.name}
      </option>
    ));
  }

  function generateAgeGroupOptions() {
    const temp: string[] = [];
    for (const participant of participants) {
      if (!temp.includes(participant.ageGroup)) {
        temp.push(participant.ageGroup);
      }
    }

    return temp.map((ageGroup) => (
      <option key={ageGroup} value={ageGroup}>
        {ageGroup}
      </option>
    ));
  }


  return (
    <>
      <h1>Participants</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1em",
          margin: "1em",
          padding: "1em",
        }}
      >
        <div>
          <label htmlFor="club">Club</label>
          <select name="club" onChange={filterValuesChanged}>
            <option value="">All</option>
            {generateClubOptions()}
          </select>
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select name="gender" onChange={filterValuesChanged}>
            <option value="">All</option>
            <option value="man">Men</option>
            <option value="woman">Women</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="ageGroup">Age group</label>
          <select name="ageGroup" onChange={filterValuesChanged}>
            <option value="">All</option>
            {generateAgeGroupOptions()}
          </select>
        </div>
        <div>
          <label htmlFor="disciplines">Discipline</label>
          <select name="disciplines" onChange={filterValuesChanged}>
            <option value="">All</option>
            {generateDisciplineOptions()}
          </select>
        </div>
        <div>
          <label htmlFor="sort">Sort by </label>
          <select name="sort" onChange={sortChanged}>
            <option value="name">Name</option>
            <option value="age">Age</option>
            <option value="club">Club</option>
            <option value="gender">Gender</option>
          </select>
        </div>
        <div>
          <label htmlFor="directionBox">Flip sort</label>
          <input type="checkbox" name="directionBox" onChange={() => setSortDir(!sortDir)}></input>
        </div>
        <div>
          <label htmlFor="search">
            Name
            <input type="text" placeholder="Search" name="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          </label>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age group</th>
            <th>Gender</th>
            <th>Club</th>
            <th>Details</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedParticipants().length > 0 ? (
            filteredAndSortedParticipants().map((participant) => (
              <tr key={participant.id}>
                <td>{participant.name}</td>
                <td>{participant.ageGroup}</td>
                <td>{capitalizeFirstLetter(participant.gender)}</td>
                <td>{participant.club}</td>

                <td>
                  <button className="details-button" onClick={() => getDetailsClicked(participant.id)}>
                    Details
                  </button>
                </td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => {
                      handleUpdateClicked(participant);
                    }}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => {
                      handleDelete(participant.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <h2>No participants found</h2>
          )}
        </tbody>
      </table>
    </>
  );
}

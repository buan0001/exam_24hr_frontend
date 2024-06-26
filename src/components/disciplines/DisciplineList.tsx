import { Discipline } from "../../global_interfaces/participantInterface";
import { capitalizeFirstLetter } from "../../helpers/helperFunctions";

export default function DisciplineList({ disciplines, setFormDiscipline }: { disciplines: Discipline[]; setFormDiscipline: (d: Discipline) => void }) {
  console.log("DisciplineList", disciplines);

  return (
    <>
      <div>
        <div>
          <h1>Discipline list</h1>
        </div>
        <div>
          <ul>
            {disciplines.map((discipline: Discipline) => (
              <li key={discipline.name}>
                {discipline.name} ({capitalizeFirstLetter(discipline.resultType)}) <button onClick={() => setFormDiscipline(discipline)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

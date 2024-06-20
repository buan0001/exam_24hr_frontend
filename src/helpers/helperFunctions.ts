import { NewResult } from "../global_interfaces/participantInterface";

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase();
}


export function cleanResult(result: NewResult) : number | false{
  if (typeof result.resultValue == "number"){return result.resultValue}
  const rt = result.discipline.resultType
  let resultValue = 0
  if (rt== "THROW" || rt == "JUMP" || rt == "POINTS"){
   
      const s = result.resultValue.split(",")
      if (s.length !== 2){
        return false
      }
    resultValue = Number(result.resultValue.replace(",","."))
  }
  if (rt == "TIME"){
    const s = result.resultValue.split(".")
    if (s.length !== 3){
      return false
    }
    s.forEach(element => element = element.slice(0,2))
    const [minutes, seconds, milliseconds] = s
    resultValue = Number(milliseconds) + Number(seconds) * 1000 + Number(minutes) * 60 * 1000
    
  }

  console.log("cleaned result", resultValue);
  
  return resultValue
}
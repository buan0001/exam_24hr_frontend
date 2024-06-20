import { NewResult } from "../global_interfaces/participantInterface";

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase();
}

export function cleanResult(result: NewResult): number | false {
  if (typeof result.resultValue == "number") {
    return result.resultValue;
  }
  const rt = result.discipline.resultType;
  let resultValue = 0;
  if (rt == "THROW" || rt == "JUMP" || rt == "POINTS") {
    const s = result.resultValue.split(",")
    if (s.length !== 2) {
      return false;
    }
    console.log("s", s);
    
    const whole = s[0];
    let decimal = s[1];

    if (Number(decimal) < 10) decimal = "0" + decimal;
    resultValue = Number(whole) * 100 + Number(decimal);
    
    
  }
  if (rt == "TIME") {
    const s = result.resultValue.split(".");
    // if (s.length !== 3){
    //   return false
    // }
    if (s.length == 3) {
      s[0] = s[0].slice(0, 2);
      s[1] = s[1].slice(0, 2);
      s[2] = s[2].slice(0, 3);
      const [minutes, seconds, milliseconds] = s;
      if (Number(seconds) > 59 || Number(milliseconds) > 999) {
        return false;
      }
      resultValue = Number(milliseconds) + Number(seconds) * 1000 + Number(minutes) * 60 * 1000;
    } else if (s.length == 2) {
      s[0] = s[0].slice(0, 2);
      s[1] = s[1].slice(0, 3);
      const [seconds, milliseconds] = s;
      if (Number(seconds) > 59 || Number(milliseconds) > 999) {
        return false;
      }
      resultValue = Number(milliseconds) + Number(seconds) * 1000;
    }
  }

  console.log("cleaned result", resultValue);

  return resultValue;
}

export function convertResultToReadable(result: NewResult): string {
  if (typeof result.resultValue == "string") {
    return result.resultValue;
  }
  if (result.discipline.resultType == "TIME") {
    return convertMsToString(result.resultValue);
  } else return convertDistanceToMeters(result.resultValue);
}

function convertDistanceToMeters(distance: number): string {
  const whole = Math.floor(distance / 100);
  const decimal = distance % 100;
  let paddedDecimal;
  if (decimal < 10) paddedDecimal = "0" + decimal;

  return `${whole},${paddedDecimal || decimal}`;
}

export function convertMsToString(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  const milliseconds = ms % 1000;
  const res = minutes > 0 ? `${minutes}.${seconds}.${milliseconds}` : `${seconds}.${milliseconds}`;
  console.log(res);
  return res;

  // const minutes = (ms % 60000).toFixed(0);
  // const seconds = ((ms % 60000) / 1000).toFixed(0);
  // const milliseconds = ms % 1000;
  // const res = `${minutes}.${seconds}.${milliseconds}`;
  // console.log(res);
  // return res
}

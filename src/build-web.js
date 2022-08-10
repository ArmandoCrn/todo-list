import { projectInput } from "./build-mainLeft";

export function duplicateInArray(text, array, objKey) {
  let result;
  array.forEach((obj) => {
    if (obj[objKey] === text) {
      result = true;
    }
  });

  return result;
}

export default function faicose() {
  console.log("ciao, sono in build-web");
}

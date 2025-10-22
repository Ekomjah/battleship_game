import { resetComputerBoard } from "./computerBoard";
import { reset } from "./playerBoard";

let count = 0;

export function isHumanTurn() {
  return count % 2 === 0;
}

export default function invert() {
  const isHumanPlaying = count % 2 === 0;
  count++;
  return isHumanPlaying;
}

export function resetAll() {
  reset();
  resetComputerBoard();
}

export function randomPlacements() {
  const shipLength = [5, 4, 3, 3, 2];
  const pOrientation = ["vertical", "horizontal"];
  const largeArr = [];

  shipLength.forEach((el, i) => {
    const chosenOrientation = pOrientation[Math.floor(Math.random() * 10) % 2];
    if (chosenOrientation === "vertical") {
      const ordinate = Math.floor(Math.random() * (10 - el));
      const abscissa = Math.floor(Math.random() * 10);
      largeArr.push({ chosenOrientation, ordinate, abscissa });
    } else {
      const ordinate = Math.floor(Math.random() * 10);
      const abscissa = Math.floor(Math.random() * (10 - el));
      largeArr.push({ chosenOrientation, ordinate, abscissa });
    }
  });
  return largeArr;
}

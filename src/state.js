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

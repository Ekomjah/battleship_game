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
  // Create a 10x10 grid to track occupied spaces
  const occupiedSpaces = Array(10)
    .fill(null)
    .map(() => Array(10).fill(false));

  function isValidPlacement(length, row, col, orientation) {
    // Check surrounding spaces too
    const checkAdjacent = (r, c) => {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newRow = r + i;
          const newCol = c + j;
          if (newRow >= 0 && newRow < 10 && newCol >= 0 && newCol < 10) {
            if (occupiedSpaces[newRow][newCol]) return false;
          }
        }
      }
      return true;
    };

    if (orientation === "vertical") {
      if (row + length > 10) return false;
      for (let i = 0; i < length; i++) {
        if (!checkAdjacent(row + i, col)) return false;
      }
    } else {
      if (col + length > 10) return false;
      for (let i = 0; i < length; i++) {
        if (!checkAdjacent(row, col + i)) return false;
      }
    }
    return true;
  }

  function markSpacesOccupied(length, row, col, orientation) {
    if (orientation === "vertical") {
      for (let i = 0; i < length; i++) {
        occupiedSpaces[row + i][col] = true;
      }
    } else {
      for (let i = 0; i < length; i++) {
        occupiedSpaces[row][col + i] = true;
      }
    }
  }

  // Place each ship
  for (const shipLen of shipLength) {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100; // Prevent infinite loops

    while (!placed && attempts < maxAttempts) {
      const chosenOrientation = pOrientation[Math.floor(Math.random() * 2)];
      let ordinate, abscissa;

      if (chosenOrientation === "vertical") {
        ordinate = Math.floor(Math.random() * (10 - shipLen));
        abscissa = Math.floor(Math.random() * 10);
      } else {
        ordinate = Math.floor(Math.random() * 10);
        abscissa = Math.floor(Math.random() * (10 - shipLen));
      }

      if (isValidPlacement(shipLen, ordinate, abscissa, chosenOrientation)) {
        markSpacesOccupied(shipLen, ordinate, abscissa, chosenOrientation);
        largeArr.push({
          chosenOrientation,
          ordinate,
          abscissa,
          length: shipLen,
        });
        placed = true;
      }

      attempts++;
    }

    // If we couldn't place a ship after max attempts, start over
    if (!placed) {
      // Reset everything and start over
      largeArr.length = 0;
      occupiedSpaces.forEach((row) => row.fill(false));
      return randomPlacements(); // Recursive call to start over
    }
  }

  return largeArr;
}

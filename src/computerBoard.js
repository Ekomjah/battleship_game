import moon, { isHumanTurn, randomPlacements } from "./state.js";
import { HumanPlayer, Computer } from "./ship.js";
let computer = new Computer();
const root = document.querySelector("#root");
const first = document.createElement("div");
const third = document.createElement("div");
root.appendChild(first);
first.classList.add("border");
third.classList.add("border");
third.style.display = "none";
root.appendChild(third);

export default function computerGrid() {
  renderBoard();
  playBoard();
}

function renderBoard() {
  const [a, b, c, d, e] = randomPlacements();
  for (let i = 0; i < computer.board.board.length; i++) {
    const gridParent = document.createElement("div");
    gridParent.classList.add("parent");
    first.appendChild(gridParent);
    for (let j = 0; j < computer.board.board[i].length; j++) {
      const gridChild = document.createElement("div");
      gridChild.classList.add("child-c");

      gridParent.appendChild(gridChild);

      try {
        computer.board.placeShipFrom(
          a.ordinate,
          a.abscissa,
          a.chosenOrientation,
          "carrier",
          5
        );
        computer.board.placeShipFrom(
          b.ordinate,
          b.abscissa,
          b.chosenOrientation,
          "battleship",
          4
        );
        computer.board.placeShipFrom(
          c.ordinate,
          c.abscissa,
          c.chosenOrientation,
          "cruiser",
          3
        );
        computer.board.placeShipFrom(
          d.ordinate,
          d.abscissa,
          d.chosenOrientation,
          "submarine",
          3
        );
        computer.board.placeShipFrom(
          e.ordinate,
          e.abscissa,
          e.chosenOrientation,
          "destroyer",
          2
        );

        for (let k = 0; k < computer.board.board.length; k++) {
          const childDivs = gridParent.children;
          const childDiv = childDivs[k];
          if (
            computer.board.board[i][k] !== null &&
            computer.board.board[i][k] !== "miss" &&
            computer.board.board[i][k] !== "hit"
          ) {
            childDiv.classList.add("ship");
          } else if (computer.board.board[i][k] === "miss") {
            childDiv.classList.add("miss");
          } else if (computer.board.board[i][k] === "hit") {
            childDiv.classList.add("hit");
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
}

function playBoard() {
  for (let i = 0; i < computer.board.board.length; i++) {
    const gridParent = document.createElement("div");
    gridParent.classList.add("parent");
    third.appendChild(gridParent);
    for (let j = 0; j < computer.board.board[i].length; j++) {
      const gridChild = document.createElement("div");
      gridChild.classList.add("child");
      gridChild.classList.add("aim");

      for (let k = 0; k < computer.board.board.length; k++) {
        const childDivs = gridParent.children;
        const childDiv = childDivs[k];
        if (computer.board.board[i][k] === "hit" && childDiv !== undefined) {
          childDiv.classList.add("hites");
        } else if (
          computer.board.board[i][k] === "miss" &&
          childDiv !== undefined
        ) {
          childDiv.classList.add("misses");
        }
      }

      gridParent.appendChild(gridChild);
    }
  }

  const all = document.querySelectorAll(".aim");

  function robot() {
    if (!isHumanTurn()) {
      const filtered = [...all].filter(
        (el) =>
          !el.classList.contains("misses") && !el.classList.contains("hites")
      );
      if (filtered.length === 0) {
        alert("its a draw!");
        return;
      }
      const length = filtered.length;
      const index = Math.floor(Math.random() * length);
      const cell = filtered[index];
      const indexOfPlayed = [...all].indexOf(cell);
      console.log([...all][indexOfPlayed] === cell);
      console.log(index, cell, indexOfPlayed);
      const randomRow = Math.floor(indexOfPlayed / 10);
      const randomCol = indexOfPlayed % 10;
      try {
        const result = computer.board.receiveAttack(randomRow, randomCol);
        console.log(result);
        if (result === "isSunk") {
          cell.classList.add("hit");
          cell.classList.add("hites");
          alert("Computer wins!");
          return;
        } else if (result === "hit") {
          cell.classList.add("hit");
          cell.classList.add("hites");
        } else if (result === "miss") {
          cell.classList.add("miss");
          cell.classList.add("misses");
        }
        checkShipBoard(randomRow, randomCol, result);
      } catch (err) {
        console.error(err);
      } finally {
        moon();
      }
    }
  }
  setInterval(() => {
    robot();
  }, 1000);
}

function checkShipBoard(r, c, result) {
  const all = document.querySelectorAll(".child-c");
  const index = r * 10 + c;
  if (result === "hit") {
    all[index].classList.add("hit");
  } else if (result === "miss") {
    all[index].classList.add("miss");
  }
}

export function resetComputerBoard() {
  // Clear the board containers
  first.innerHTML = "";
  third.innerHTML = "";

  // Reset the human player instance
  computer = new Computer("mac");

  // Recreate the boards
  renderBoard();
  playBoard();
}

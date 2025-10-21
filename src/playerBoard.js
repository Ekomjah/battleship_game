import moon, { isHumanTurn } from "./state.js";
import { HumanPlayer, Computer } from "./ship.js";

export let human = new HumanPlayer("ekom");

const root = document.querySelector("#root");
const second = document.createElement("div");
second.classList.add("border");
const third = document.createElement("div");
third.classList.add("border");
root.appendChild(second);
root.appendChild(third);

export default function grid() {
  renderBoard();
  playBoard();
}

function renderBoard() {
  for (let i = 0; i < human.board.board.length; i++) {
    const gridParent = document.createElement("div");
    gridParent.classList.add("parent");
    gridParent.classList.add("div");
    second.appendChild(gridParent);
    for (let j = 0; j < human.board.board[i].length; j++) {
      const gridChild = document.createElement("div");
      gridChild.classList.add("child-player");

      gridParent.appendChild(gridChild);

      try {
        human.board.placeShipFrom(4, 0, "horizontal", "carrier", 5);
        human.board.placeShipFrom(5, 6, "horizontal", "battleship", 4);
        human.board.placeShipFrom(0, 4, "vertical", "cruiser", 3);
        human.board.placeShipFrom(6, 0, "vertical", "submarine", 3);
        human.board.placeShipFrom(9, 4, "horizontal", "destroyer", 2);
        human.board.receiveAttack(4, 0);
        human.board.receiveAttack(4, 1);
        human.board.receiveAttack(4, 2);
        human.board.receiveAttack(4, 3);
        human.board.receiveAttack(4, 4);
        human.board.receiveAttack(4, 5);
        human.board.receiveAttack(5, 6);
        human.board.receiveAttack(5, 7);
        human.board.receiveAttack(5, 8);
        // human.board.receiveAttack(5, 9);
        human.board.receiveAttack(0, 4);
        human.board.receiveAttack(1, 4);
        human.board.receiveAttack(2, 4);
        human.board.receiveAttack(6, 0);
        human.board.receiveAttack(7, 0);
        human.board.receiveAttack(8, 0);
        human.board.receiveAttack(9, 4);
        human.board.receiveAttack(9, 5);

        for (let k = 0; k < human.board.board.length; k++) {
          const childDivs = gridParent.children;
          const childDiv = childDivs[k];

          if (
            human.board.board[i][k] !== null &&
            human.board.board[i][k] !== "miss" &&
            human.board.board[i][k] !== "hit"
          ) {
            childDiv.classList.add("ship");
          } else if (human.board.board[i][k] === "hit") {
            childDiv.classList.add("hit");
          } else if (human.board.board[i][k] === "miss") {
            childDiv.classList.add("miss");
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
}

function playBoard() {
  for (let i = 0; i < human.board.board.length; i++) {
    const gridParent = document.createElement("div");
    gridParent.classList.add("parent");
    third.appendChild(gridParent);
    for (let j = 0; j < human.board.board[i].length; j++) {
      const gridChild = document.createElement("div");
      gridChild.classList.add("child");

      for (let k = 0; k < human.board.board.length; k++) {
        const childDivs = gridParent.children;
        const childDiv = childDivs[k];
        if (human.board.board[i][k] === "hit" && childDiv !== undefined) {
          childDiv.classList.add("hites");
        } else if (
          human.board.board[i][k] === "miss" &&
          childDiv !== undefined
        ) {
          childDiv.classList.add("misses");
        }
      }

      gridParent.appendChild(gridChild);
    }
  }

  const all = document.querySelectorAll(".child");

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
      const length = filtered.length - 1;
      const index = Math.floor(Math.random() * length);
      const cell = filtered[index];
      const indexOfPlayed = [...all].indexOf(cell);
      console.log([...all][indexOfPlayed] === cell);
      console.log(index, cell, indexOfPlayed);
      const randomRow = Math.floor(indexOfPlayed / 10);
      const randomCol = Math.floor(indexOfPlayed % 10);
      try {
        const result = human.board.receiveAttack(randomRow, randomCol);
        if (result === "isSunk") {
          cell.classList.add("hit");
          human = new HumanPlayer();
          renderBoard();
          alert("OMG SUnk");
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
  const all = document.querySelectorAll(".child-player");
  const index = r * 10 + c;
  if (result === "hit") {
    all[index].classList.add("hit");
  } else if (result === "miss") {
    all[index].classList.add("miss");
  }
}

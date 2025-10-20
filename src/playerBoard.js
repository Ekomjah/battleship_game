import moon, { isHumanTurn } from "./state.js";
import { HumanPlayer, Computer } from "./ship.js";

const human = new HumanPlayer("ekom");
const root = document.querySelector("#root");
const second = document.createElement("div");
second.classList.add("border");
const third = document.createElement("div");
third.classList.add("border");
root.appendChild(second);
root.appendChild(third);

export default function grid() {
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
  playBoard();
}

function playBoard() {
  for (let i = 0; i < human.board.board.length; i++) {
    const gridParent = document.createElement("div");
    gridParent.classList.add("parent");
    third.appendChild(gridParent);
    for (let j = 0; j < human.board.board[i].length; j++) {
      const gridChild = document.createElement("div");
      gridChild.classList.add("child");
      gridParent.appendChild(gridChild);
    }
  }

  const all = document.querySelectorAll(".child");

  function robot() {
    if (!isHumanTurn()) {
      const randomRow = Math.floor(Math.random() * 10);
      const randomCol = Math.floor(Math.random() * 10);
      try {
        console.log(isHumanTurn());
        const result = human.board.receiveAttack(randomRow, randomCol);
        const index = randomRow * 10 + randomCol;
        const cell = all[index];
        console.log(cell);
        if (result === "hit") {
          cell.classList.add("hit");
        } else if (result === "miss") {
          cell.classList.add("miss");
        }
        checkShipBoard(randomRow, randomCol, result);
      } catch (err) {
        console.error(err);
      } finally {
        moon();
      }
    }
  }
  const interval = setInterval(() => {
    robot();
  }, 1000);

  interval.clearInterval();
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

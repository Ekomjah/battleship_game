import moon, { isHumanTurn, resetAll } from "./state.js";
import { HumanPlayer, Computer } from "./ship.js";

let human = new HumanPlayer("ekom");

const root = document.querySelector("#root");
const second = document.createElement("div");
second.classList.add("border");
const third = document.createElement("div");
third.classList.add("border");
second.style.display = "none";
root.appendChild(second);
root.appendChild(third);

const btn = document.createElement("button");
const randombtn = document.createElement("button");
randombtn.textContent = "Randomly place ships";
randombtn.classList.add("btn");
randombtn.style.background = "blue";
randombtn.style.color = "white";
btn.classList.add("btn");
btn.textContent = "Reset Board";
root.appendChild(btn);
root.appendChild(randombtn);

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
      gridChild.classList.add("human");
      gridParent.appendChild(gridChild);
    }
  }

  const all = document.querySelectorAll(".human");
  all.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (isHumanTurn()) {
        const row = Math.floor(index / 10);
        const col = index % 10;
        if (
          !cell.classList.contains("miss") &&
          !cell.classList.contains("hit")
        ) {
          try {
            const result = human.board.receiveAttack(row, col);
            if (result === "isSunk") {
              checkShipBoard(row, col, result);
              alert("You won punk!");
              console.log(human.board);
              return;
            } else if (result === "hit") {
              cell.classList.add("hit");
            } else if (result === "miss") {
              cell.classList.add("miss");
            }
            checkShipBoard(row, col, result);
          } catch (err) {
            console.error(err);
          } finally {
            moon();
          }
        }
      }
    });
  });
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

export function reset() {
  // Clear the board containers
  second.innerHTML = "";
  third.innerHTML = "";

  // Reset the human player instance
  human = new HumanPlayer("ekom");

  // Recreate the boards
  renderBoard();
  playBoard();
}

btn.addEventListener("click", resetAll);

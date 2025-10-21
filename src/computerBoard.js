import moon, { isHumanTurn } from "./state.js";
import { HumanPlayer, Computer } from "./ship.js";
import { human } from "./playerBoard.js";
let computer = new Computer();
const root = document.querySelector("#root");
const first = document.createElement("div");
const third = document.createElement("div");
root.appendChild(first);
first.classList.add("border");
third.classList.add("border");
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

export default function computerGrid() {
  renderBoard();
  playBoard();
}

function renderBoard() {
  for (let i = 0; i < computer.board.board.length; i++) {
    const gridParent = document.createElement("div");
    gridParent.classList.add("parent");
    first.appendChild(gridParent);
    for (let j = 0; j < computer.board.board[i].length; j++) {
      const gridChild = document.createElement("div");
      gridChild.classList.add("child-c");

      gridParent.appendChild(gridChild);

      try {
        // Place ships horizontally and vertically
        computer.board.placeShipFrom(4, 0, "horizontal", "carrier", 5);
        computer.board.placeShipFrom(5, 6, "horizontal", "battleship", 4);
        computer.board.placeShipFrom(0, 4, "vertical", "cruiser", 3); // Vertical placement
        computer.board.placeShipFrom(6, 0, "vertical", "submarine", 3); // Vertical placement
        computer.board.placeShipFrom(9, 4, "horizontal", "destroyer", 2);
        computer.board.receiveAttack(4, 0);
        computer.board.receiveAttack(4, 1);
        computer.board.receiveAttack(4, 2);
        computer.board.receiveAttack(4, 3);
        computer.board.receiveAttack(4, 4);
        computer.board.receiveAttack(4, 5);
        computer.board.receiveAttack(5, 6);
        computer.board.receiveAttack(5, 7);
        computer.board.receiveAttack(0, 4);
        computer.board.receiveAttack(1, 4);
        computer.board.receiveAttack(2, 4);
        computer.board.receiveAttack(6, 0);
        computer.board.receiveAttack(7, 0);
        computer.board.receiveAttack(8, 0);
        computer.board.receiveAttack(9, 4);
        computer.board.receiveAttack(9, 5);

        for (let k = 0; k < computer.board.board.length; k++) {
          const childDivs = gridParent.children;
          const childDiv = childDivs[k];
          if (
            computer.board.board[i][k] !== null &&
            computer.board.board[i][k] !== "miss" &&
            computer.board.board[i][k] !== "hit"
          ) {
            childDiv.classList.add("ship");
          } else if (computer.board.board[i][j] === "miss") {
            gridChild.classList.add("miss");
          } else if (computer.board.board[i][j] === "hit") {
            gridChild.classList.add("hit");
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
      gridChild.classList.add("computer");
      gridParent.appendChild(gridChild);
    }
  }

  const all = document.querySelectorAll(".computer");
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
            const result = computer.board.receiveAttack(row, col);
            console.log(result);
            if (result === "isSunk") {
              checkShipBoard(row, col, result);
              alert("You won punk!");
              reset();
              // computer.board.board = computer.board.init();

              console.log(computer.board);
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
  const all = document.querySelectorAll(".child-c");
  const index = r * 10 + c;
  if (result === "hit") {
    all[index].classList.add("hit");
  } else if (result === "miss") {
    all[index].classList.add("miss");
  }
}

function reset() {
  const all = document.querySelectorAll(".child");
  const board = document.querySelectorAll(".child-c");
  all.forEach((el) => {
    if (el.classList.contains("hit") || el.classList.contains("miss")) {
      el.classList.remove("hit");
      el.classList.remove("miss");
    }
  });
  board.forEach((el) => {
    if (el.classList.contains("hit") || el.classList.contains("miss")) {
      el.classList.remove("hit");
      el.classList.remove("miss");
      el.classList.remove("ship");
    }
  });

  computer.board.placeShipFrom(4, 0, "horizontal", "carrier", 5);
  computer.board.placeShipFrom(5, 6, "horizontal", "battleship", 4);
  computer.board.placeShipFrom(0, 4, "vertical", "cruiser", 3); // Vertical placement
  computer.board.placeShipFrom(6, 0, "vertical", "submarine", 3); // Vertical placement
  computer.board.placeShipFrom(9, 4, "horizontal", "destroyer", 2);
}

btn.addEventListener("click", reset);

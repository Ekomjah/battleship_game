import { HumanPlayer, Computer } from "./ship.js";
const human = new HumanPlayer("ekom");
const root = document.querySelector("#root");
const second = document.createElement("div");
second.classList.add("border");
root.appendChild(second);
export default function grid() {
  for (let i = 0; i < human.board.board.length; i++) {
    const gridParent = document.createElement("div");
    gridParent.classList.add("parent");
    second.appendChild(gridParent);
    for (let j = 0; j < human.board.board[i].length; j++) {
      const gridChild = document.createElement("div");
      gridChild.classList.add("child");

      gridParent.appendChild(gridChild);

      try {
        // Place ships horizontally and vertically
        human.board.placeShipFrom(4, 0, "horizontal", "carrier", 5);
        human.board.placeShipFrom(5, 6, "horizontal", "battleship", 4);
        human.board.placeShipFrom(0, 4, "vertical", "cruiser", 3); // Vertical placement
        human.board.placeShipFrom(6, 0, "vertical", "submarine", 3); // Vertical placement
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
          } else if (human.board.board[i][j] === "miss") {
            childDiv.classList.add("miss");
          } else if (human.board.board[i][j] === "hit") {
            childDiv.classList.add("hit");
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  const all = document.querySelectorAll(".child");
  all.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      const row = Math.floor(index / 10);
      const col = index % 10;
      try {
        const result = human.board.receiveAttack(row, col);
        if (result === "hit") {
          cell.classList.add("hit");
        } else if (result === "miss") {
          cell.classList.add("miss");
        }
      } catch (err) {
        console.error(err);
      }
    });
  });
  //   human.board.board.forEach((el, i) => {
  //     human.board.board[i].forEach((item, j) => {
  //       console.log(`board[${i}][${j}] = ${item}`);
  //     });
  //   });
}

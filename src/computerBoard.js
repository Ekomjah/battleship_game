import { HumanPlayer, Computer } from "./ship.js";
const computer = new Computer("mac");
const root = document.querySelector("#root");
const first = document.createElement("div");
root.appendChild(first);
first.classList.add("border")
export default function computerGrid() {
  for (let i = 0; i < computer.board.board.length; i++) {
    const gridParent = document.createElement("div");
    gridParent.classList.add("parent");
    first.appendChild(gridParent);
    for (let j = 0; j < computer.board.board[i].length; j++) {
      const gridChild = document.createElement("div");
      gridChild.classList.add("child");

      gridParent.appendChild(gridChild);

      try {
        // Place ships horizontally and vertically
        computer.board.placeShipFrom(4, 0, "horizontal", "carrier", 5);
        computer.board.placeShipFrom(5, 6, "horizontal", "battleship", 4);
        computer.board.placeShipFrom(0, 4, "vertical", "cruiser", 3); // Vertical placement
        computer.board.placeShipFrom(6, 0, "vertical", "submarine", 3); // Vertical placement
        computer.board.placeShipFrom(9, 4, "horizontal", "destroyer", 2);

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
        console.log(err);
      }
    }
  }
}

// //! DO NOT TOUCH THESE LINES
import "./styles.css";
import { HumanPlayer, Computer } from "./ship.js";
// //! DO NOT TOUCH THESE LINES
const root = document.querySelector("#root");
const human = new HumanPlayer("ekom");

for (let i = 0; i < human.board.board.length; i++) {
  const gridParent = document.createElement("div");
  gridParent.classList.add("parent");
  root.appendChild(gridParent);
  for (let j = 0; j < human.board.board[i].length; j++) {
    const gridChild = document.createElement("div");
    if (
      human.board.board[i][j] !== null &&
      human.board.board[i][j] !== "miss" &&
      human.board.board[i][j] !== "hit"
    ) {
      gridChild.classList.add("ship");
    }
    //  else {
    // }
    gridChild.classList.add("child");
    gridParent.appendChild(gridChild);
  }
}

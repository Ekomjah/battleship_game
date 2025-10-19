// //! DO NOT TOUCH THESE LINES
import "./styles.css";
import grid from "./playerBoard.js";
import computer from "./computerBoard.js";
// //! DO NOT TOUCH THESE LINES

// function grid() {
//   for (let i = 0; i < human.board.board.length; i++) {
//     const gridParent = document.createElement("div");
//     gridParent.classList.add("parent");
//     root.appendChild(gridParent);
//     for (let j = 0; j < human.board.board[i].length; j++) {
//       const gridChild = document.createElement("div");
//       gridChild.classList.add("child");

//       gridParent.appendChild(gridChild);

//       gridChild.addEventListener("click", () => {
//         try {
//           const orien = "vertical";
//           human.board.placeShipFrom(i, j, orien, "battle");
//           for (let k = 0; k < human.board.board.length; k++) {
//             const childDivs = gridParent.children;
//             if (orien === "vertical") {
//               const firstEl = gridParent.children[j];
//               if (
//                 human.board.board[i][j] !== null &&
//                 human.board.board[i][j] !== "miss" &&
//                 human.board.board[i][j] !== "hit"
//               ) {
//                 console.log(human.board.board[i][k]);
//                 firstEl.classList.add("ship");
//               }
//             }
//             const childDiv = childDivs[k];
//             if (
//               human.board.board[i][k] !== null &&
//               human.board.board[i][k] !== "miss" &&
//               human.board.board[i][k] !== "hit"
//             ) {
//               console.log(human.board.board[i][k]);
//               childDiv.classList.add("ship");
//             } else if (human.board.board[i][j] === "miss") {
//               gridChild.classList.add("miss");
//             } else if (human.board.board[i][j] === "hit") {
//               gridChild.classList.add("hit");
//             }
//           }
//         } catch (err) {
//           alert("Inadequate space");
//         }
//       });
//     }
//   }
// }

grid();
computer();

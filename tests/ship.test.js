import { Ship, GameBoard, HumanPlayer, Computer } from "./code.js";

let ship = new Ship(5, 0, false);

describe("class ship tests", () => {
  it("zero hits", () => {
    expect(ship.hits).toBe(0);
    ship.hit();
    ship.hit();
    ship.hit();
  });
  it("hits count", () => {
    expect(ship.hits).toBe(3);
    expect(ship.sink).toBeFalsy();
    expect(ship.isSunk()).toBeFalsy();
  });

  it("isSunk", () => {
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(5);
    expect(ship.isSunk()).toBe(true);
  });
});
describe("GameBoard tests", () => {
  describe("placeShips Horizontal", () => {
    let board;
    beforeEach(() => {
      board = new GameBoard();
    });
    it("should place ship at (4, 0) and update the array", () => {
      expect(board.placeShipFrom(4, 0, "horizontal").length).toBe(10);
      expect(
        board.board[4].slice(0, 5).every((el) => el === "war")
      ).toBeTruthy();
      expect(board.board[4].slice(5).every((el) => !el)).toBeTruthy();
    });

    it("should place ship at (10, 0) and update the array(expected: error)", () => {
      expect(
        () => board.placeShipFrom(10, 0, "horizontal")[10].length
      ).toThrow();
      expect(() =>
        board.board[10].slice(0, 5).every((el) => el === "war")
      ).toThrow();
      expect(() => board.board[10].slice(5).every((el) => !el)).toThrow();
      expect(board.board).toHaveLength(10);
    });

    it("should place ship at (0, 0) and update the array", () => {
      expect(board.placeShipFrom(0, 0, "horizontal")[0].length).toBe(10);
      expect(
        board.board[0].slice(0, 5).every((el) => el === "war")
      ).toBeTruthy();
      expect(board.board[0].slice(5).every((el) => !el)).toBeTruthy();
    });

    it("should place ship at (6, 4) and update the array", () => {
      expect(board.placeShipFrom(6, 4, "horizontal").length).toBe(10);
      expect(
        board.board[6].slice(4, 9).every((el) => el === "war")
      ).toBeTruthy();
      expect(
        [...board.board[6].slice(9), ...board.board[6].slice(0, 4)].every(
          (el) => el !== "war"
        )
      ).toBeTruthy();
    });

    it("should handle edge cases properly", () => {
      expect(() => board.placeShipFrom(6, 5, "horizontal")).toThrow(/space/);
      expect(
        board.board[6].slice(4, 9).every((el) => el === "war")
      ).toBeFalsy();
      expect(
        [...board.board[6].slice(9), ...board.board[6].slice(0, 4)].every(
          (el) => el !== "war"
        )
      ).toBeTruthy();
    });

    it("should return 'out of bonds' for an overfilled board", () => {
      expect(() => board.placeShipFrom(6, 7, "horizontal")).toThrow(
        /not enough space/
      );
      board.board.forEach((arr) => {
        expect(arr.every((el) => el === null)).toBeTruthy();
      });
    });
  });

  describe("placeShips Vertically", () => {
    let board;
    let v = "vertical";
    beforeEach(() => {
      board = new GameBoard();
    });
    it("should fill board correctly for 0, 0", () => {
      expect(typeof board.placeShipFrom(0, 0, v)).toMatch(/obj/);
      expect(board.board[0]).toContain("war");
      expect(board.board[1]).toContain("war");
      expect(board.board[2]).toContain("war");
      expect(board.board[3]).toContain("war");
      expect(board.board[4]).toContain("war");
      expect(board.board[6]).not.toContain("war");
      expect(board.board[5]).not.toContain("war");
      expect(board.board[0].slice(1).every((el) => !el)).toBeTruthy();
      expect(board.board[1].slice(1).every((el) => !el)).toBeTruthy();
      expect(board.board[2].slice(1).every((el) => !el)).toBeTruthy();
      expect(board.board[3].slice(1).every((el) => !el)).toBeTruthy();
      expect(board.board[4].slice(1).every((el) => !el)).toBeTruthy();
      // ? remaining boards
      expect(board.board[5].slice(0).every((el) => !el)).toBeTruthy();
      expect(board.board[6].slice(0).every((el) => !el)).toBeTruthy();
      expect(board.board[7].slice(0).every((el) => !el)).toBeTruthy();
      expect(board.board[8].slice(0).every((el) => !el)).toBeTruthy();
      expect(board.board[9].slice(0).every((el) => !el)).toBeTruthy();
    });

    it("should fill board correctly for 3, 2", () => {
      expect(typeof board.placeShipFrom(3, 2, v)).toMatch(/obj/);
      board.board.forEach((el, i) => {
        if (i > 2 && i < 8) {
          expect(el[2]).toContain("war");
        } else {
          expect(el[2]).toBeNull();
        }
      });

      board.board.forEach((row) => {
        row.forEach((cell, j) => {
          if (j !== 2) {
            expect(cell).toBeNull();
          }
        });
      });
    });

    it("should work for all 'inbound' values", () => {
      expect(typeof board.placeShipFrom(4, 1, v)).toMatch(/obj/);
      board.board.forEach((el, i) => {
        if (i > 3 && i < 9) {
          expect(el[1]).toContain("war");
        } else {
          expect(el[1]).toBeNull();
        }
      });
      board.board.forEach((row) => {
        row.forEach((cell, j) => {
          if (j !== 1) {
            expect(cell).toBeNull();
          }
        });
      });
    });

    it("should handle edge cases", () => {
      expect(() => board.placeShipFrom(6, 3, v)).toThrow(v);
      board.board.forEach((el, i) => {
        expect(el[i]).toBeNull();
      });
    });
  });
});

describe("human play", () => {
  const v = "vertical";
  const hor = "horizontal";
  const human = new HumanPlayer("player");
  it("should place the carrier ship", () => {
    human.board.placeShipFrom(3, 2, v, "carrier", 5);
    human.board.board.forEach((el, i) => {
      if (i > 2 && i < 8) {
        expect(el[2]).toContain("carrier");
      } else {
        expect(el[2]).toBeNull();
      }
    });

    human.board.board.forEach((row) => {
      row.forEach((cell, j) => {
        if (j !== 2) {
          expect(cell).toBeNull();
        }
      });
    });
  });

  it("should add the battleship", () => {
    human.board.placeShipFrom(2, 4, hor, "battleship", 4);
    human.board.board.forEach((el, i) => {
      if (i > 2 && i < 8) {
        expect(el[2]).toContain("carrier");
      } else {
        expect(el[2]).toBeNull();
      }
    });

    human.board.board[2].forEach((cell, j) => {
      if (j > 3 && j < 8) {
        expect(cell).toMatch("battleship");
      } else {
        expect(cell).toBeNull();
      }
    });
  });

  it("should receive an attack", () => {
    expect(human.board.receiveAttack(3, 2)).toMatch("hit");
    expect(human.board.receiveAttack(3, 2)).toBeNull();
    expect(human.board.receiveAttack(4, 2)).toMatch("hit");
    expect(human.board.receiveAttack(5, 2)).toMatch("hit");
    expect(human.board.receiveAttack(7, 8)).toMatch("miss");
    expect(human.board.receiveAttack(9, 9)).toMatch("miss");
    expect(human.board.receiveAttack(9, 9)).toBeNull();
    expect(human.board.receiveAttack(2, 4)).toMatch("hit");
    expect(human.board.receiveAttack(2, 5)).toMatch("hit");
    expect(human.board.receiveAttack(2, 6)).toMatch("hit");
    expect(human.board.receiveAttack(2, 7)).toMatch("hit");
    expect(human.board.receiveAttack(2, 8)).toMatch("miss");
  });
});

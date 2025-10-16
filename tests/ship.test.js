import { Ship, GameBoard, Counter } from "../src/ship.js";

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

    it("should place ship at (6, 4) and update the array", () => {
      expect(board.placeShipFrom(6, 2, "horizontal").length).toBe(10);
      expect(
        board.board[6].slice(2, 7).every((el) => el === "war")
      ).toBeTruthy();
      expect(board.board[4].slice(5).every((el) => !el)).toBeTruthy();
    });

    it("should return 'out of bonds' for an overfilled board", () => {
      expect(board.placeShipFrom(6, 7, "horizontal")).toMatch(
        /not enough space/
      );
      board.board.forEach((arr) => {
        expect(arr.every((el) => el === null)).toBeTruthy();
      });
    });
  });
});

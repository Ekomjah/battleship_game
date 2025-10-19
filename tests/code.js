export class Ship {
  constructor(length, hits, name = "ship") {
    this.length = length;
    this.hits = hits;
    this.sink = this.isSunk();
    this.name = name;
  }

  hit() {
    return (this.hits += 1);
  }

  isSunk() {
    return this.length <= this.hits;
  }
}

export class GameBoard {
  constructor() {
    this.board = this.init();
    this.instance = [];
  }

  init() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr[i] = [];
      for (let j = 0; j < 10; j++) {
        arr[i][j] = null;
      }
    }
    return arr;
  }
  placeShipFrom(ordinate, abscissa, orientation, name = "war", shipLength = 5) {
    let ship = new Ship(shipLength, 0, name);
    if (orientation === "horizontal") {
      if (this.board[ordinate].length - abscissa > ship.length) {
        for (let i = abscissa; i < abscissa + ship.length; i++) {
          this.board[ordinate][i] = ship.name;
        }
        this.instance.push(ship);
        return this.board;
      } else {
        throw new Error("not enough space for" + orientation);
      }
    } else {
      if (this.board.length - ordinate > ship.length) {
        for (let i = ordinate; i < ordinate + ship.length; i++) {
          this.board[i][abscissa] = ship.name;
        }
        this.instance.push(ship);
        return this.board;
      } else {
        throw new Error("not enough space for " + orientation);
      }
    }
  }

  receiveAttack(ordinate, abscissa) {
    if (
      this.board[ordinate][abscissa] === "hit" ||
      this.board[ordinate][abscissa] === "miss"
    )
      return null;
    if (this.board[ordinate][abscissa] !== null) {
      const el = this.instance.find(
        (obj) => obj.name === this.board[ordinate][abscissa]
      );
      if (!el.isSunk()) {
        el.hit();
        this.board[ordinate][abscissa] = "hit";
        return "hit";
      }
      return "isSunk";
    } else {
      return (this.board[ordinate][abscissa] = "miss");
    }
  }
}

export class HumanPlayer {
  constructor(name) {
    this.name = name;
    this.board = new GameBoard();
  }
}

export class Computer {
  constructor(name) {
    this.name = name;
    this.board = new GameBoard();
  }
}

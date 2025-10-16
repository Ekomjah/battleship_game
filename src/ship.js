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
  placeShipFrom(ordinate, abscissa, orientation) {
    let ship = new Ship(5, 0, "war");
    if (orientation === "horizontal") {
      if (this.board[ordinate].length - abscissa > ship.length) {
        for (let i = abscissa; i < abscissa + ship.length; i++) {
          this.board[ordinate][i] = ship.name;
        }
        return this.board;
      } else {
        return "not enough space for" + orientation;
      }
    } else {
      if (this.board.length - abscissa > ship.length) {
        for (let i = abscissa; i < ship.length; i++) {
          this.board[i][0] = ship.name;
        }
        return this.board;
      } else {
        return "not enough space for " + orientation;
      }
    }
  }
}

export class Counter {
  constructor() {
    this.count = 0;
  }

  add() {
    this.count += 1;
  }
}

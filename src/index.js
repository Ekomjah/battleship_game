// //! DO NOT TOUCH THESE LINES
// import "./styles.css";
// //! DO NOT TOUCH THESE LINES

export class Ship {
  constructor(length, hits, isSunk) {
    this.length = length;
    this.hits = hits;
    this.isSunk = isSunk;
  }

  hit() {
    return (this.hits += 1);
  }

  isSunk() {
    return this.length <= this.hits;
  }
}

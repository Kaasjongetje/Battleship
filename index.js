import Ship from "./ship.js";
import Board from "./board.js";

const ship = new Ship(3);
const board = new Board();

console.log(ship.size)
console.log(board.tiles.length);
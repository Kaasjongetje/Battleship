import Ship from "./ship.js";
import Board from "./board.js";

const ship = new Ship(2, 'vertical');
const ship2 = new Ship(3, 'horizontal');
const board = new Board();

board.place(ship, [0, 0]);

board.print();
console.log(board.canPlace(ship2, [4, 0]));


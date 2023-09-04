import Board from "../../board.js";
import Ship from "../../ship.js";

const board = new Board();
const ship = new Ship(3, 'horizontal');

board.place(ship, [0, 0]);

test('Returnt het schip', () => {
    expect(board.getShip([0, 0])).toEqual(ship);
});

test('Returnt null bij geen schip', () => {
    expect(board.getShip([5, 5])).toEqual(null);
});
import Ship from "../ship.js";
import Board from "../board.js";

const board = new Board();
const ship = new Ship(3, 'vertical');

test('Returnt false bij illegale locaties', () => {
    expect(board.canPlace(ship, [0, 0])).toBe(false);
});

test('Returnt true bij legale, vrije locaties', () => {
    expect(board.canPlace(ship, [2, 0])).toBe(true);
});

test('Returnt false bij legale, bezette locaties', () => {
    board.tiles[0][0].ship = 1; // Tile bezet maken
    expect(board.canPlace(ship, [2, 0])).toBe(false);
});
import Ship from "../ship.js";
import Board from "../board.js";

const board = new Board();
const ship = new Ship(2, 'vertical');
const ship2 = new Ship(3, 'horizontal');

// Het schip eerst plaatsen
board.place(ship, [1, 0]);

// Het schip weer weghalen
board.remove(ship);

test('De locatie is weer null', () => {
    expect(ship.location).toEqual(null);
});

test('De eerste tile is weer leeg', () => {
    expect(board.tiles[1][0].ship).toEqual(null);
});

test('De tweede tile is ook weer leeg', () => {
    expect(board.tiles[0][0].ship).toEqual(null);
});

test('Schip 2 canPlace returnt nu true', () => {
    expect(board.canPlace(ship2, [0, 0])).toBe(true);
});
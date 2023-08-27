import Ship from "../ship.js";
import Board from "../board.js";

const board = new Board();
const ship = new Ship(2, 'horizontal');
const ship2 = new Ship(5, 'vertical');
const ship3 = new Ship(3, 'horizontal');

// Schip plaatsen
board.place(ship, [0, 0]);

test('De eerste tile behoort bij het schip', () => {
    expect(board.tiles[0][0].ship).toEqual(ship);
});

test('De tweede tile behoort bij het schip', () => {
    expect(board.tiles[0][1].ship).toEqual(ship);
});

test('De derde tile behoort niet bij het schip', () => {
    expect(board.tiles[0][2].ship).toEqual(null);
});

test('Je kunt het verticale schip nu niet over de andere plaatsen', () => {
    expect(board.canPlace(ship2, [4, 0])).toBe(false);
});

test('Je kunt een ander horizontaal schip niet eroverheen plaatsen', () => {
    expect(board.canPlace(ship3, [0, 1])).toBe(false);
});

test('Je kunt een ander horizontaal schip er wel naast zetten', () => {
    expect(board.canPlace(ship3, [0, 2])).toBe(true);
});


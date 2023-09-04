import Board from "../../board.js";
import Ship from "../../ship.js";

const board = new Board();

board.attack([0, 0]);

test('De eerste tile is nu aangevallen', () => {
    expect(board.tiles[0][0].attacked).toBe(true);
});

test('Nog even kijken of je hem nu niet nog eens kunt aanvallen', () => {
    expect(board.canAttack([0, 0])).toBe(false);
});

test('Schepen moeten gehit worden', () => {
    const ship = new Ship(2, 'horizontal');
    board.place(ship, [0, 0]);
    board.attack([0, 1]);
    expect(ship.hits).toEqual(1);
});

test('Schepen moeten gehit worden', () => {
    const ship = new Ship(2, 'horizontal');
    board.place(ship, [2, 0]);
    board.attack([2, 0]);
    board.attack([2, 1]);
    expect(ship.isSunk()).toBe(true);
});


import Board from "../board.js";

const board = new Board();

board.attack([0, 0]);

test('De eerste tile is nu aangevallen', () => {
    expect(board.tiles[0][0].attacked).toBe(true);
});

test('Nog even kijken of je hem nu niet nog eens kunt aanvallen', () => {
    expect(board.canAttack([0, 0])).toBe(false);
});
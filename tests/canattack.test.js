import Board from "../board.js";

const board = new Board();

test('Je kunt een niet geattackte tile aanvallen', () => {
    expect(board.canAttack([0, 0])).toBe(true);
});

test('Je kunt een geattackte tile niet aanvallen', () => {
    // Board tiles 0 0 aanpassen
    board.tiles[0][0].attacked = true;
    expect(board.canAttack([0, 0])).toBe(false);
});

test('Je kunt geen illegale locaties aanvallen', () => {
    expect(board.canAttack([-1, 0])).toBe(false);
});

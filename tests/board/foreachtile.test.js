import Board from "../../board.js";

test('Hij loopt over het hele bord', () => {
    const board = new Board();
    board.forEachTile((tile) => tile.attacked = true);
    expect(board.tiles[4][5].attacked).toBe(true);
    expect(board.tiles[2][1].attacked).toBe(true);
    expect(board.tiles[7][8].attacked).toBe(true);
});

test.skip('Hij loopt het aangegeven gebied', () => {
    const board = new Board();
    const callback = (tile) => tile.attacked = true;
    board.forEachTile(callback, [0, 0], [9, 7]);
    // Binnen de range
    expect(board.tiles[4][7].attacked).toBe(true);
    // Buiten de range
    expect(board.tiles[4][8].attacked).toBe(false);
});

test.skip('Hij returnt row en cell getallen', () => {
    const board = new Board();
    let number = 0;
    const callback = (tile, row, cell) => number = row + cell;
    board.forEachTile(callback, [1, 1], [1, 1]);
    expect(number).toEqual(2);
});
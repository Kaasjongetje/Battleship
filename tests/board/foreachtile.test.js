import Board from "../../board.js";

test('Hij loopt over het hele bord', () => {
    const board = new Board();
    Board.forEachTile(board.tiles, [0, 0,], [9, 9], (tile) => tile.attacked = true);
    expect(board.tiles[4][5].attacked).toBe(true);
    expect(board.tiles[2][1].attacked).toBe(true);
    expect(board.tiles[7][8].attacked).toBe(true);
});

test('Hij loopt het aangegeven gebied', () => {
    const board = new Board();
    const callback = (tile) => tile.attacked = true;
    Board.forEachTile(board.tiles,[0, 0], [9, 7], callback);
    // Binnen de range
    expect(board.tiles[4][7].attacked).toBe(true);
    // Buiten de range
    expect(board.tiles[4][8].attacked).toBe(false);
});

test('Hij returnt row en cell getallen', () => {
    const board = new Board();
    let number = 0;
    const callback = (tile, row, cell) => number = row + cell;
    Board.forEachTile(board.tiles, [1, 1], [1, 1], callback);
    expect(number).toEqual(2);
});
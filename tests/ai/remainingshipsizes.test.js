import Board from "../../board.js";
import AI from "../../ai.js";

const board = new Board();
const ai = new AI(board);

test('Returnt alle groottes zonder duplicates', () => {
    expect(ai.getRemainingShipSizes()).toEqual([2, 3, 4, 5]);
});

test('Filtert gezonken schepen eruit', () => {
    board.ships[0].hits = 2;
    board.ships[3].hits = 4; 
    expect(ai.getRemainingShipSizes()).toEqual([3, 5]);
});
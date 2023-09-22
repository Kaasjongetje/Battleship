import Board from "../../board.js";

test('Returnt de adjacent locaties van een tile', () => {
    expect(Board.getAdjacentLocations([4, 4])).toEqual([
        [4, 5],
        [4, 3],
        [5, 4],
        [3, 4]
    ]);
});

test('Returnt de adjacent locaties van een tile ook al zijn ze illegaal', () => {
    expect(Board.getAdjacentLocations([9, 8])).toEqual([
        [9, 9],
        [9, 7],
        [10, 8],
        [8, 8],
    ]);
});
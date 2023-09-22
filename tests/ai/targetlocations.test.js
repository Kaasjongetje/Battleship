import Board from "../../board.js";
import Ship from "../../ship.js";
import AI from "../../ai.js";

test('Hij returnt geen dubbele locaties', () => {
    const board = new Board();
    const ai = new AI(board);

    // [2, 3] is hier dubbel
    ai.shipLocations.push([2, 2]);
    ai.shipLocations.push([2, 4]);

    expect(ai.getTargetLocations()).toEqual([
        [2, 3],
        [2, 1],
        [3, 2],
        [1, 2],
        [2, 5],
        [3, 4],
        [1, 4]
    ]);
});

test('Hij returnt geen illegale locaties', () => {
    const board = new Board();
    const ai = new AI(board);

    ai.shipLocations.push([9, 9]);

    expect(ai.getTargetLocations()).toEqual([
        [9, 8],
        [8, 9]
    ]);
});

test('Hij returnt geen locaties die al aangevallen zijn', () => {
    const board = new Board();
    const ai = new AI(board);

    const ship = new Ship(3);
    const ship2 = new Ship(2);
    ship2.hits = 999;

    board.tiles[3][3].ship = ship;
    board.tiles[3][4].ship = ship;
    board.tiles[3][5].ship = ship2;

    board.tiles[3][3].attacked = true;
    board.tiles[3][4].attacked = true;
    board.tiles[3][5].attacked = true;

    ai.shipLocations.push([3, 3]);
    ai.shipLocations.push([3, 4]);

    const targetLocations = ai.getTargetLocations();
    console.log(targetLocations)

    expect(targetLocations).toEqual([
        [3, 2],
        [4, 3],
        [2, 3],
        [4, 4],
        [2, 4]
    ]);
});
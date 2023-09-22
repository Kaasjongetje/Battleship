import Board from "../../board.js";
import Ship from "../../ship.js";

test('Hij gaat naar rechts', () => {
    expect(Board.getNeighbouringLocation([2, 3], Ship.DIRECTIONS['horizontal']))
    .toEqual([2, 4]);
});

test('Hij gaat naar onder', () => {
    expect(Board.getNeighbouringLocation([9, 3], Ship.DIRECTIONS['vertical']))
    .toEqual([10, 3]);
});

test('Hij gaat naar links', () => {
    expect(Board.getNeighbouringLocation([6, 4], Ship.getOppositeDirection('horizontal')))
    .toEqual([6, 3]);
});

test('Hij gaat naar boven', () => {
    expect(Board.getNeighbouringLocation([3, 7], Ship.getOppositeDirection('vertical')))
    .toEqual([2, 7]);
});
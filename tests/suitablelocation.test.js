import Ship from "../ship.js";
import Board from "../board.js";

const board = new Board();
const ship = new Ship(3, 'vertical');

test('Een legale locatie returnt true als desirable ook true returnt', () => {
    expect(board.isSuitableLocation([2, 0]), (tile) => !tile.isOccupied())
    .toBe(true);
});

test('Een illegale locatie returnt altijd false', () => {
    expect(board.isSuitableLocation([-1, 12]) , (tile) => true)
    .toBe(false);
});

test('Een legale locatie returnt false wanneer niet gewenst', () => {
    board.tiles[0][0].ship = 1; // Ship naar iets anders dan null zetten
    expect(board.isSuitableLocation([0, 0]), (tile) => !tile.isOccupied())
    .toBe(false);
    board.tiles[0][0].ship = null; // Ship weer naar null zetten
});

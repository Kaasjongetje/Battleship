import Board from "../board.js";
import Ship from "../ship.js";

test('Kijkt of alle schepen gezonken zijn', () => {
    const board = new Board();

    board.ships.forEach((ship) => ship.hits = 5);

    expect(board.allShipsSunk()).toBe(true);
});

test('Zegt false als niet alle schepen gezonken zijn', () => {
    const board = new Board();

    // Hier zinkt alleen de Carrier (5) niet
    board.ships.forEach((ship) => ship.hits = 4);

    expect(board.allShipsSunk()).toBe(false);
});
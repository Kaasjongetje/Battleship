import Board from "../board.js";
import Ship from "../ship.js";

test('Kijkt of alle schepen gezonken zijn', () => {
    const board = new Board();

    const ship = new Ship(3, 'vertical');
    const ship2 = new Ship(2, 'vertical');

    ship.hits = 3;
    ship2.hits = 2;

    board.ships = [ship, ship2];
    expect(board.allShipsSunk()).toBe(true);
});

test('Zegt false als niet alle schepen gezonken zijn', () => {
    const board = new Board();

    const ship = new Ship(3, 'vertical');
    const ship2 = new Ship(2, 'vertical');

    ship.hits = 3;

    board.ships = [ship, ship2];
    expect(board.allShipsSunk()).toBe(false);
});
import Ship from "../../ship.js";

const horizontalShip = new Ship(2, 'horizontal');
const verticalShip = new Ship(3, 'vertical');

test('Returnt horizontale locaties', () => {
    expect(horizontalShip.getLocations([0, 0]))
    .toEqual([[0, 0], [0, 1]]);
});

test('Returnt verticale locaties', () => {
    expect(verticalShip.getLocations([3, 3]))
    .toEqual([[3, 3], [2, 3], [1, 3]]);
});

test('Returnt illegale horizontale locaties', () => {
    expect(horizontalShip.getLocations([0, 9]))
    .toEqual([[0, 9], [0, 10]]);
});

test('Returnt illegale verticale locaties', () => {
    expect(verticalShip.getLocations([0, 0]))
    .toEqual([[0, 0], [-1, 0], [-2, 0]]);
});
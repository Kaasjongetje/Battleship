import Ship from "../../ship.js";

test('Krijgt horizontale aangrenzende locaties', () => {
    const ship = new Ship(3, 'horizontal');
    expect(ship.getAdjacentLocations([1, 1])).toEqual([
        [1, 0],
        [1, 4],
        [0, 1],
        [2, 1],
        [0, 2],
        [2, 2],
        [0, 3],
        [2, 3]
    ]);
});

test('Krijgt horizontale aangrenzende locaties die illegaal zijn', () => {
    const ship = new Ship(2, 'horizontal');
    expect(ship.getAdjacentLocations([0, 7])).toEqual([
        [0, 6],
        [0, 9],
        [-1, 7],
        [1, 7],
        [-1, 8],
        [1, 8],
    ]);
});

test('Krijgt verticale locaties die aangrenzend zijn', () => {
    const ship = new Ship(5, 'vertical');
    expect(ship.getAdjacentLocations([4, 6])).toEqual([
        [3, 6],
        [9, 6],
        [4, 5],
        [4, 7],
        [5, 5],
        [5, 7],
        [6, 5],
        [6, 7],
        [7, 5],
        [7, 7],
        [8, 5],
        [8, 7]
    ]);
});

test('Krijgt verticale illegale locaties die aangrenzend zijn', () => {
    const ship = new Ship(4, 'vertical');
    expect(ship.getAdjacentLocations([6, 9])).toEqual([
        [5, 9], 
        [10, 9], 
        [6, 8],
        [6, 10],
        [7, 8],
        [7, 10],
        [8, 8],
        [8, 10],
        [9, 8],
        [9, 10]
    ]);
});
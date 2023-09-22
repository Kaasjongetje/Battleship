import Ship from "../../ship.js";

test('Krijgt max locatie van horizontale schepen', () => {
    const ship = new Ship(2, 'horizontal');
    expect(ship.getMaxLocation()).toEqual([9, 8]);
});

test('Krijgt de max locatie van verticale schepen', () => {
    const ship = new Ship(4, 'vertical');
    expect(ship.getMaxLocation()).toEqual([6, 9]);
});
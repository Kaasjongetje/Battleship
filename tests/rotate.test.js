import Ship from "../ship.js";

const ship = new Ship(3, 'horizontal');
const ship2 = new Ship(3, 'vertical');

test('Je kunt het schip van horizontaal naar verticaal doen', () => {
    ship.rotate();
    expect(ship.direction).toEqual('vertical');
});

test('Je kunt het schip van verticaal naar horizontaal doen', () => {
    ship2.rotate();
    expect(ship2.direction).toEqual('horizontal');
});

import Ship from "../../ship.js";

test('Returnt tegenovergestelde horizontale richting', () => {
    expect(Ship.getOppositeDirection('horizontal')).toEqual([0, -1]);
});

test('Returnt tegenovergestelde verticale richting', () => {
    expect(Ship.getOppositeDirection('vertical')).toEqual([-1, 0]);
});
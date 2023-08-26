import Board from "../board.js";

test('Is geldige locatie 1', () => {
    expect(Board.isValidLocation([0, 0])).toBe(true);
});

test('Is geldige locatie 2', () => {
    expect(Board.isValidLocation([0, 9])).toBe(true);
});

test('Is geldige locatie 3', () => {
    expect(Board.isValidLocation([9, 0])).toBe(true);
});

test('Is geldige locatie 4', () => {
    expect(Board.isValidLocation([9, 9])).toBe(true);
});

test('Detecteert ongeldige locaties 1', () => {
    expect(Board.isValidLocation([-1, 9])).toBe(false);
});

test('Detecteert ongeldige locaties 1', () => {
    expect(Board.isValidLocation([0, -1])).toBe(false);
});

test('Detecteert ongeldige locaties 1', () => {
    expect(Board.isValidLocation([0, 10])).toBe(false);
});

test('Detecteert ongeldige locaties 1', () => {
    expect(Board.isValidLocation([10, 0])).toBe(false);
});
const { isStringAnInteger } = require('../../src/utils/util');

test('trueCaseForisStringAnInteger', () => {
    expect(isStringAnInteger('24')).toBe(true);
});

test('falseCaseForisStringAnInteger1', () => {
    expect(isStringAnInteger('number')).toBe(false);
});

test('falseCaseForisStringAnInteger2', () => {
    expect(isStringAnInteger(null)).toBe(false);
});

test('falseCaseForisStringAnInteger3', () => {
    expect(isStringAnInteger('5hj214')).toBe(false);
});
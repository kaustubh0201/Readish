const { keysCommand } = require('../../src/commands/keys');
const { getAllKeys } = require('../../src/storage/store');
const { writeError } = require('../../src/utils/error');
const { write } = require('../../src/utils/message');

jest.mock('../../src/storage/store');
jest.mock('../../src/utils/error');
jest.mock('../../src/utils/message');

describe('keysCommand', () => {
    let connection;

    beforeEach(() => {
        connection = {
            write: jest.fn()
        };

        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test('errorForTooManyArguments', () => {
        const reply = ['keys', 'pattern', 'extra'];
        
        keysCommand(reply, connection);

        expect(writeError).toHaveBeenCalledWith(connection, 'ERR too many arguments');
        expect(getAllKeys).not.toHaveBeenCalled();
        expect(write).not.toHaveBeenCalled();
    });

    test('matchKeyBasedOnPattern', () => {
        const reply = ['keys', 'key*'];
        const keys = ['key1', 'key2', 'anotherKey'];
        getAllKeys.mockReturnValue(keys);

        keysCommand(reply, connection);

        const expectedResponse = `*2\r\n$4\r\nkey1\r\n$4\r\nkey2\r\n`;
        expect(getAllKeys).toHaveBeenCalledTimes(1);
        expect(write).toHaveBeenCalledWith(connection, expectedResponse);
        expect(writeError).not.toHaveBeenCalled();
    });

    test('noMatchesIfPatternNoMatch', () => {
        const reply = ['keys', 'nomatch*'];
        const keys = ['key1', 'key2', 'anotherKey'];
        getAllKeys.mockReturnValue(keys);

        keysCommand(reply, connection);

        const expectedResponse = `*0\r\n`;
        expect(getAllKeys).toHaveBeenCalledTimes(1);
        expect(write).toHaveBeenCalledWith(connection, expectedResponse);
        expect(writeError).not.toHaveBeenCalled();
    });

    test('handleEmptyListKeys', () => {
        const reply = ['keys', 'key*'];
        const keys = [];
        getAllKeys.mockReturnValue(keys);

        keysCommand(reply, connection);

        const expectedResponse = `*0\r\n`;
        expect(getAllKeys).toHaveBeenCalledTimes(1);
        expect(write).toHaveBeenCalledWith(connection, expectedResponse);
        expect(writeError).not.toHaveBeenCalled();
    });
});

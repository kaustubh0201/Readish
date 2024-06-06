const { getCommand } = require('../../src/commands/get');
const { writeNullMessage, bulkStringMessage } = require('../../src/utils/message');
const { getValArray } = require('../../src/storage/store');

jest.mock('../../src/utils/message');
jest.mock('../../src/storage/store');

describe('getCommand', () => {
    let connection;

    beforeEach(() => {
        connection = {
            write: jest.fn()
        };

        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test('bulkStringMessageIfExists', () => {
        const reply = ['get', 'key1'];
        const value = 'value1';

        getValArray.mockReturnValue([value]);

        getCommand(reply, connection);

        expect(getValArray).toHaveBeenCalledWith('key1');
        expect(bulkStringMessage).toHaveBeenCalledWith(connection, value);
        expect(writeNullMessage).not.toHaveBeenCalled();
    });

    test('nullMessageIfKeyNotExist', () => {
        const reply = ['get', 'key1'];

        getValArray.mockReturnValue(null);

        getCommand(reply, connection);

        expect(getValArray).toHaveBeenCalledWith('key1');
        expect(writeNullMessage).toHaveBeenCalledWith(connection);
        expect(bulkStringMessage).not.toHaveBeenCalled();
    });

    test('nullMessageForNoValue', () => {
        const reply = ['get', 'key1'];

        getValArray.mockReturnValue([]);

        getCommand(reply, connection);

        expect(getValArray).toHaveBeenCalledWith('key1');
        expect(writeNullMessage).toHaveBeenCalledWith(connection);
        expect(bulkStringMessage).not.toHaveBeenCalled();
    });
});

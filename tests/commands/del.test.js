const { delCommand } = require('../../src/commands/del');
const { removeFromStoreAndRemoveTimer } = require('../../src/storage/store');
const { writeInteger } = require('../../src/utils/message');

jest.mock('../../src/storage/store');
jest.mock('../../src/utils/message');

describe('delCommand', () => {
    let connection;

    beforeEach(() => {
        connection = {
            write: jest.fn()
        };

        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test('deleteKeysAndReturnCount', () => {
        const reply = ['del', 'key1', 'key2', 'key3'];
        
        removeFromStoreAndRemoveTimer.mockImplementation((key) => key !== 'key2');

        delCommand(reply, connection);

        expect(removeFromStoreAndRemoveTimer).toHaveBeenCalledTimes(3);
        expect(removeFromStoreAndRemoveTimer).toHaveBeenCalledWith('key1');
        expect(removeFromStoreAndRemoveTimer).toHaveBeenCalledWith('key2');
        expect(removeFromStoreAndRemoveTimer).toHaveBeenCalledWith('key3');
        expect(writeInteger).toHaveBeenCalledWith(connection, 2);
    });

    test('noKeysDeleted', () => {
        const reply = ['del', 'key1', 'key2'];
        removeFromStoreAndRemoveTimer.mockReturnValue(false);

        delCommand(reply, connection);

        expect(removeFromStoreAndRemoveTimer).toHaveBeenCalledTimes(2);
        expect(writeInteger).toHaveBeenCalledWith(connection, 0);
    });

    test('handleEmptyList', () => {
        const reply = ['del'];

        delCommand(reply, connection);

        expect(removeFromStoreAndRemoveTimer).not.toHaveBeenCalled();
        expect(writeInteger).toHaveBeenCalledWith(connection, 0);
    });
});
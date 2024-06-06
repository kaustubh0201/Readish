const { setCommand } = require('../../src/commands/set');
const { removeFromStore, setInStore, checkKeyAvailable, getTimeoutIdFromKey, clearTimeoutId } = require('../../src/storage/store');
const { writeSyntaxError, writeError } = require('../../src/utils/error');
const { isStringAnInteger } = require('../../src/utils/util');
const { writeOkayMessage, writeNullMessage } = require('../../src/utils/message');

jest.mock('../../src/storage/store');
jest.mock('../../src/utils/error');
jest.mock('../../src/utils/util');
jest.mock('../../src/utils/message');

describe('setCommand', () => {
    let connection;

    beforeEach(() => {
        connection = {
            write: jest.fn()
        };

        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test('should return an error if too many arguments are provided', () => {
        const reply = ['set', 'key', 'value', 'EX', '10', 'XX', 'NX'];
        
        setCommand(reply, connection);

        expect(writeError).toHaveBeenCalledWith(connection, 'ERR too many arguments');
    });

    test('should return a syntax error if invalid options are provided', () => {
        const reply = ['set', 'key', 'value', 'INVALID_OPTION'];
        
        isStringAnInteger.mockReturnValue(false);
        setCommand(reply, connection);

        expect(writeSyntaxError).toHaveBeenCalledWith(connection);
    });

    test('should set a key without options and return OK', () => {
        const reply = ['set', 'key', 'value'];
        
        setCommand(reply, connection);

        expect(setInStore).toHaveBeenCalledWith('key', 'value', null);
        expect(writeOkayMessage).toHaveBeenCalledWith(connection);
    });

    test('should return null if NX option is provided and key exists', () => {
        const reply = ['set', 'key', 'value', 'NX'];

        checkKeyAvailable.mockReturnValue(true);

        setCommand(reply, connection);

        expect(writeNullMessage).toHaveBeenCalledWith(connection);
    });

    test('should set a key with NX option if the key does not exist', () => {
        const reply = ['set', 'key', 'value', 'NX'];

        checkKeyAvailable.mockReturnValue(false);

        setCommand(reply, connection);

        expect(setInStore).toHaveBeenCalledWith('key', 'value', null);
        expect(writeOkayMessage).toHaveBeenCalledWith(connection);
    });

    test('should return null if XX option is provided and key does not exist', () => {
        const reply = ['set', 'key', 'value', 'XX'];

        checkKeyAvailable.mockReturnValue(false);

        setCommand(reply, connection);

        expect(writeNullMessage).toHaveBeenCalledWith(connection);
    });

    test('should set a key with XX option if the key exists', () => {
        const reply = ['set', 'key', 'value', 'XX'];

        checkKeyAvailable.mockReturnValue(true);

        setCommand(reply, connection);

        expect(setInStore).toHaveBeenCalledWith('key', 'value', null);
        expect(writeOkayMessage).toHaveBeenCalledWith(connection);
    });

    test('should return a syntax error if both NX and XX options are provided', () => {
        const reply = ['set', 'key', 'value', 'NX', 'XX'];

        setCommand(reply, connection);

        expect(writeSyntaxError).toHaveBeenCalledWith(connection);
    });

    test('should return a syntax error if both EX and PX options are provided', () => {
        const reply = ['set', 'key', 'value', 'EX', '10', 'PX', '1000'];

        setCommand(reply, connection);

        expect(writeError).toHaveBeenCalledWith(connection, 'ERR too many arguments');
    });

    test('should return a syntax error if KEEPTTL and EX or PX are provided simultaneously', () => {
        const reply = ['set', 'key', 'value', 'KEEPTTL', 'EX', '10'];

        setCommand(reply, connection);

        expect(writeSyntaxError).toHaveBeenCalledWith(connection);
    });

    test('should return a syntax error if multiple integers are provided in options', () => {
        const reply = ['set', 'key', 'value', 'EX', '10', '20'];

        isStringAnInteger.mockReturnValue(true);

        setCommand(reply, connection);

        expect(writeSyntaxError).toHaveBeenCalledWith(connection);
    });

    test('should return a syntax error if an integer is present without EX or PX', () => {
        const reply = ['set', 'key', 'value', '10'];

        isStringAnInteger.mockReturnValue(true);

        setCommand(reply, connection);

        expect(writeSyntaxError).toHaveBeenCalledWith(connection);
    });
});
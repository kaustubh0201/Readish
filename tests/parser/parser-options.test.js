const { returnReply, returnError } = require('../../src/parser/parser-options');
const { setCommand } = require('../../src/commands/set');
const { getCommand } = require('../../src/commands/get');
const { pingCommand } = require('../../src/commands/ping');
const { delCommand } = require('../../src/commands/del');
const { keysCommand } = require('../../src/commands/keys');
const { writeError } = require('../../src/utils/error');

jest.mock('../../src/commands/set');
jest.mock('../../src/commands/get');
jest.mock('../../src/commands/ping');
jest.mock('../../src/commands/del');
jest.mock('../../src/commands/keys');
jest.mock('../../src/utils/error');

describe('returnReply', () => {
    let connection;

    beforeEach(() => {
        connection = {
            write: jest.fn()
        };
    });

    test('callingSetCommand', () => {
        const reply = ['set', 'key', 'value'];
        returnReply(reply, connection);
        expect(setCommand).toHaveBeenCalledWith(reply, connection);
    });

    test('callingGetCommand', () => {
        const reply = ['get', 'key'];
        returnReply(reply, connection);
        expect(getCommand).toHaveBeenCalledWith(reply, connection);
    });

    test('callingPingCommand', () => {
        const reply = ['ping'];
        returnReply(reply, connection);
        expect(pingCommand).toHaveBeenCalledWith(connection);
    });

    test('callingDelCommand', () => {
        const reply = ['del', 'key'];
        returnReply(reply, connection);
        expect(delCommand).toHaveBeenCalledWith(reply, connection);
    });

    test('callingKeysCommand', () => {
        const reply = ['keys', '*'];
        returnReply(reply, connection);
        expect(keysCommand).toHaveBeenCalledWith(reply, connection);
    });

    test('writeErrorForUnknownCommand', () => {
        const reply = ['unknown'];
        returnReply(reply, connection);
        expect(writeError).toHaveBeenCalledWith(connection, 'ERR cmd not found');
    });
});

describe('returnError', () => {
    test('writeErrorWithProvidedError', () => {
        const connection = {
            write: jest.fn()
        };
        const err = 'Some error';
        returnError(err, connection);
        expect(writeError).toHaveBeenCalledWith(connection, err);
    });
});

const { pingCommand } = require('../../src/commands/ping');

describe('pingCommand', () => {
    let connection;

    beforeEach(() => {
        connection = {
            write: jest.fn()
        };
    });

    test('should write "+PONG\\r\\n" to the connection', () => {
        pingCommand(connection);
        expect(connection.write).toHaveBeenCalledWith('+PONG\r\n');
    });
});

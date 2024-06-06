const { RedisParser } = require('../../src/parser/redis-parser');

describe('RedisParser', () => {
    let mockConnection;
    let mockReturnReply;
    let mockReturnError;
    let parser;

    beforeEach(() => {
        mockConnection = {};
        mockReturnReply = jest.fn();
        mockReturnError = jest.fn();

        parser = new RedisParser({
            connection: mockConnection,
            returnReply: mockReturnReply,
            returnError: mockReturnError
        });
    });

    test('callReturnReplyWithCorrectData', () => {
        const data = "*2\r\n$3\r\nredis\r\n$3\r\nparser\r\n";
        parser.execute(data);

        expect(mockReturnReply).toHaveBeenCalledWith(['redis', 'parser'], mockConnection);
    });

    test('callReturnErrorWhenCmdNotFound', () => {
        const data = "+OK\r\n";
        parser.execute(data);

        expect(mockReturnError).toHaveBeenCalledWith('ERR cmd not found', mockConnection);
    });

    test('callForEmptyArray', () => {
        const data = "*0\r\n";
        parser.execute(data);

        expect(mockReturnReply).toHaveBeenCalledWith([], mockConnection);
    });
});
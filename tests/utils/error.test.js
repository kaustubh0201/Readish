const {
    writeSyntaxError,
    writeError
} = require('../../src/utils/error');

const mockConnection = {
    write: jest.fn()
};

test('checkWriteSyntaxError', () => {
    writeSyntaxError(mockConnection);
    expect(mockConnection.write).toHaveBeenCalledWith(`-ERR syntax error\r\n`);
});

test('checkWriteError', () => {
    const err = 'Error';
    writeError(mockConnection, err);
    
    expect(mockConnection.write).toHaveBeenCalledWith(`-${err}\r\n`);
});
const { 
    writeNullMessage,
    writeOkayMessage,
    bulkStringMessage,
    writeInteger,
    write
 } = require('../../src/utils/message');

const mockConnection = {
    write: jest.fn()
};

const mssg = 'message';
const nullMssg = null;

test('checkWriteNullMessage', () => {
    writeNullMessage(mockConnection);
    expect(mockConnection.write).toHaveBeenCalledWith('$-1\r\n');
});

test('checkWriteOkayMessage', () => {
    writeOkayMessage(mockConnection);
    expect(mockConnection.write).toHaveBeenCalledWith(`+OK\r\n`);
});

test('checkBulkStringMessage', () => {
    bulkStringMessage(mockConnection, mssg);
    expect(mockConnection.write).toHaveBeenCalledWith(`$${mssg.length}\r\n${mssg}\r\n`);
});

test('checkWriteInteger', () => {
    const n = 4;
    writeInteger(mockConnection, n);
    expect(mockConnection.write).toHaveBeenCalledWith(`:${n}\r\n`);
});

test('checkWrite', () => {
    write(mockConnection, mssg);
    expect(mockConnection.write).toHaveBeenCalledWith(mssg);
});
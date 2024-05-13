const writeNullMessage = (connection) => {
    connection.write('$-1\r\n');
}

const writeOkayMessage = (connection) => {
    writeMessage(connection, 'OK');
}

const writeMessage = (connection, mssg) => {
    connection.write(`+${mssg}\r\n`);
}

const bulkStringMessage = (connection, mssg) => {
    connection.write(`$${mssg.length}\r\n${mssg}\r\n`);
}

const writeInteger = (connection, number) => {
    connection.write(`:${number}\r\n`);
}

module.exports = {
    writeOkayMessage,
    writeNullMessage,
    bulkStringMessage,
    writeInteger
};
const writeNullMessage = (connection) => {
    connection.write('$-1\r\n');
}

const writeOkayMessage = (connection) => {
    writeMessage(connection, 'OK');
}

const writeMessage = (connection, mssg) => {
    if (mssg == null) {
        console.log('Received null value');
        return;
    }
    connection.write(`+${mssg}\r\n`);
}

const bulkStringMessage = (connection, mssg) => {
    if (mssg == null) {
        console.log('Received null value');
        return;
    }

    connection.write(`$${mssg.length}\r\n${mssg}\r\n`);
}

const writeInteger = (connection, number) => {
    if (number == null) {
        console.log('Received null value');
        return;
    }
    connection.write(`:${number}\r\n`);
}

const write = (connection, mssg) => {
    if (mssg == null) {
        console.log('Received null value');
        return;
    }
    connection.write(mssg);
}

module.exports = {
    writeOkayMessage,
    writeNullMessage,
    bulkStringMessage,
    writeInteger,
    write
};
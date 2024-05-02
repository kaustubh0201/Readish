const writeOkayMessage = (connection) => {
    writeMessage(connection, 'OK');
}

const writeMessage = (connection, mssg) => {
    connection.write(`+${mssg}\r\n`);
}

module.exports = {
    writeOkayMessage
};
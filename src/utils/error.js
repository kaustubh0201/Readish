const writeSyntaxError = (connection) => {
    let err = 'ERR syntax error';
    writeError(connection, err);
}

const writeError = (connection, err) => {
    if (err == null) {
        console.log('Received null value');
        return;
    }
    connection.write(`-${err}\r\n`);
}

module.exports = {
    writeSyntaxError,
    writeError
};
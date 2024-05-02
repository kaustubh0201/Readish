const writeSyntaxError = (connection) => {
    let err = 'ERR syntax error';
    writeError(connection, err);
}

const writeError = (connection, err) => {
    connection.write(`-${err}\r\n`);
}

module.exports = {
    writeSyntaxError
};
const pingCommand = (connection) => {
    connection.write('+PONG\r\n');
};

module.exports = {
    pingCommand
};
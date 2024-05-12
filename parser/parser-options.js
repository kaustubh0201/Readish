const { setCommand } = require('../commands/set');
const { getCommand } = require('../commands/get');
const { pingCommand } = require('../commands/ping');
const { delCommand } = require('../commands/del');

const returnReply = (reply, connection) => {
    const command = reply[0];
    
    switch (command) {
        case 'set': setCommand(reply, connection);
        break;

        case 'get': getCommand(reply, connection);
        break;

        case 'ping': pingCommand(connection);
        break;

        case 'del': delCommand(reply, connection);
        break;

        default: {
            let err = 'ERR cmd not found';
            connection.write(`-${err}\r\n`);
        }
    }
};

const returnError = (err) => {
    connection.write(`-${err}\r\n`);
};

module.exports = {
    returnReply,
    returnError
};
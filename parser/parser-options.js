const { store } = require('../storage/store');
const { setCommand } = require('../commands/set');
const { getCommand } = require('../commands/get');
const { pingCommand } = require('../commands/ping');

const returnReply = (reply, connection) => {
    const command = reply[0];
    
    switch (command) {
        case 'set': setCommand(store, reply, connection);
        break;

        case 'get': getCommand(store, reply, connection);
        break;

        case 'ping': pingCommand(connection);
        break;

        default: {
            let err = 'Command Not Found! Please try again!';
            connection.write(`$${err.length}\r\n${err}\r\n`);
        }
            
    }
};

const returnError = (err) => {
    connection.write(`$${err.length}\r\n${err}\r\n`);
    console.log('=>', err);
};

module.exports = {
    returnReply,
    returnError
};
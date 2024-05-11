const { writeNullMessage, bulkStringMessage } = require('../utils/message');

const getCommand = (store, reply, connection) => {
    const key = reply[1];
    let value = store[key];
    if (value) {
        value = store[key][0];
    }
    if (!value) writeNullMessage(connection);
    else bulkStringMessage(connection, value);
};

module.exports = {
    getCommand
};
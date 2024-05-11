const { writeNullMessage, bulkStringMessage } = require('../utils/message');

const getCommand = (store, reply, connection) => {
    const key = reply[1];
    const value = store[key];
    if (!value) writeNullMessage(connection);
    else bulkStringMessage(connection, value);
};

module.exports = {
    getCommand
};
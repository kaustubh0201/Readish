const { writeNullMessage, bulkStringMessage } = require('../utils/message');
const { getValArray } = require('../storage/store');

const getCommand = (reply, connection) => {
    const key = reply[1];
    let value = getValArray(key);
    if (value) {
        value = value[0];
    }
    if (!value) writeNullMessage(connection);
    else bulkStringMessage(connection, value);
};

module.exports = {
    getCommand
};
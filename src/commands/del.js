const { removeFromStoreAndRemoveTimer } = require('../storage/store');
const { writeInteger } = require('../utils/message');

const delCommand = (reply, connection) => {
    let delCount = 0;

    for (let i = 1; i < reply.length; i++) {
        if (removeFromStoreAndRemoveTimer(reply[i])) {
            delCount += 1;
        }
    }

    writeInteger(connection, delCount);
};

module.exports = {
    delCommand
};
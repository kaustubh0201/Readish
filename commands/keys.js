const { getAllKeys } = require('../storage/store');
const { writeError } = require('../utils/error');
const { write } = require('../utils/message');

const keysCommand = (reply, connection) => {
    if (reply.length > 2) {
        writeError(connection, 'ERR too many arguments');
        return;
    }

    const keys = getAllKeys();
    const pattern = new RegExp(reply[1]);

    let matched = '';
    let matchedLen = 0;

    for (let i = 0; i < keys.length; i++) {
        if (pattern.test(keys[i])) {
            matchedLen += 1;
            matched += `$${keys[i].length}\r\n${keys[i]}\r\n`;
        }
    }

    matched = `*${matchedLen}\r\n` + matched;
    write(connection, matched);
    
};

module.exports = {
    keysCommand
}
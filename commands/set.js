const { removeFromStore } = require('../storage/store');
const { writeSyntaxError } = require('../utils/error');
const { isStringAnInteger } = require('../utils/util');
const { writeOkayMessage } = require('../utils/message');

const setCommand = (store, reply, connection) => {
    const key = reply[1];
    const value = reply[2];
    store[key] = value;

    const setOpOptions = {};
    for (let i = 2; i <= reply.length / 2; i++) {
        setOpOptions[reply[2 * i - 1]] = reply[2 * i];
    }

    console.log(setOpOptions);

    if (Object.keys(setOpOptions).length === 0) {
        writeOkayMessage(connection);
        return;
    }

    if (setOpOptions['EX'] && setOpOptions['PX']) {
        writeSyntaxError(connection);
        return;
    }

    const timeOption = setOpOptions['EX'] ? 'EX' : setOpOptions['PX'] ? 'PX' : null;

    if (timeOption && isStringAnInteger(setOpOptions[timeOption])) {
        const time = parseInt(setOpOptions[timeOption], 10);
        setTimeout(removeFromStore, timeOption === 'EX' ? time * 1000 : time, key, store);
        writeOkayMessage(connection);
    } else {
        writeSyntaxError(connection);
    }
    
};

module.exports = {
    setCommand
};
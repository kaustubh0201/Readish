const setCommand = (store, reply, connection) => {
    const key = reply[1];
    const value = reply[2];
    store[key] = value;

    const setOpOptions = {};

    for (let i = 2; i <= reply.length / 2; i++) {
        setOpOptions[reply[2 * i - 1]] = reply[2 * i];
    }

    console.log(setOpOptions);

    if (setOpOptions['EX'] && setOpOptions['PX']) {
        let err = '(error) ERR syntax error';
        connection.write(`$${err.length}\r\n${err}\r\n`);
    } else {
        if (setOpOptions['EX']) {
            setTimeout(removeFromStore, parseInt(setOpOptions['EX'], 10) * 1000, key, store);
        } else if (setOpOptions['PX']) {
            setTimeout(removeFromStore, parseInt(setOpOptions['PX'], 10), key, store);
        }

        connection.write('+OK\r\n');
    }
};

function removeFromStore (key, store) {
    delete store[key];
};

module.exports = {
    setCommand
};
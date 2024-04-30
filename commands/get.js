const getCommand = (store, reply, connection) => {
    const key = reply[1];
    const value = store[key];
    if (!value) connection.write('$-1\r\n');
    else connection.write(`$${value.length}\r\n${value}\r\n`);
};

module.exports = {
    getCommand
};
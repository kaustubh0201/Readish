const setCommand = (store, reply, connection) => {
    const key = reply[1];
    const value = reply[2];
    store[key] = value;
    connection.write('+OK\r\n');
};

module.exports = {
    setCommand
};
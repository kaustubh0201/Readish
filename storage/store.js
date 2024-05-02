const store = {};

function removeFromStore (key, store) {
    delete store[key];
};

module.exports = {
    store,
    removeFromStore
};
const store = {};

const removeFromStore = (key) => {
    delete store[key];
}

const removeFromStoreAndRemoveTimer = (key) => {
    const valArr = store[key];

    if (!valArr) {
        return false;
    }

    const timeoutId = valArr[1];
    
    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    delete store[key];

    return true;
}

const setInStore = (key, value, timeoutId) => {
    store[key] = [value, timeoutId];
}

const checkKeyAvailable = (key) => {
    return store.hasOwnProperty(key);
}

const getTimeoutIdFromKey = (key) => {
    const valArr = store[key];

    if (!valArr) {
        return null;
    }

    return valArr[1];
}

const clearTimeoutId = (key) => {
    const valArr = store[key];
    
    if (!valArr || !valArr[1]) {
        return;
    }

    clearTimeout(valArr[1]);

    store[key] = [valArr[0], null];
}

const getValArray = (key) => {
    return store[key];
}

module.exports = {
    store,
    removeFromStore,
    removeFromStoreAndRemoveTimer,
    setInStore,
    checkKeyAvailable,
    getTimeoutIdFromKey,
    clearTimeoutId,
    getValArray
};
const { removeFromStore, setInStore, checkKeyAvailable, getTimeoutIdFromKey, clearTimeoutId } = require('../storage/store');
const { writeSyntaxError, writeError } = require('../utils/error');
const { isStringAnInteger } = require('../utils/util');
const { writeOkayMessage, writeNullMessage } = require('../utils/message');

const EX = 'EX';
const PX = 'PX';
const NX = 'NX';
const XX = 'XX';
const KEEPTTL = 'KEEPTTL';

const setCommand = (reply, connection) => {

    const key = reply[1];
    const value = reply[2];

    if (reply.length > 6) {
        writeError(connection, 'ERR too many arguments');
        return;
    }

    if (!checkOptions(reply.slice(3))) {
        writeSyntaxError(connection);
        return;
    }

    const setOpOptions = {};
    for (let i = 3; i < reply.length; i++) {
        if (reply[i] === EX || reply[i] === PX) {
            setOpOptions[reply[i]] = reply[i + 1];
        } else {
            if (!isStringAnInteger(reply[i])) {
                setOpOptions[reply[i]] = true;
            }
        }
    }

    console.log(setOpOptions);

    if (Object.keys(setOpOptions).length === 0) {
        setInStore(key, value, null);
        writeOkayMessage(connection);
        return;
    }

    if (setOpOptions[NX] && setOpOptions[XX]) {
        writeSyntaxError(connection);
        return;
    }

    if (setOpOptions[EX] && setOpOptions[PX]) {
        writeSyntaxError(connection);
        return;
    }

    const timeOption = setOpOptions[EX] ? EX : setOpOptions[PX] ? PX : null;
    
    if (setOpOptions[NX] && checkKeyAvailable(key)) {
        writeNullMessage(connection);
        return;
    } else if (setOpOptions[XX] && !checkKeyAvailable(key)) {
        writeNullMessage(connection);
        return;
    } else {
        // case: when the timeout is changed 
        if (checkKeyAvailable(key) && getTimeoutIdFromKey(key) !== null && !setOpOptions[KEEPTTL]) {
            clearTimeoutId(key);
        }
        
        // logic for storing the key - value
        if (checkKeyAvailable(key) && setOpOptions[KEEPTTL]) {
            const presentTimeoutId = getTimeoutIdFromKey(key);
            setInStore(key, value, presentTimeoutId);
        } else {
            setInStore(key, value, null);
        }
        
        if (!timeOption) {
            writeOkayMessage(connection);
            return;
        }
    }

    if (timeOption && isStringAnInteger(setOpOptions[timeOption])) {
        const time = parseInt(setOpOptions[timeOption], 10);
        const timeoutId = setTimeout(removeFromStore, timeOption === EX ? time * 1000 : time, key);
        setInStore(key, value, timeoutId);
        writeOkayMessage(connection);
    }
    
};

const checkOptions = (reply) => {
    const validOptions = [NX, XX, EX, PX, KEEPTTL];

    let integerCounter = 0;
    let isEXPXPresent = false;
    let isKEEPTTLPresent = false;


    for (let i = 0; i < reply.length; i++) {

        // case: checking if the args in array are valid or not
        if (!isStringAnInteger(reply[i]) && !validOptions.includes(reply[i])) {
            return false;
        }

        if (reply[i] === KEEPTTL) {
            isKEEPTTLPresent = true;
        }

        // case: checking if the integer is only after the EX or PX as it is for time
        if (reply[i] === EX || reply[i] === PX) {
            isEXPXPresent = true;
            if (i + 1 >= reply.length) {
                return false;
            } else if (!isStringAnInteger(reply[i + 1])) {
                return false;
            }
        }
        
        // case: if integer in options is more than 1
        if (isStringAnInteger(reply[i])) {
            integerCounter = integerCounter + 1;
            if (integerCounter > 1) {
                return false;
            }
        }

        // case: if KEEPTTL and EX or PX is present simultaneously
        if (isEXPXPresent && isKEEPTTLPresent) {
            return false;
        }
        
        // case: EX or PX not present but integer present
        if (isEXPXPresent === false && integerCounter > 0) {
            return false;
        }
    }

    return true;

};

module.exports = {
    setCommand
};
const isStringAnInteger = (value) => {
    let intValue = parseInt(value, 10);
    return !isNaN(intValue) && intValue.toString() === value;
}

module.exports = {
    isStringAnInteger
};
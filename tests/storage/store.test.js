const {
    removeFromStore,
    setInStore,
    checkKeyAvailable,
    removeFromStoreAndRemoveTimer
} = require('../../src/storage/store');

jest.useFakeTimers();

describe('checkRemoveFromStore', () => {
    beforeEach(() => {
        setInStore('key1', 'value1', null);
        setInStore('key2', 'value2', null);
    });

    test('checkSetInStore', () => {
        expect(checkKeyAvailable('key2')).toBe(true);
    });

    test('removeSpecifiedKeyFromStore', () => {
        removeFromStore('key1');
        expect(checkKeyAvailable('key1')).toBe(false);
    });

    test('removeKeyThatDontExist', () => {
        removeFromStore('nonexistentKey');
        expect(checkKeyAvailable('nonexistentKey')).toBe(false);
    });
});

describe('checkRemoveFromStoreAndRemoveTimer', () => {
    let mockClearTimeout;

    beforeEach(() => {
        setInStore('key1', 'value1', setTimeout(() => {}, 1000));
        setInStore('key2', 'value2', setTimeout(() => {}, 1000));

        mockClearTimeout = jest.spyOn(global, 'clearTimeout'); 
    });

    afterEach(() => {
        jest.clearAllTimers();
        mockClearTimeout.mockRestore();
    });

    test('removeSpecifiedKeyWithTimer', () => {
        const keyToRemove = 'key1';
        removeFromStoreAndRemoveTimer(keyToRemove);
        expect(checkKeyAvailable(keyToRemove)).toBe(false);
    });

    test('removeKeyThatDontExist', () => {
        const result = removeFromStoreAndRemoveTimer('nonexistentkey');
        expect(result).toBe(false);
    });

    test('checkIfAssociatedTimeoutCleared', () => {
        const keyWithTimer = 'key1';
        removeFromStoreAndRemoveTimer(keyWithTimer);
        expect(mockClearTimeout).toHaveBeenCalledWith(expect.anything());
    });
});


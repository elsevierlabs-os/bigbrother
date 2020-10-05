export const deepGet = (key, obj) => {
    if (!obj) {
        throw new TypeError('Object must be specified');
    }

    const splitKey = typeof key === 'string' && key !== '' ? key.split('.') : [];

    if (splitKey.length === 1) {
        return obj[splitKey[0]];
    }

    const k = splitKey.shift();

    return obj[k] ? deepGet(splitKey.join('.'), obj[k]) : false;
};

export const deepSet = (key, value = {}, obj = {}) => {
    if (!key) {
        throw new TypeError('Key must be specified');
    }

    const splitKey = typeof key === 'string' && key !== '' ? key.split('.') : [];

    if (splitKey.length === 1) {
        obj[splitKey[0]] = value;
        return;
    }

    const k = splitKey.shift();

    obj[k] = obj[k] ? obj[k] : {};

    deepSet(splitKey.join('.'), value, obj[k]);

    return obj;
};

export const deepExist = (key, obj) => Boolean(deepGet(key, obj));

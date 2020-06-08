import inspect from 'object-inspect';

const formatString = (string, args) => {
    let index = 0;
    return string.replace(/%s/g, () => inspect(args[index++]))
};

class AssertionError extends Error {

    constructor(message, received, expected) {
        super(message);

        this.expected = expected;
        this.received = received;
    }
}

const assert = (condition, createMessage, ...extraArgs) => {
    if (condition)
        return;

    const message = (typeof createMessage === 'string')
        ? formatString(createMessage, extraArgs)
        : createMessage(extraArgs);

    throw new AssertionError(message, ...extraArgs);
};

export default assert;

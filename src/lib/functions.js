const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

const PromiseSerial = (promises = []) => {
    return promises.reduce((promiseChain, currentTask) => {
        return promiseChain.then(chainResults => currentTask().then(currentResult => [...chainResults, currentResult]));
    }, Promise.resolve([]));
};

export { AsyncFunction, PromiseSerial };

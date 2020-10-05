import fetch from 'node-fetch';
import { printInfo } from './printer';

export const pingEndpoint = (endpoint, maxRetries = 1, timeout = 0, count = 0) => {
    if (count > maxRetries)
        return Promise.reject({
            message: `Provided URL (${endpoint}) was unavailable after ${maxRetries} retries.`
        });

    const ping = () =>
        new Promise((resolve, reject) => {
            printInfo(`ping ${endpoint}`);
            setTimeout(() => {
                fetch(endpoint)
                    .then(() => {
                        printInfo(`${endpoint} is available`);
                        resolve();
                    })
                    .catch(reject);
            }, timeout);
        });

    return ping()
        .then(() => Promise.resolve())
        .catch(() => pingEndpoint(endpoint, maxRetries, timeout, count + 1));
};

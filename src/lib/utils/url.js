import { getConfig } from '../../config';

const ABSOLUTE_REGEX = /(http(s)?:\/\/[a-z]+[.]+[a-z]+\/?)/g;

export const isAbsoluteUrl = (url) => url.match(ABSOLUTE_REGEX);

export const buildUrl = (url) => {
    if (isAbsoluteUrl(url)) return url;

    const { baseUrl } = getConfig();
    return new URL(url, baseUrl).toString();
};

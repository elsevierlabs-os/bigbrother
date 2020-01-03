import fs from 'fs';
import path from 'path';
import { getConfig } from '../config';
import { RECORDING_EXT } from '../lib/constants';
import { printException } from '../lib/printer';
import {deepGet} from '../lib/objectutils';
import assert from '../expectations/assert';

const buildFileName = (name) => name.concat(RECORDING_EXT);
const buildRecordingFullPath = (name) => {
    const { recordingsPath } = getConfig();
    const filename = buildFileName(name);
    return path.join(recordingsPath, filename);
};

export const recordingExists = (page) => fs.existsSync(buildRecordingFullPath(page.name));
export const checkAndCreateRecordingFolder = () => {
    const { recordingsPath } = getConfig();

    try {
        if (!fs.existsSync(recordingsPath)) {
            fs.mkdirSync(recordingsPath, { recursive: true });
        }
        return true;
    } catch(e) {
        printException(e);
        return false;
    }
};

export const recordPage = (page) => {
    const fullPath = buildRecordingFullPath(page.name);
    const data = page.toJSON(0);

    if (checkAndCreateRecordingFolder()) {
        fs.writeFileSync(fullPath, data);
    }
};

export const getPageRecording = (page) => {
    const fullPath = buildRecordingFullPath(page.name);
    const raw = fs.readFileSync(fullPath);

    return JSON.parse(raw);
};

export const compareWithStoredRecording = (page) => {
    const baseRecording = getPageRecording(page);
    const { threshold } = getConfig();
    const data = page.toJSON(0);
    const json = JSON.parse(data);

    json.__keys.forEach(k => {
        const baseMeasurement = deepGet(k, baseRecording);
        const measurement = deepGet(k, json);

        const condition = (baseMeasurement.duration === 0) ||
            measurement.duration <= (baseMeasurement.duration * (1 + threshold));

        assert(condition,
            `Expected %s to be less than %s for ${k}`,
            measurement.duration,
            baseMeasurement.duration);
    });
};

import glob from 'glob';
import fs from 'fs';
import { getConfig } from '../config';
import { printError, printFilePatternError, printInfo } from './printer';

const NODE_MODULES_IGNORE_PATTERN = 'node_modules/**/*.*';

class FileReader {

    static getIgnoredFiles() {
        const { ignore } = getConfig();

        return [
            NODE_MODULES_IGNORE_PATTERN,
            ...ignore
        ];
    }

    static validateFileNames(filenames) {
        return filenames.length > 0;
    }

    static readFolderContent(folderPath, pattern, options = {}) {
        const globOptions = {
            cwd: folderPath,
            ...options
        };

        if (!pattern) {
            printFilePatternError(pattern);
            return Promise.reject();
        }

        return FileReader
            .getFiles(pattern, globOptions);
    }

    static readTestFiles() {
        const globOptions = {
            ignore: FileReader.getIgnoredFiles()
        };

        const { pattern } = getConfig();
        if (!pattern) {
            printFilePatternError(pattern);
            return Promise.reject();
        }

        return FileReader
            .getFiles(pattern, globOptions)
            .then(FileReader.onFilesFound);
    }

    static getFiles(pattern, globOptions) {
        return new Promise((resolve, reject) => {
            glob(pattern, globOptions, (err, filenames) => {
                if (err) {
                    printError(err);
                    reject(err);
                } else {
                    if (FileReader.validateFileNames(filenames)) {
                        resolve(filenames);
                    } else {
                        printFilePatternError(pattern);
                        reject();
                    }
                }
            });
        });
    }

    static readSingleFile(filename) {
        return new Promise((resolve, reject) => {
            fs.readFile(filename, 'utf8', (err, content) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ filename, content });
                }
            })
        });
    }

    static readFilesList(filenames) {
        printInfo('filenames', filenames);
        return Promise.all(filenames.map(FileReader.readSingleFile));
    }

    static onFilesFound(filenames) {
        const suitesLabel = filenames.length > 1 ? 'suites' : 'suite';
        printInfo(`Found ${filenames.length} ${suitesLabel}`);

        return FileReader.readFilesList(filenames);
    }
}

export default FileReader;

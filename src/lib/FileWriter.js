import { printException } from './printer';
import fs from 'fs';
import path from 'path';
import replace from 'replace-in-file';

class FileWriter {
    static writeJSONToFile(json, destinationPath, shouldStringify = false) {
        let payload = json;
        if (shouldStringify) {
            payload = JSON.stringify(payload);
        }
        fs.writeFileSync(destinationPath, payload);
    }

    static copyFile(source, target) {
        const rd = fs.createReadStream(source);
        const wr = fs.createWriteStream(target);

        return new Promise((resolve, reject) => {
            rd.on('error', reject);
            wr.on('error', reject);
            wr.on('finish', resolve);
            rd.pipe(wr);
        }).catch(error => {
            rd.destroy();
            wr.end();
            throw error;
        });
    }

    static copyFiles(filenames, source, target) {
        const fullFileNames = filenames.map(name => ({
            source: path.join(source, name),
            target: path.join(target, name)
        }));
        const promises = fullFileNames.map(({ source, target }) => FileWriter.copyFile(source, target));

        return Promise.all(promises);
    }

    static checkAndCreateFolder(folderPath) {
        try {
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }
            return true;
        } catch (e) {
            printException(e);
            return false;
        }
    }

    static replaceStringInFile(file, sourceString, replacement) {
        const options = {
            files: file,
            from: sourceString,
            to: replacement
        };

        return replace(options);
    }
}

export default FileWriter;

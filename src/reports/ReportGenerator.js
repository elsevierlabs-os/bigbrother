import path from 'path';
import TestRunner from '../runner/TestRunner';
import { getConfig } from '../config';
import FileWriter from '../lib/FileWriter';
import FileReader from '../lib/FileReader';
import { printInfo } from '../lib/printer';
import {
    FULL_REPORT_FILENAME,
    REPORT_FILENAME_ROOT,
    REPORT_ABOUT_TO_GENERATE,
    REPORT_FILE_PATTERN,
    REPORT_FILENAME_EXTENSION,
    REPORT_FOLDER_ALREADY_EXISTS,
    REPORT_FOLDER_CREATED,
    REPORT_GENERATION_STARTED,
    REPORT_STATIC_FILES_FOLDER,
    REPORT_STATIC_FILES_ALL_PATTERN,
    REPORT_TARGET_STRING,
    REPORT_INDEX_HTML,
    REPORT_ABOUT_TO_OPEN,
    REPORT_CURRENT_REPORT_TARGET_STRING,
    REPORT_STATIC_FILES_NODE_MODULES,
    EMPTY,
    REPORT_OPEN_DISABLED
} from '../lib/constants';
import {
    executeTask,
    getEnvFlag,
    LOCAL_DEVELOPMENT_ENV_FLAG,
    TASKS
} from '../lib/utils/process';

class ReportGenerator {

    constructor() {
        this.pages = [];
        this.currentReport = {};
    }

    storePage(page) {
        const shouldStringify = false;
        const spacing = 0;
        const json = page.toJSON(spacing, shouldStringify);

        this.pages.push(json);
    }

    storeCurrentReport(report) {
        this.currentReport = report;
    }

    getCurrentReport() {
        return this.currentReport || {};
    }

    static buildTimeStamp() {
        const date = new Date();

        return `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
    }

    getReportFileName = () => {
        const timestamp = ReportGenerator.buildTimeStamp();

        return REPORT_FILENAME_ROOT
            .concat(timestamp)
            .concat(REPORT_FILENAME_EXTENSION);
    };

    getReportFolderPath = () => {
        const { cwd, reportPath } = getConfig();
        return path.join(cwd, reportPath);
    };

    getStaticFolderPath = (staticFolder) => {
        const { cwd } = getConfig();
        return path.join(
            cwd,
            getEnvFlag(LOCAL_DEVELOPMENT_ENV_FLAG) === 'true' ? EMPTY : REPORT_STATIC_FILES_NODE_MODULES,
            staticFolder
        );
    };

    getFullReportPathFromFilename = (name) => (
        path.join(this.getReportFolderPath(), name)
    );

    addFolderPathToReportFilenames = (files) => (
        Promise.resolve(files.map(this.getFullReportPathFromFilename))
    );

    getAllReports = () => {
        const reportPath = this.getReportFolderPath();
        const options = { ignore: [ FULL_REPORT_FILENAME ] };
        return FileReader
            .readFolderContent(reportPath, REPORT_FILE_PATTERN, options)
            .then(this.addFolderPathToReportFilenames)
            .then(FileReader.readFilesList);
    };

    generateCurrentReport = () => {
        return new Promise((resolve, reject) => {
            try {
                const payload = {
                    testRunner: TestRunner.toJSON(),
                    pages: this.pages,
                    config: getConfig()
                };
                this.storeCurrentReport(payload);
                const filename = this.getReportFileName();
                const fullPath = this.getFullReportPathFromFilename(filename);

                FileWriter.writeJSONToFile(payload, fullPath, true);
                resolve();
            } catch(e) {
                reject(e);
            }
        });
    };

    handleReportStaticFilesCopy = (filenames) => {
        const source = this.getStaticFolderPath(REPORT_STATIC_FILES_FOLDER);
        const target = this.getReportFolderPath();

        return FileWriter.copyFiles(filenames, source, target);
    };

    copyReportIndexHtmlToDestination() {
        if (FileWriter.checkAndCreateFolder(this.getReportFolderPath())) {
            printInfo(REPORT_FOLDER_CREATED);
            const staticFilesFolder = this.getStaticFolderPath(REPORT_STATIC_FILES_FOLDER);
            return FileReader
                .readFolderContent(staticFilesFolder, REPORT_STATIC_FILES_ALL_PATTERN)
                .then(this.handleReportStaticFilesCopy);
        }

        printInfo(REPORT_FOLDER_ALREADY_EXISTS);
        return Promise.resolve();
    }

    replaceReportInIndexHtml = json => (
        FileWriter.replaceStringInFile(
            this.getFullReportPathFromFilename(REPORT_INDEX_HTML),
            REPORT_TARGET_STRING,
            JSON.stringify(json))
    );

    replaceCurrentReportInIndexHtml = () => (
        FileWriter.replaceStringInFile(
            this.getFullReportPathFromFilename(REPORT_INDEX_HTML),
            REPORT_CURRENT_REPORT_TARGET_STRING,
            JSON.stringify(this.getCurrentReport()))
    );

    mapReportToJson = ({ content }) => JSON.parse(content);

    generateFullReport = (reports) => {
        return new Promise((resolve, reject) => {
            try {
                const json = { data: reports.map(this.mapReportToJson) };

                printInfo(REPORT_ABOUT_TO_GENERATE);
                FileWriter.writeJSONToFile(
                    json,
                    this.getFullReportPathFromFilename(FULL_REPORT_FILENAME),
                    true);
                resolve(json);
            } catch(e) {
                reject(e);
            }
        });
    };

    generateReport = () => {
        printInfo(REPORT_GENERATION_STARTED);
        return this.copyReportIndexHtmlToDestination()
            .then(this.generateCurrentReport)
            .then(this.getAllReports)
            .then(this.generateFullReport)
            .then(this.replaceReportInIndexHtml)
            .then(this.replaceCurrentReportInIndexHtml)
    };

    openReport = () => {
        const { openReport } = getConfig();

        if (openReport) {
            printInfo(REPORT_ABOUT_TO_OPEN);
            executeTask(TASKS.open, this.getFullReportPathFromFilename(REPORT_INDEX_HTML));
        } else {
            printInfo(REPORT_OPEN_DISABLED);
        }
    }

}

export default new ReportGenerator();

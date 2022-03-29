"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.USER_AGENTS = exports.UNDERSCORE = exports.TARGET_CHANGED_EVENT = exports.SPACE = exports.RUNNER_TERMINATION_MESSAGE = exports.RUNNER_STARTING_MESSAGE = exports.RUNNER_CLEANUP_MESSAGE = exports.RESOURCE_INFO_TYPE = exports.REPORT_TARGET_STRING = exports.REPORT_STATIC_FILES_NODE_MODULES = exports.REPORT_STATIC_FILES_FOLDER = exports.REPORT_STATIC_FILES_ALL_PATTERN = exports.REPORT_OPEN_DISABLED = exports.REPORT_INDEX_HTML = exports.REPORT_GENERATION_STARTED = exports.REPORT_FOLDER_CREATED = exports.REPORT_FOLDER_ALREADY_EXISTS = exports.REPORT_FILE_PATTERN = exports.REPORT_FILENAME_ROOT = exports.REPORT_FILENAME_EXTENSION = exports.REPORT_CURRENT_REPORT_TARGET_STRING = exports.REPORT_ABOUT_TO_OPEN = exports.REPORT_ABOUT_TO_GENERATE = exports.RECORDING_EXT = exports.PATTERN_DOESNT_MATCH_ERROR = exports.PAINT_INFO_TYPE = exports.PAGE_LOAD_OPTIONS = exports.PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR = exports.PAGEWRAPPER_MISSING_PAGE_ERROR = exports.NETWORK_RESPONSE_RECEIVED = exports.NETWORK_ENABLE = exports.NETWORK_DATA_RECEIVED = exports.NETWORK_CONDITIONS_MESSAGE = exports.NETWORK_ASSETS_MIMETYPES = exports.NETWORK = exports.NAVIGATION_INFO_TYPE = exports.FULL_STOP = exports.FULL_REPORT_MID = exports.FULL_REPORT_FILENAME = exports.ENV_FLAGS = exports.EMPTY = exports.CPU_CONDITIONS_MESSAGE = exports.CPU = exports.BROWSER_STARTING_MESSAGE = exports.BROWSER_NOT_INITIALISED = exports.BROWSER_CANT_OPEN_PAGE_MESSAGE = exports.BROWSER_CANT_CLOSE_MESSAGE = exports.ALL_SPACES = void 0;

var _package = _interopRequireDefault(require("../../package"));

var NETWORK = {
  WIFI: {
    offline: false,
    latency: 28,
    downloadThroughput: 5000000,
    uploadThroughput: 1000000
  },
  DSL: {
    offline: false,
    latency: 50,
    downloadThroughput: 1500000,
    uploadThroughput: 384000
  },
  SLOW3G: {
    offline: false,
    latency: 400,
    downloadThroughput: 400000,
    uploadThroughput: 400000
  },
  REG3G: {
    offline: false,
    latency: 300,
    downloadThroughput: 1600000,
    uploadThroughput: 768000
  },
  FAST3G: {
    offline: false,
    latency: 170,
    downloadThroughput: 1600000,
    uploadThroughput: 768000
  },
  REG4G: {
    offline: false,
    latency: 150,
    downloadThroughput: 9000000,
    uploadThroughput: 9000000
  },
  LTE: {
    offline: false,
    latency: 70,
    downloadThroughput: 12000000,
    uploadThroughput: 12000000
  },
  EDGE: {
    offline: false,
    latency: 840,
    downloadThroughput: 240000,
    uploadThroughput: 240000
  },
  REG2G: {
    offline: false,
    latency: 800,
    downloadThroughput: 280000,
    uploadThroughput: 256000
  },
  OFFLINE: {
    offline: true,
    latency: 10000,
    downloadThroughput: 0,
    uploadThroughput: 0
  }
};
exports.NETWORK = NETWORK;
var CPU = {
  DEFAULT: {
    rate: 1
  },
  SLOW_2: {
    rate: 2
  },
  SLOW_3: {
    rate: 3
  },
  SLOW_4: {
    rate: 4
  },
  SLOW_5: {
    rate: 5
  },
  SLOW_6: {
    rate: 6
  },
  SLOW_7: {
    rate: 7
  },
  SLOW_8: {
    rate: 8
  },
  SLOW_9: {
    rate: 9
  },
  SLOW_10: {
    rate: 10
  }
};
exports.CPU = CPU;
var USER_AGENTS = {
  MOBILE: {
    SAMSUNG_GALAXY_S9: 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36',
    SAMSUNG_GALAXY_S8: 'Mozilla/5.0 (Linux; Android 7.0; SM-G892A Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/60.0.3112.107 Mobile Safari/537.36',
    SAMSUNG_GALAXY_S7: 'Mozilla/5.0 (Linux; Android 7.0; SM-G930VC Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36',
    SAMSUNG_GALAXY_S7_EDGE: 'Mozilla/5.0 (Linux; Android 6.0.1; SM-G935S Build/MMB29K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36',
    SAMSUNG_GALAXY_S6: 'Mozilla/5.0 (Linux; Android 6.0.1; SM-G920V Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36',
    NEXUS_6P: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 6P Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.83 Mobile Safari/537.36',
    SONY_XPERIA_XZ: 'Mozilla/5.0 (Linux; Android 7.1.1; G8231 Build/41.2.A.0.219; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/59.0.3071.125 Mobile Safari/537.36',
    SONY_XPERIA_Z5: 'Mozilla/5.0 (Linux; Android 6.0.1; E6653 Build/32.2.A.0.253) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36',
    HTC_ONE_X10: 'Mozilla/5.0 (Linux; Android 6.0; HTC One X10 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.98 Mobile Safari/537.36',
    HTC_ONE_M9: 'Mozilla/5.0 (Linux; Android 6.0; HTC One M9 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.3',
    IPHONE_XR_SAFARI: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1',
    IPHONE_XS_CHROME: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/69.0.3497.105 Mobile/15E148 Safari/605.1',
    IPHONE_XS_MAX_FIREFOX: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/13.2b11866 Mobile/16A366 Safari/605.1.15',
    IPHONE_X: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    IPHONE_8: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
    IPHONE_8_PLUS: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A5370a Safari/604.1',
    IPHONE_7: 'Mozilla/5.0 (iPhone9,3; U; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A403 Safari/602.1',
    IPHONE_7_PLUS: 'Mozilla/5.0 (iPhone9,4; U; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A403 Safari/602.1',
    IPHONE_6: 'Mozilla/5.0 (Apple-iPhone7C2/1202.466; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1A543 Safari/419.3',
    MICROSOFT_LUMIA_650: 'Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Microsoft; RM-1152) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Mobile Safari/537.36 Edge/15.15254',
    MICROSOFT_LUMIA_550: 'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; RM-1127_16056) AppleWebKit/537.36(KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.10536',
    MICROSOFT_LUMIA_950: 'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/13.1058'
  },
  TABLET: {
    GOOGLE_PIXEL_C: 'Mozilla/5.0 (Linux; Android 7.0; Pixel C Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.98 Safari/537.36',
    SONY_XPERIA_Z4: 'Mozilla/5.0 (Linux; Android 6.0.1; SGP771 Build/32.2.A.0.253; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.98 Safari/537.36',
    NVDIA_SHIELD_K1: 'Mozilla/5.0 (Linux; Android 6.0.1; SHIELD Tablet K1 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Safari/537.36',
    SAMSUNG_GALAXY_TAB_S3: 'Mozilla/5.0 (Linux; Android 7.0; SM-T827R4 Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.116 Safari/537.36',
    SAMSUNG_GALAXY_TAB_A: 'Mozilla/5.0 (Linux; Android 5.0.2; SAMSUNG SM-T550 Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/3.3 Chrome/38.0.2125.102 Safari/537.36',
    AMAZON_KINDLE_FIRE_HDX_7: 'Mozilla/5.0 (Linux; Android 4.4.3; KFTHWI Build/KTU84M) AppleWebKit/537.36 (KHTML, like Gecko) Silk/47.1.79 like Chrome/47.0.2526.80 Safari/537.36',
    LG_GPAD_7: 'Mozilla/5.0 (Linux; Android 5.0.2; LG-V410/V41020c Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/34.0.1847.118 Safari/537.36'
  },
  DESKTOP: {
    WIN_10_EDGE: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246',
    CHROME_OS_CHROME: 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36',
    MAC_OS_SAFARI: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9',
    WIN_7_CHROME: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36',
    LINUX_FIREFOX: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1'
  },
  BOTS: {
    GOOGLE_BOT: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    BING_BOT: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
    YAHOO_BOT: 'Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)'
  }
};
exports.USER_AGENTS = USER_AGENTS;
var PAGE_LOAD_OPTIONS = {
  waitUntil: 'networkidle0'
};
exports.PAGE_LOAD_OPTIONS = PAGE_LOAD_OPTIONS;
var TARGET_CHANGED_EVENT = 'targetchanged';
exports.TARGET_CHANGED_EVENT = TARGET_CHANGED_EVENT;
var NETWORK_ENABLE = 'Network.enable';
exports.NETWORK_ENABLE = NETWORK_ENABLE;
var NETWORK_RESPONSE_RECEIVED = 'Network.responseReceived';
exports.NETWORK_RESPONSE_RECEIVED = NETWORK_RESPONSE_RECEIVED;
var NETWORK_DATA_RECEIVED = 'Network.dataReceived';
exports.NETWORK_DATA_RECEIVED = NETWORK_DATA_RECEIVED;
var NETWORK_CONDITIONS_MESSAGE = 'Network.emulateNetworkConditions';
exports.NETWORK_CONDITIONS_MESSAGE = NETWORK_CONDITIONS_MESSAGE;
var NETWORK_ASSETS_MIMETYPES = ['javascript', 'css', 'png', 'svg', 'tff'];
exports.NETWORK_ASSETS_MIMETYPES = NETWORK_ASSETS_MIMETYPES;
var CPU_CONDITIONS_MESSAGE = 'Emulation.setCPUThrottlingRate';
exports.CPU_CONDITIONS_MESSAGE = CPU_CONDITIONS_MESSAGE;
var NAVIGATION_INFO_TYPE = 'navigation';
exports.NAVIGATION_INFO_TYPE = NAVIGATION_INFO_TYPE;
var PAINT_INFO_TYPE = 'paint';
exports.PAINT_INFO_TYPE = PAINT_INFO_TYPE;
var RESOURCE_INFO_TYPE = 'resource';
exports.RESOURCE_INFO_TYPE = RESOURCE_INFO_TYPE;
var PATTERN_DOESNT_MATCH_ERROR = "Provided pattern doesn' match any file.";
exports.PATTERN_DOESNT_MATCH_ERROR = PATTERN_DOESNT_MATCH_ERROR;
var PAGEWRAPPER_MISSING_PAGE_ERROR = 'PageWrapper requires a puppeteer page';
exports.PAGEWRAPPER_MISSING_PAGE_ERROR = PAGEWRAPPER_MISSING_PAGE_ERROR;
var PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR = 'Page has not been initialised.';
exports.PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR = PAGEWRAPPER_PAGE_NOT_INITIALISED_ERROR;
var BROWSER_NOT_INITIALISED = 'Browser has not been initialised properly.';
exports.BROWSER_NOT_INITIALISED = BROWSER_NOT_INITIALISED;
var RUNNER_CLEANUP_MESSAGE = 'Performing Runner cleanup.';
exports.RUNNER_CLEANUP_MESSAGE = RUNNER_CLEANUP_MESSAGE;
var RUNNER_TERMINATION_MESSAGE = 'Terminating Runner.';
exports.RUNNER_TERMINATION_MESSAGE = RUNNER_TERMINATION_MESSAGE;
var RUNNER_STARTING_MESSAGE = 'Starting Runner.';
exports.RUNNER_STARTING_MESSAGE = RUNNER_STARTING_MESSAGE;
var BROWSER_STARTING_MESSAGE = 'Starting Browser.';
exports.BROWSER_STARTING_MESSAGE = BROWSER_STARTING_MESSAGE;
var BROWSER_CANT_OPEN_PAGE_MESSAGE = "Can't open a new page, browser hasn't been launched.";
exports.BROWSER_CANT_OPEN_PAGE_MESSAGE = BROWSER_CANT_OPEN_PAGE_MESSAGE;
var BROWSER_CANT_CLOSE_MESSAGE = "Can't close, browser hasn' been launched yet.";
exports.BROWSER_CANT_CLOSE_MESSAGE = BROWSER_CANT_CLOSE_MESSAGE;
var REPORT_FILENAME_ROOT = 'report_bigbrother_';
exports.REPORT_FILENAME_ROOT = REPORT_FILENAME_ROOT;
var REPORT_FILENAME_EXTENSION = '.json';
exports.REPORT_FILENAME_EXTENSION = REPORT_FILENAME_EXTENSION;
var REPORT_FILE_PATTERN = "".concat(REPORT_FILENAME_ROOT, "*.json");
exports.REPORT_FILE_PATTERN = REPORT_FILE_PATTERN;
var REPORT_STATIC_FILES_NODE_MODULES = "node_modules/".concat(_package.default.name);
exports.REPORT_STATIC_FILES_NODE_MODULES = REPORT_STATIC_FILES_NODE_MODULES;
var REPORT_FOLDER_CREATED = 'Report folder has been created.';
exports.REPORT_FOLDER_CREATED = REPORT_FOLDER_CREATED;
var REPORT_FOLDER_ALREADY_EXISTS = 'Report folder already exists, proceeding.';
exports.REPORT_FOLDER_ALREADY_EXISTS = REPORT_FOLDER_ALREADY_EXISTS;
var REPORT_ABOUT_TO_GENERATE = 'About to generate full report.';
exports.REPORT_ABOUT_TO_GENERATE = REPORT_ABOUT_TO_GENERATE;
var REPORT_GENERATION_STARTED = 'About to generate report.';
exports.REPORT_GENERATION_STARTED = REPORT_GENERATION_STARTED;
var REPORT_ABOUT_TO_OPEN = 'About to open report.';
exports.REPORT_ABOUT_TO_OPEN = REPORT_ABOUT_TO_OPEN;
var REPORT_OPEN_DISABLED = 'Automatic report opening has been disabled. Set config.openReport to true';
exports.REPORT_OPEN_DISABLED = REPORT_OPEN_DISABLED;
var FULL_REPORT_MID = 'full';
exports.FULL_REPORT_MID = FULL_REPORT_MID;
var FULL_REPORT_FILENAME = "".concat(FULL_REPORT_MID).concat(REPORT_FILENAME_EXTENSION);
exports.FULL_REPORT_FILENAME = FULL_REPORT_FILENAME;
var REPORT_STATIC_FILES_FOLDER = 'report_static_files';
exports.REPORT_STATIC_FILES_FOLDER = REPORT_STATIC_FILES_FOLDER;
var REPORT_STATIC_FILES_ALL_PATTERN = '*';
exports.REPORT_STATIC_FILES_ALL_PATTERN = REPORT_STATIC_FILES_ALL_PATTERN;
var REPORT_TARGET_STRING = '<REPLACE_ME>';
exports.REPORT_TARGET_STRING = REPORT_TARGET_STRING;
var REPORT_CURRENT_REPORT_TARGET_STRING = '<REPLACE_ME_CURRENT>';
exports.REPORT_CURRENT_REPORT_TARGET_STRING = REPORT_CURRENT_REPORT_TARGET_STRING;
var REPORT_INDEX_HTML = 'index.html';
exports.REPORT_INDEX_HTML = REPORT_INDEX_HTML;
var EMPTY = '';
exports.EMPTY = EMPTY;
var FULL_STOP = '.';
exports.FULL_STOP = FULL_STOP;
var UNDERSCORE = '_';
exports.UNDERSCORE = UNDERSCORE;
var SPACE = ' ';
exports.SPACE = SPACE;
var ALL_SPACES = / /g;
exports.ALL_SPACES = ALL_SPACES;
var RECORDING_EXT = '.json';
exports.RECORDING_EXT = RECORDING_EXT;
var ENV_FLAGS = {
  HEADLESS: 'HEADLESS',
  CACHE_ENABLED: 'CACHE_ENABLED'
};
exports.ENV_FLAGS = ENV_FLAGS;
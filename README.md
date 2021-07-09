# BIGBROTHER


BigBrother is a simple tool that aims to provide insights of how our pages are performing. Similar to mocha, it will allow you to define testing scenarios and execute them with different Network/CPU throttling options.

BigBrother will execute each defined test scenario inside an instance of [Puppeteer](https://github.com/GoogleChrome/puppeteer). Once every scenario has been executed, BigBrother will provide a report of the time needed by each operation to be concluded. It will also provide useful informations about the page itself, such as `FirstMeaningFulPaint`, `domInteractive`, `domComplete`, `transferSize` and so on.

The tool allows you to record every scenario. Check the [syntax](#syntax) chapter for further instructions. Once a scenario has been recorded, further runs of BigBrother will use the stored values as reference: if running the tests brings timing above the recorded reference, the test will fail and BigBrother will finish with an error.

Similar to mocha, BigBrother can be easily included in your pipeline: if performance drops below your expected level, tests will fail and the tool will return with 1.

---

## Installation

`npm install --save-dev github:sdfe/sd-browser-perf#v0.3.5`

---

## Usage

Run bigbrother like so:

`bigbrother --config=./bigbrother.config.js`

or inside your `package.json`:

```json
    "scripts": {
        ...
        "test:performance": "bigbrother --config=./bigbrother.config.js "
    }
```
BigBrother doesn't require a specific pattern, but it's recommended to use a distinct file pattern, such as `.performance.js`;

### flags:

- `--config`[optional]: use this to specify a configuration file. Please check section [configuration](#configuration) for more informations about its syntax.

---

## Configuration

If defined by the `--config` flag, BigBrother will use a configuration file. The allowed structure is the following:

```javascript
    const config = {
        baseUrl: 'http://www.sciencedirect.com',
        cacheEnabled: false,
        headless: true,
        threshold: 0.3,
        recordingsPath: '.recordings',
        before: 'npm run test:performance:before',
        after: 'npm run test:performance:after',
        ignore: [],
        verbose: true,
        pattern: '**/*.performance.js'
    };
    
    module.exports = config;

```

- `baseUrl` _string_ [**MANDATORY**]: This is the baseURl used when loading the page.
- `cacheEnabled` _true/false_: this will enable/disable cache for each page.
- `headless` _true/false_: this will enable/disable headless mode for Puppeteer.
- `threshold` _float_: this represents the acceptance criteria for your tests. See 
- `recordingsPath` _path_: this is the relative path within your project where recordings will be stored.
- `pattern` _"**/*.performance.js"_ : this defines the test pattern to be used, and it has the same meaning of the fist variable of the cli tool.
- `ignore` _list of files_: this defines a list of files to be ignored when running.
- `verbose` _true/false_: this will enable/disable verbose mode. 

---

## API

Sample test:

```javascript

    describe('Homepage', () => {
       
        before(() => {
           // setting up some stubs 
        });
        
        after(() => {
           // cleanup
        });
        
        it('should load in less than 250ms', async page => {
           const loadTime = await page.load('http://www.sciencedirect.com');
           
           expect(loadTime).toBeLessThan(250);
        });
    });
```

### `describe`:

`describe` allows you to group your tests. You can nest `describe` blocks, and obtain a structure like so:

```javascript
    describe('SomePage', () => {
        
        before(() => {});
        
        after(() => {});
       
        describe('High latency', () => {
            
            beforeEach(() => {});
            
            afterEach(() => {});
            
            it('should load in less than 1s with 3g connection', async page => {});
        });
        
        describe('Low Latency', () => {
            
            beforeEach(() => {});
                        
            afterEach(() => {});
            
            it('should load in less than 300ms with WIFI connection', async page => {});
        });
    });
```

`describe` blocks also allow the use of the following methods:

- `before`: executed before all tests, at the beginning of the block.
- `after`: executed after all tests, at the end of the block.
- `beforeEach`: executed before each test within the block.
- `afterEach`: executed after each test within the block.

### `it`:

`it` represents the definition of your test and it's structured as follows: it should be defined only inside a `describe` block, and it receives a string (the test label) and an asynchronous function.

```javascript
    it('name of the test', async page => {});
```

The asynchronous callback receives the instance of the page that will be used during the test, check the [page](#page) section for more informations.

### `expect`:

BigBrother injects a custom set of expectations, but you're free to use whatever library you want. `expect` exposes the following API:
    
- `toExist()`: checks if the provided value is not falsy
- `toBeLessThan(target)`: checks if the provided value is less than the target.
- `toBeMoreThan(target)`: checks if the provided value is greater than the target.
- `toBeEqual(target)`: checks if the provided value is equal to the target.
- `toMatchRecording()`: checks if the current page matches the stored recording. This will save the recording for the first time if not found.
- `toBeWithinRange(min, max)`: checks if the provided value is between min and max. 

---

## Page

Each `it` block expects an async function, defined like so:
```javascript
    it('Test Label', async function(page) {
        const url = 'www.sciencedirect.com';
        const loadTime = await page.load(url);
        await page.click('#link_to_search');
        
        expect(loadTime).toBeLessThan(400);
    });
```
Said async function receives a `page` object, which is an instance of `PageWrapper`, which encapsulates some Puppeteer functionality.
Each method will return the time (expressed in ms) required to execute the desired action.

- `async load(url)`: will load the provided url.
- `async click(selector, options)`: will click on the selector using the provided options.
- `async focus(selector)`: will focus on the selector using the provided options.
- `async tap(selector)`: will simulate a touch on the selector.
- `async type(selector, text)`: will type the provided text in the selector.
- `async keyboard(event)`: will generate a keypress event on the document.
- `async waitFor(selector)`: will wait for the selector to appear on screen.
- `async getPaintInfo()`: TBD
- `async getNavigationInfo()`: TBD
- `async getAssetsInfo()`: TBD
- `async setUserAgent(userAgent)`: will change the User Agent to the one provided
- `async screenshot()`: will take a screenshot of the current page.
- `async setPageSpeed({ network, cpu })`: will set the cpu and network speed if provided.
- `async setNetworkSpeed(network)`: will set the page's network speed if provided.
- `async setCpuSpeed(cpu)`: will set the page's cpu speed if provided.
---

## Constants

BigBrother exposes a set of constants that you can use when setting specific Network/Cpu or User Agents in your tests.

### Network
```javascript
const { NETWORK } = require('bigbrother');
```

Here is the list of available values:
```javascript
const NETWORK = {
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
}
```

Example usage:

You can set the page's network speed by using its method `setNetworkSpeed` like so:
```javascript
    const { NETWORK } = require('bigbrother');

    describe('HomePage', () => {
       
        it('should load in less than 1s with slow connection', async (page) => {
            const url = 'www.sciencedirect.com';
            await page.setNetworkSpeed(NETWORK.SLOW3G);
            
            const time = await page.load(url);
           
            expect(time).toBeLessThan(1000);
        });
    });
```

### Cpu
```javascript
const { CPU } = require('bigbrother');
```

Here is the lsit of the possible values:

```javascript
const CPU = {
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
}
```

Example usage:

You can set the page's cpu speed by using its method `setCpuSpeed` like so:
```javascript
    const { CPU } = require('bigbrother');

    describe('HomePage', () => {
       
        it('should load in less than 1s with slow cpu', async (page) => {
            const url = 'www.sciencedirect.com';
            await page.setCpuSpeed(CPU.SLOW_5);
            
            const time = await page.load(url);
           
            expect(time).toBeLessThan(1000);
        });
    });
```

### User Agents

```javascript
const { USER_AGENTS } = require('bigbrother');
```

Here is the list of possible values:
```javascript
   export const USER_AGENTS = {
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
```

Example usage:
You can set the page's user agent by using its method `setUserAgent` like so:
```javascript
    const { USER_AGENTS } = require('bigbrother');

    describe('HomePage', () => {
       
        it('should load in less than 1s with different user agent', async (page) => {
            const url = 'www.sciencedirect.com';
            await page.setUserAgent(USER_AGENTS.DESKTOP.WIN_10_EDGE);
            
            const time = await page.load(url);
           
            expect(time).toBeLessThan(1000);
        });
    });
```

---

### Contributing

Contributions are more than welcome. Fork the repository and open a PR. If you have questions ask Marco <m.stagni@elsevier.com>

### Licence

MIT License

Copyright (c) 2021 Elsevier

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


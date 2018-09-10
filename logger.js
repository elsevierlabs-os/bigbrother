class Logger {
    constructor() {
        this.verbose = false;
    }

    setVerboseMode(flag) {
        this.verbose = !!flag;
    }

    usage() {
        console.log('\n'
            .concat('----------------------------------------------------------'.green)
            .concat('\n')
            .concat('\n')
            .concat('Bigbrother Usage: '.bold)
            .concat('\n')
            .concat('\n')
            .concat('\tbigbrother -p "**/*.perf.js" --flags'.grey)
            .concat('\n')
            .concat('\n')
            .concat('Available flags:'.bold)
            .concat('\n')
            .concat('\n')
            .concat('\t-v\t' + 'Set verbose mode.'.grey)
            .concat('\n')
            .concat('\t-h\t' + 'Prints help and returns.'.grey)
            .concat('\n')
            .concat('\n')
            .concat('----------------------------------------------------------'.green)
            .concat('\n\n'));
    }

    newLines(amount) {
        if (amount && amount > 0) {
            console.log(Array(amount).join('\n'));
        } else {
            console.log('\n');
        }
    }

    success(count) {
        console.log('\t', '√'.green, (count + ' tests passed.').green);
    }

    failure(count) {
        console.log('\t', 'x'.red, (count + ' tests failed.').red);
    }

    info(msg) {
        if (msg && this.verbose) {
            console.log('[INFO]'.blue, msg.toString().blue);
        }
    }

    warn(msg) {
        if (msg) {
            console.log('[WARN]'.yellow, msg.toString().yellow);
        }
    }

    debug(msg) {
        if (msg) {
            console.log(msg);
        }
    }

    error(msg) {
        if (msg) {
            console.log('[ERROR]'.red, msg.toString().red);
        }
    }

    passed(depth, msg, duration) {
        const toPrint = depth === 1 ? `${msg}`.underline : `${msg}`.grey;

        console.log(toPrint, '√'.green, duration.green)
    }

    failed(depth, msg, duration, expected) {
        const toPrint = depth === 1 ? `${msg}`.underline : `${msg}`.red;

        console.log(toPrint, 'x'.red, duration.red, expected.bold.yellow);
    }
}

module.exports = new Logger();

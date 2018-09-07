class Logger {
    constructor() {

    }

    usage() {
        console.log('\n'
            .concat('----------------------------------------------------------'.green)
            .concat('\n')
            .concat('\n')
            .concat('Arbiter Usage: '.bold)
            .concat('\n')
            .concat('\n')
            .concat('\tarbiter "**/*.perf.js" --flags')
            .concat('\n')
            .concat('\n')
            .concat('----------------------------------------------------------'.green)
            .concat('\n\n'));
    }

    info(msg) {
        if (msg) {
            console.log(msg.toString().blue);
        }
    }

    warn(msg) {
        if (msg) {
            console.log(msg.toString().yellow);
        }
    }

    error(msg) {
        if (msg) {
            console.log(msg.toString().red);
        }
    }

    success() {

    }

    fail() {

    }
}

module.exports = new Logger();

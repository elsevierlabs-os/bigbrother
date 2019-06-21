const ora = require('ora');

const spinner = ora({
    text: 'Loading unicorns',
    spinner: 'pong'
}).start();

setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = 'Loading rainbows';
}, 1000);

setTimeout(() => {
    spinner.succeed('ok');
}, 7000);

// console.log(spinner);
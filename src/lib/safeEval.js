const vm = require('vm');

const safeEval = (code, context) => {
    const script = new vm.Script(code);
    const fullContext = {
        ...context,
        require
    };

    script.runInNewContext(fullContext);

    return script;
};

export default safeEval;

import Expectation from './Expectation';

const expect = (something) => {
    return new Expectation(something);
};

export default expect;
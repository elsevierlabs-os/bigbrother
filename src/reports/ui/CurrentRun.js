import React from 'react';
import Execution from './Execution';

const CurrentRun = ({ current }) => (
    <div className="bottom-border">
        <Execution failures={current.failures} suites={current.suites} />
    </div>
);

export default CurrentRun;

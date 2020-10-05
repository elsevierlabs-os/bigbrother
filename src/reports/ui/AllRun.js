import React from 'react';
import FailureToTestRationGraph from './graphs/FailureToTestRatioGraph';
import PayloadInspectGraph from './graphs/PayloadInspectGraph';

const AllRun = ({ data, current }) => (
    <div className="bottom-border">
        <FailureToTestRationGraph data={data} />
        <PayloadInspectGraph data={data} />
    </div>
);

export default AllRun;

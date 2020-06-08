import React from 'react';

const FailureReason = ({ message, received, expected = 'to exist' }) => {
    return (
        <ul>
            <li className={"reason-detail"}>
                <label>Message:</label>
                { message }
            </li>
            <li className={"reason-detail"}>
                <label>received:</label>
                { received }
            </li>
            <li className={"reason-detail"}>
                <label>expected:</label>
                { expected }
            </li>
        </ul>
    )
};

const Failure = ({ name, reason }) => (
    <li className='execution failed'>
        <span className={'test-title'}>{name}</span>
        <span className={'test-reason'}>
            <FailureReason {...reason}/>
        </span>
    </li>
);

const Test = ({ name, reason, success }) => {
    const className = 'execution '.concat(success ? 'success' : 'failed');

    return (
        <li className={className}>
            <span className={'test-title'}>{name}</span>
        </li>
    );
};

const renderFailures = (failures = []) => {
    if (!failures.length) return null;

    return (
        <div>
            <h3>Failures</h3>
            <ul className={'execution-block failures'}>
                { failures.map(failure => (
                    <Failure {...failure}/>
                ))}
            </ul>
        </div>
    )
};

const extractTitle = ({ fullName }) => fullName.split('.')[0];

const renderSingleSuite = (tests = []) => {
    if (!tests.length) return null;

    const title = extractTitle(tests[0]);

    return (
        <div>
            <h3>{title}</h3>
            <ul className={'execution-block suites'}>
                { tests.map(test => (
                    <Test {...test}/>
                ))}
            </ul>
        </div>

    )
};

const renderSuitesBlocks = (suites = []) => {
    if (!suites.length) return null;

    return (
        <div>
            { suites.map(renderSingleSuite) }
        </div>
    )
};

const Execution = ({ failures, suites }) => {
    console.log(failures, suites);

    return (
        <div>
            { renderFailures(failures) }
            { renderSuitesBlocks(suites) }
        </div>
    );
};

export default Execution;

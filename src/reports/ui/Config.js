import React from 'react';

const mapConfig = (key, value) => (
    <li>
        <span className="config-name">{key}</span>
        <span className="config-value"> {JSON.stringify(value)}</span>
    </li>
);

const Config = ({ config }) => (
    <div className="bottom-border">
        <h2 className="title">Current configuration:</h2>
        <ul className="config-container">
            { Object
                .keys(config)
                .map(k => mapConfig(k, config[k])) }
        </ul>
    </div>
);

export default Config;

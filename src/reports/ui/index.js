import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const createDashboard = () => {
    const currentReport = window.currentReport;
    const data = window.fullReport.data;
    const config = currentReport.config;

    console.log(currentReport.testRunner, data);

    const container = document.getElementById('container');

    ReactDOM.render(
        <App
            current={currentReport.testRunner}
            data={data}
            config={config}
        />,
        container);
};

window.addEventListener('load', createDashboard);

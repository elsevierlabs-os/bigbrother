import React from 'react';
import flattendeep from 'lodash.flattendeep';

import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { HEIGHT, WIDTH } from '../constants';

const parseData = data =>
    data.reduce((acc, { testRunner }, i) => {
        const { suites = [] } = testRunner;
        const flat = flattendeep(suites);

        const item = {
            number: `${i}`,
            failures: flat.filter(s => !s.success).length,
            success: flat.filter(s => s.success).length
        };

        acc.push(item);

        return acc;
    }, []);

const FailureToTestRationGraph = ({ data }) => {
    const chartData = parseData(data);

    console.log(chartData);

    return (
        <div>
            <h3>Failures to Tests ratio</h3>
            <BarChart
                width={WIDTH}
                height={HEIGHT}
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="number" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="failures" stackId="a" fill="#c0392b" />
                <Bar dataKey="success" stackId="a" fill="#27ae60" />
            </BarChart>
        </div>
    );
};

export default FailureToTestRationGraph;

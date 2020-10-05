// this is a stacked bar chart showing how payload is split up.
import React, { useState } from 'react';
import { Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { getRandomColor, HEIGHT, WIDTH } from '../constants';

export const parseData = data => {
    const tests = [];
    data.forEach(({ pages }) => {
        const keys = {};
        pages.forEach(({ assets }) => {
            Object.keys(assets).forEach(k => {
                const parsed = k.split('/').pop();
                if (parsed in keys) {
                    keys[parsed].push(assets[k]);
                } else {
                    keys[parsed] = [];
                    keys[parsed].push(assets[k]);
                }
            });
        });
        tests.push(keys);
    });

    return tests;
};

export const getGraphData = tests => {
    const data = [];

    tests.forEach((test, i) => {
        const assets = Object.keys(test).reduce((acc, asset) => {
            let amount = 1;
            acc[asset] =
                test[asset].reduce((tot, { length }) => {
                    amount++;
                    tot += length;
                    return tot;
                }, 0) / amount;

            return acc;
        }, {});

        data.push({
            name: `${i}`,
            total: Object.keys(assets).reduce((tot, asset) => {
                return tot + assets[asset];
            }, 0),
            ...assets
        });
    });

    return data;
};

const mapAssetsToBars = (tests, stacked) => {
    return Object.keys(tests[0]).map(asset => {
        const extraProps = stacked ? { stackId: 'a' } : {};
        return <Bar dataKey={asset} {...extraProps} barSize={20} fill={getRandomColor()} />;
    });
};

const PayloadInspectGraph = ({ data }) => {
    const tests = parseData(data);
    const graphData = getGraphData(tests);

    const [stacked, setStacked] = useState(false);
    const onInputChange = e => {
        setStacked(e.target.checked);
    };

    return (
        <div>
            <h3 className={'graph-title'}>Payload composition</h3>
            <div className="graph-actions">
                <label>Stacked</label>
                <input type={'checkbox'} onChange={onInputChange} />
            </div>
            <ComposedChart width={WIDTH} height={HEIGHT} data={graphData}>
                <XAxis dataKey="name" />
                <YAxis dataKey="total" />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                {mapAssetsToBars(tests, stacked)}
                <Line type="monotone" dataKey="total" stroke="#ff7300" />
            </ComposedChart>
        </div>
    );
};

export default PayloadInspectGraph;

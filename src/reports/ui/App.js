import React from 'react';
import Config from './Config';
import Tab from './utils/Tab';
import CurrentRun from './CurrentRun';
import AllRun from './AllRun';

const App = ({ data, config, current }) => (
    <div>
        <h1 className="title bottom-border">Bigbrother Report</h1>
        <Config config={config} />
        <Tab tabs={[
            { title: 'Current', component: <CurrentRun current={current}/> },
            { title: 'All', component: <AllRun data={data}/> }
        ]} />
    </div>

);

export default App;

import React, { useState } from 'react';

const renderTitles = (tabs, current, onTabChange) =>
    tabs.map(({ title }, index) => {
        const className = 'tab-title '.concat(current === index ? 'current' : '');
        return (
            <li className={className} onClick={() => onTabChange(index)}>
                {title}
            </li>
        );
    });

const Tab = ({ tabs }) => {
    const [tab, setTab] = useState(0);

    return (
        <div className={'tab-container'}>
            <ul className={'tab-titles'}>{renderTitles(tabs, tab, setTab)}</ul>
            <div className={'tab-content'}>{tabs[tab].component}</div>
        </div>
    );
};

export default Tab;

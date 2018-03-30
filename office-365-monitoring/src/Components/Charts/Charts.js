import React from 'react';
import { Line } from 'react-chartjs-2';

export const Office365ActiveUserCountsComponent = (props) => (
    <div>
        <Line data={props.data} responsive={true}/>
    </div>
)

export const SharePointActivityPagesComponent = (props) => (
    <div className="chart">
        <Line data={props.data} responsive={true}/>
    </div>
)
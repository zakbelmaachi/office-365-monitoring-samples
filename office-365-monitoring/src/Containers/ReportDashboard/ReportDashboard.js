import React, { Component } from 'react';
import './ReportDashboard.css';
import SharePointActivityPages from '../../Containers/Charts/SharePointActivityPages';
import Office365ActiveUserCounts from '../../Containers/Charts/Office365ActiveUserCounts';


const ReportDashboard = (props) => (
    <div className="report-container">
        <SharePointActivityPages token={props.token} />
        <Office365ActiveUserCounts token={props.token} />
    </div>
)

export default ReportDashboard;
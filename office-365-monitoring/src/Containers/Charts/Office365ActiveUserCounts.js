import React, { Component } from 'react';
import { GraphUtilities } from '../../Helpers/GraphUtilities';
import { Office365ActiveUserCountsComponent } from '../../Components/Charts/Charts';
import Button from '../../Components/Button/Button';
import './Chart.css';

class Office365ActiveUserCounts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            graphData: {},
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Office 365',
                        fill: false,
                        lineTension: 0.2,
                        backgroundColor: '#ff8c00',
                        borderColor: '#ff8c00',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: '#ff8c00',
                        pointBackgroundColor: '#ff8c00',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: '#ff8c00',
                        pointHoverBorderColor: '#ff8c00',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: []
                    },
                    {
                        label: 'Exchange',
                        fill: false,
                        lineTension: 0.2,
                        backgroundColor: '#b4a0ff',
                        borderColor: '#b4a0ff',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: '#b4a0ff',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: '#b4a0ff',
                        pointHoverBorderColor: '#b4a0ff',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: []
                    },
                    {
                        label: 'OneDrive',
                        fill: false,
                        lineTension: 0.2,
                        backgroundColor: '#00bcf2',
                        borderColor: '#00bcf2',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: '#00bcf2',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: '#00bcf2',
                        pointHoverBorderColor: '#00bcf2',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: []
                    },
                    {
                        label: 'SharePoint',
                        fill: false,
                        lineTension: 0.2,
                        backgroundColor: '#bad80a',
                        borderColor: '#bad80a',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: '#bad80a',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: '#bad80a',
                        pointHoverBorderColor: '#bad80a',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: []
                    },
                    {
                        label: 'Skype For Business',
                        fill: false,
                        lineTension: 0.2,
                        backgroundColor: '#00B294',
                        borderColor: '#00B294',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: '#00B294',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: '#00B294',
                        pointHoverBorderColor: '#00B294',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: []
                    },
                    {
                        label: 'Yammer',
                        fill: false,
                        lineTension: 0.2,
                        backgroundColor: '#5c2d91',
                        borderColor: '#5c2d91',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: '#5c2d91',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: '#5c2d91',
                        pointHoverBorderColor: '#5c2d91',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: []
                    },
                    {
                        label: 'Teams',
                        fill: false,
                        lineTension: 0.2,
                        backgroundColor: '#e3008c',
                        borderColor: '#e3008c',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: '#e3008c',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: '#e3008c',
                        pointHoverBorderColor: '#e3008c',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: []
                    }
                ]
            },
            period: 'D7'
        };
    }

    // event handler to update state to the desired activity report period
    // this forces a rerender on the component
    handleClick = (period) => {
        this.setState({period}, this.getGraphReport(period));
    }
    
    componentDidMount() {
        console.log("SHAREPOINT ACTIVITY PAGES DID MOUNT - PERIOD: " + this.state.period);
        this.getGraphReport(this.state.period);
    }

    render() {
        return (
            <div>
                <h2 className="chart-header ms-font-su">Office 365 Active User Counts</h2>
                <div className="button-container">
                    <Button className="button-spacing" action="Get Activity for Past 7 Days" handleClick={(e) => this.handleClick('D7', e)} />
                    <Button className="button-spacing" action="Get Activity for Past 30 Days" handleClick={(e) => this.handleClick('D30', e)} />
                    <Button className="button-spacing" action="Get Activity for Past 90 Days" handleClick={(e) => this.handleClick('D90', e)} />
                    <Button className="button-spacing" action="Get Activity for Past 180 Days" handleClick={(e) => this.handleClick('D180', e)} />
                </div>
                <Office365ActiveUserCountsComponent data={this.state.data} />
            </div>
        )
    }

    getGraphReport(period) {
        // reference graph utilities helper class
        const graphUtilities = new GraphUtilities();
    
        graphUtilities.getGraphReport(this.props.token, 'getOffice365ActiveUserCounts', period)
            .then(response => {
            console.log(JSON.stringify(response));
            this.setState({graphData: response});
            // adjust the chart default settings with updated x and y axis data
            // this.adjustChartDefaults updates the state which forces a rerender on the component
            this.adjustChartDefaults(response, period);

            }).catch(error => {
            console.log(`ACTIVITY REPORT ERROR: ${error}`);
        });
    }

    adjustChartDefaults(json, period) {
        let label = '';
        let labels = [];
        let o365Data = [];
        let exoData = [];
        let odData = [];
        let spoData = [];
        let sfbData = [];
        let yammerData = [];
        let teamsData = [];

        json.map(row => {
            labels.push(row["Report Date"]);
            o365Data.push(row["Office 365"]);
            exoData.push(row["Exchange"]);
            odData.push(row["OneDrive"]);
            spoData.push(row["SharePoint"]);
            sfbData.push(row["Skype For Business"]);
            yammerData.push(row["Yammer"]);
            teamsData.push(row["Teams"]);
        });

        this.setState((previousState) => {
            previousState.data.labels = labels.reverse();
            //previousState.data.datasets[index].label = `Past ${period.slice(1)} Days`
            previousState.data.datasets[0].data = o365Data.reverse();
            previousState.data.datasets[1].data = exoData.reverse();
            previousState.data.datasets[2].data = odData.reverse();
            previousState.data.datasets[3].data = spoData.reverse();
            previousState.data.datasets[4].data = sfbData.reverse();
            previousState.data.datasets[5].data = yammerData.reverse();
            previousState.data.datasets[6].data = teamsData.reverse();
            return previousState;
        });
    }
}

export default Office365ActiveUserCounts;
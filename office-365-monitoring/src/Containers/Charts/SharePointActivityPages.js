import React, { Component } from 'react';
import { GraphUtilities } from '../../Helpers/GraphUtilities';
import { SharePointActivityPagesComponent } from '../../Components/Charts/Charts';
import Spinner from 'react-spinkit';
import Button from '../../Components/Button/Button';
import './Chart.css';

class SharePointActivityPages extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Past 7 Days',
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
                    }
                ]
            },
            period: 'D7'
        };
    }

    // event handler to update state to the desired activity report period
    // this forces a rerender on the component
    handleClick = (period, e) => {
        e.preventDefault();
        this.setState({period}, this.getGraphReport(period));
    }
    
    componentDidMount() {
        console.log("SHAREPOINT ACTIVITY PAGES DID MOUNT - PERIOD: " + this.state.period);
        this.getGraphReport(this.state.period);
        // this.getGraphReportAxios(this.state.period);
    }

    render() {
        return (
            <div>
                <h2 className="chart-header ms-font-su">SharePoint Page View Activity</h2>
                <div className="button-container">
                    <Button className="button-spacing" action="Get Activity for Past 7 Days" handleClick={(e) => this.handleClick('D7', e)} />
                    <Button className="button-spacing" action="Get Activity for Past 30 Days" handleClick={(e) => this.handleClick('D30', e)} />
                    <Button className="button-spacing" action="Get Activity for Past 90 Days" handleClick={(e) => this.handleClick('D90', e)} />
                    <Button className="button-spacing" action="Get Activity for Past 180 Days" handleClick={(e) => this.handleClick('D180', e)} />
                </div>
                <SharePointActivityPagesComponent data={this.state.data} />
            </div>
        )
    }

    getGraphReport(period) {
        // reference graph utilities helper class
        const graphUtilities = new GraphUtilities();
    
        graphUtilities.getGraphReport(this.props.token, 'getSharePointActivityPages', period)
            .then(response => {
            
            // adjust the chart default settings with updated x and y axis data
            // this.adjustChartDefaults updates the state which forces a rerender on the component
            this.adjustChartDefaults(response, 0, period);

            }).catch(error => {
            console.log(`ACTIVITY REPORT ERROR: ${error}`);
        });
    }

    adjustChartDefaults(json, index, period) {
        let label = '';
        let labels = [];
        let data = [];

        json.map(row => {
            labels.push(row["Report Date"]);
            data.push(row["Visited Page Count"]);
        });

        this.setState((previousState) => {
            previousState.data.datasets[index].label = `Past ${period.slice(1)} Days`
            previousState.data.labels = labels.reverse();
            previousState.data.datasets[index].data = data.reverse();
            return previousState;
        });
    }
}

export default SharePointActivityPages;
import React, { Component } from 'react';
import ServiceCard from '../../Components/ServiceCard/ServiceCard';
import ServiceFeature from '../../Components/ServiceFeature/ServiceFeature';
import 'semantic-ui-css/semantic.min.css';
import { Card } from 'semantic-ui-react'
import './Dashboard.css';
import '../../../node_modules/office-ui-fabric-core/dist/css/fabric.min.css';


// straight up not used afaik


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    
    renServiceData = () => this.props.data.map((d, id) => {
        let style = {};
        
        switch(d.Status) {
            case 'ServiceDegradation':
                style = { backgroundColor: '#ea4300' }
                break;
            case 'Investigating':
                style = { backgroundColor: '#ff8c00' }
                break; 
            case 'RestoringService':
                style = { backgroundColor: '#ffb900' }
                break;
            case 'ServiceRestored':
                style = { backgroundColor: '#bad80a' }
                break;
            default:
                style = { backgroundColor: '#2b88d8' }
        }

        return (
            <ServiceCard
                key={id} 
                header={d.WorkloadDisplayName}
                backgroundColor={style} 
                statusDisplayName={d.StatusDisplayName}
                indicedents={`Current Incidents: ${d.IncidentIds.length}`}
            />
        )
    });

    render() {
        return (
            <div>
                <h2 className="">Current health status for subscribed Office 365 services</h2>
                <Card.Group className="card-container">
                    {this.renServiceData()}
                </Card.Group>
            </div>
        )
    }
}

export default Dashboard;
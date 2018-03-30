import React, { Component } from 'react';
import { GraphUtilities } from '../../Helpers/GraphUtilities'
import ServiceStatus from '../ServiceStatus/ServiceStatus';
import Spinner from 'react-spinkit';
import './ServiceDashboard.css';


class ServiceDashboard extends Component {

    constructor(props) {
      super(props);

      this.state = {
        loading: false,
        serviceData: null
      }
    }

    componentDidMount() {
      if(this.state.loading === false)
      {
        console.log("Triggering Azure Function")
        // calling this function sets loading = true
        this.triggerAzureFunction(this.props.token);
      }
    }

    render() {
        if(!this.state.serviceData) {
            return (
              <div className="service-container">
                <h2 className="service-container-header ms-font-su">Current health status for Office 365 services</h2>
                <Spinner name="circle" />
              </div>
            )
        }  

        return (
          <div className="service-container">
              <h2 className="service-container-header ms-font-su">Current health status for Office 365 services</h2>
              <ServiceStatus data={this.state.serviceData} />          
          </div>
        )
    }

    triggerAzureFunction(token) {

      this.setState({loading: true})

      const data = {
        "token": token
      }

      fetch('<YOUR_FUNCTION_APP_URL>', {
        method: 'POST',
        body: JSON.stringify(data),
        headers : {
          "Content-Type":"application/json",
          "Content-Length": Buffer.byteLength(data)
        }  
      })
      .then(response => {
        response.json().then(json => {
          console.log(JSON.stringify(json));
          // set serviceData state to re-render component
          this.setState((previousState) =>  {
            previousState.serviceData = json.value;
            previousState.loading = false;
            return previousState;
          });
        });
        console.log(response)
      }).catch(result => {
        console.log(`Failed to resolve JSON: ${result}`);
        this.setState({loading: false});
      });
    }
}

export default ServiceDashboard;

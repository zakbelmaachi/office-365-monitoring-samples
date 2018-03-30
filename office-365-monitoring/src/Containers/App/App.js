import React, { Component } from 'react';
import './App.css';
import * as AuthenticationContext from 'adal-angular';
import adalConfig from '../../adalConfig';
import SuiteBar from '../../Components/SuiteBar/SuiteBar';
import { GraphUtilities } from '../../Helpers/GraphUtilities'
import Spinner from 'react-spinkit';
import ReportDashboard from '../ReportDashboard/ReportDashboard';
import ServiceDashboard from '../ServiceDashboard/ServiceDashboard';

class App extends Component {

  authCtx;

  constructor() {
    super();

    this.state = {
      loading: false,
      error: null,
      signedIn: false,
      currentUser: {},
      servicesData: [],
      gToken: null,
      scToken: null
    };

    const config = adalConfig;

    config.callback = (error, token) => {
      this.setState((previousState, currentProps) => {
        previousState.error = error;
        previousState.signedIn = !(!this.authCtx.getCachedUser());
        return previousState;
      });
    };

    this.authCtx = new AuthenticationContext(config);
  }

  componentDidMount() {
    this.authCtx.handleWindowCallback();
    
    if (window !== window.top) {
      return;
    }

    if (!this.authCtx.getCachedUser()) {
      this.signIn();
    }
    
    this.setState((previousState) => {
      previousState.error = this.authCtx.getLoginError();
      previousState.signedIn = !(!this.authCtx.getCachedUser());
      return previousState;
    });

    this.getGraphUserAndAccessTokens();
  }

  render() {

    // wait for both access tokens before rendering dashboard components - app will break otherwise
    if(!this.state.gToken || !this.state.scToken) {
      
      return (
        <div>
          <SuiteBar />
          <Spinner name="circle" />
        </div>
      )
    }  

    return (
      <div className="App">
        <SuiteBar />
        <div className="dashboard-container">
          <ServiceDashboard token={this.state.scToken}/>
          <ReportDashboard token={this.state.gToken}/>
        </div>        
      </div>
    );
  }

  signIn = () => {
    this.authCtx.login();
  }

  logout = () => {
    this.authCtx.logOut();
  }

  getGraphUserAndAccessTokens() {
    // reference graph utilities helper class
    const graphUtilities = new GraphUtilities();

    graphUtilities.getAccessToken(this.authCtx, "https://graph.microsoft.com")
    .then(accessToken => {
      // update state with graph token
      this.setState({gToken: accessToken});
      graphUtilities.getMe(accessToken)
      .then(response => {
        // update state with current user
        this.setState({currentUser: response});
      })
      .catch(error => {
        console.log(error);
      });
    });

    graphUtilities.getAccessToken(this.authCtx, "https://manage.office.com")
    .then(accessToken => {
      // update state with service communications token
      this.setState({scToken: accessToken});
    })
    .catch(error => {
      console.log(error);
    });
  }
}

export default App;
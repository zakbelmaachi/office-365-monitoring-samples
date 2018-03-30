This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Get Started

```
git clone https://github.com/zakbelmaachi/office-365-monitoring-samples.git
cd to project dir
```

complete configuration steps below

```
npm install
npm start
```

**Build**
```npm run build```

## Solution

This project demonstrates how to leverage the [Office 365 Service Communications API](https://msdn.microsoft.com/office-365/office-365-service-communications-api-reference) to get a view into the current health of your Office 365 Services. <br>This project also demonstrates how to gain insight into activity within your Office 365 tenant through the [Microsoft Graph reports APIs](https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/report).

*Note: At the time of developing this project, the Microsoft Graph Reporting APIs were still under the Beta reference. They have since moved to V1. This project is still referencing the Beta endpoints.*

<img width="800" src="https://github.com/zakbelmaachi/office-365-monitoring-samples/blob/master/office-365-monitoring/src/Images/service-health-dashboard.png" />

<img width="800" src="https://github.com/zakbelmaachi/office-365-monitoring-samples/blob/master/office-365-monitoring/src/Images/sharepoint-activity-chart.png" />

<img width="800" src="https://github.com/zakbelmaachi/office-365-monitoring-samples/blob/master/office-365-monitoring/src/Images/office-365-activity-chart.png" />

## Architecture

SPA integrated with Azure AD, the Microsoft Graph, Office 365 Service Communications API, and an Azure Function App as a workaround for lack of CORS support from the Service Communications API.

## Tech Stack

- Azure AD Application with OAuth 2.0 implicit grant
- Azure Function App
- Microsoft Graph
- Office 365 Service Communications API
- React
- Office UI Fabric
- other open source tooling for charts and UI components

## Configuration

#### Register an Azure AD Application

*Note: This sample uses the AAD V1 endpoint for App Registrations. Reason being, the Office 365 Service Communications API at the time of development was not supported in the V2 endpoint. Down the road, if the API gains V2 support, a welcomed Pull Request would be migrating authentication code from ADAL.js to MSAL.js.*

- Select Required APIs & Delegated Permission Scopes
    - Microsoft Graph: Reports.Read.All, User.ReadBasic.All
    - Office 365 Management APIs: Read service health information for your organization
- Grant Consent
- Set reply URL to `http://localhost:3000/`
- [Edit application manifest](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-integrating-applications#enabling-oauth-20-implicit-grant-for-single-page-applications)
...```"oauth2AllowImplicitFlow": true,```

Update `/src/adalConfig.js` with your App ID registered against Azure AD.

```
const adalConfig = {
    clientId: '<YOUR_APP_ID>',
    ...
};
```

#### Azure Function App

Function code is located within the project `/src/FunctionApp/ServiceCommsProxy.js`

[Create your Function App](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function)

1. Select API project
2. Select JavaScript for language
3. Create :)

- [Configure CORS](https://docs.microsoft.com/en-us/azure/azure-functions/functions-how-to-use-azure-function-app-settings#cors) for `http://localhost:3000`

<img width="500px" src="https://github.com/zakbelmaachi/office-365-monitoring-samples/blob/master/office-365-monitoring/src/Images/cors-config.png" />

- This Function leverages the `request-promsie` Node package so we need to install that. [Node version and package management.](https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node#node-version-and-package-management)

Replace the contents of your Function with the contents of `ServiceCommsProxy.js`

Update line 9 with your tenant name 
```
let options = {
    uri: 'https://manage.office.com/api/v1.0/<REPLACE_WITH_YOUR_TENANT>/ServiceComms/CurrentStatus',
    // e.g. contoso.onmicrosoft.com
    ...
};
```

Update line 58 in `/src/Containers/ServiceDashboard/ServiceDashboard.js` with your Function App URL.

```
fetch('<YOUR_FUNCTION_APP_URL>', {
        ...
})
```

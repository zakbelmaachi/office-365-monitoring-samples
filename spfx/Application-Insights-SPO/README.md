## application-insights-spo

This Application Customizer demonstrates how we can use Azure Application Insights client-side SDK to track pageviews and authenticated context in SharePoint Online modern pages.

<img width="500px" src="https://github.com/zakbelmaachi/office-365-monitoring-samples/blob/master/spfx/Application-Insights-SPO/images/pageview-metrics.PNG" />

<img width="500px" src="https://github.com/zakbelmaachi/office-365-monitoring-samples/blob/master/spfx/Application-Insights-SPO/images/custom-charts.PNG" />

### Configuration

1. Create an instance of Application Insights within the Azure portal and copy instrumentation key 
2. Paste your instrumentation key in `AppInsights.ts`

### SPFx Deployment

This repository contains a Tenant-Scoped deployment script for SPFx Extensions, located in the `/Deployment` directory.

### Building the code

```bash
git clone https://github.com/zakbelmaachi/office-365-monitoring-samples.git
npm i
npm i -g gulp
gulp serve
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

```bash
gulp trust-dev-cert
gulp clean
gulp test
gulp serve
gulp bundle --ship
gulp package-solution --ship
gulp deploy-azure-storage
```

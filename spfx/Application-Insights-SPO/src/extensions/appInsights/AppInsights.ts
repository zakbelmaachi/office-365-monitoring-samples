import { AppInsights } from "applicationinsights-js";

// this sample is based on this article:
// https://blogs.msdn.microsoft.com/premier_developer/2017/05/11/add-application-insights-to-an-angular-spa/

export class AppInsightsMonitoring {

    private config: Microsoft.ApplicationInsights.IConfig = {
        instrumentationKey: "<YOUR_INSTRUMENTATION_KEY>"
    };

    constructor() {
        if (!AppInsights.config) {
            AppInsights.downloadAndSetup(this.config);
        }
    }

    public logPageView(name?: string, url?: string, properties?: any, measurements?: any, duration?: number): void {
        AppInsights.setAuthenticatedUserContext(properties.UserEmal);
        AppInsights.trackPageView(name, url, properties, measurements, duration);
    }

    public logEvent(name: string, properties?: any, measurements?: any): void {
        AppInsights.trackEvent(name, properties, measurements);
    }

}

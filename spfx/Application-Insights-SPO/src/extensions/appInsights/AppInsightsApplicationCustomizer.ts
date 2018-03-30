import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import { AppInsightsMonitoring } from "./AppInsights";

import * as strings from 'AppInsightsApplicationCustomizerStrings';

const LOG_SOURCE: string = 'AppInsightsApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IAppInsightsApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class AppInsightsApplicationCustomizer
  extends BaseApplicationCustomizer<IAppInsightsApplicationCustomizerProperties> {

  private appInsightsMonitoring: AppInsightsMonitoring = new AppInsightsMonitoring();

  @override
  public onInit(): Promise<void> {

    let isGroupSite: boolean = false;

    if (this.context.pageContext.site.group) {
      isGroupSite = true;
    }

    this.appInsightsMonitoring.logPageView(null, null, {
      SiteCollection: this.context.pageContext.web.serverRelativeUrl,
      IsGroupSite: isGroupSite,
      IsModernUI: true,
      UserEmal: this.context.pageContext.user.email
    });

    return Promise.resolve();
  }
}

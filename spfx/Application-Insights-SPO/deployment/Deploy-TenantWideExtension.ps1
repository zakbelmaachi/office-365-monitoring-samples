<#
.NOTES

This Sample Code is provided for the purpose of illustration only and is not intended to be used in a production environment.
THIS SAMPLE CODE AND ANY RELATED INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR PURPOSE.
We grant You a nonexclusive, royalty-free right to use and modify the Sample Code and to reproduce and distribute the object code form of the Sample Code, provided that You agree:
(i) to not use Our name, logo, or trademarks to market Your software product in which the Sample Code is embedded
(ii) to include a valid copyright notice on Your software product in which the Sample Code is embedded; and 
(iii) to indemnify, hold harmless, and defend Us and Our suppliers from and against any claims or lawsuits, including attorneys’ fees, that arise or result from the use or distribution of the Sample Code.

This script requires the PnP PowerShell Module - https://docs.microsoft.com/en-us/powershell/sharepoint/sharepoint-pnp/sharepoint-pnp-cmdlets?view=sharepoint-ps

Installation: Install-Module SharePointPnPPowerShellOnline (or the version respective to SharePoint 2013 or 2016)
Updating: Update-Module SharePointPnPPowerShell*

SharePoint Online ALM APIs: https://docs.microsoft.com/en-us/sharepoint/dev/apis/alm-api-for-spfx-add-ins

Ensure the user running this script has permission to perform operations on the site being accessed.

.DESCRIPTION

This script demonstrates automating the deployment of a SharePoint Framework Solution with the new SharePoint Online ALM PoSh cmdlets.

#>

# Initialize SPO connection variables
$user = ""
$creds = Get-Credential -UserName $user -Message "enter password please"
$appCatalog = "https://<your_tenant>.sharepoint.com/sites/appcatalog" #your app catalog URL may differ!


# In an automated deployment pipeline, it may make more sense to leverage App Only authentication
#
# e.g. Connect-PnPOnline -Url https://contoso.sharepoint.com -ClientId '<id>' -Tenant 'contoso.onmicrosoft.com' -PEMCertificate <PEM string> -PEMPrivateKey <PEM string>
#      
# https://github.com/SharePoint/PnP-PowerShell/tree/master/Samples/SharePoint.ConnectUsingAppPermissions

Connect-PnPOnline -Url $appCatalog -Credentials $creds
# Test Connection
Get-PnPSite


############ Deployment Steps ############

# 1) Add to app catalog
# 2) Deploy to site(s)
# 3) Install on site(s)

############ ################ ############

#### Step 1
$path = "C:/Dev/spfx/extensions/application-customizers/ApplicationInsights-Ts/sharepoint/solution/app-insights-app-customizer.sppkg"

Add-PnPApp -Path $path

#### Step 2
$appId = (Get-PnPApp | ?{$_.Title -like "*app-insights*"}).id

# Use -SkipFeatureDeployment switch only when enabling Tenant wide deployment scope
Publish-PnPApp -Identity $appId -SkipFeatureDeployment

#### Step 3 (wrap the remaining commands in a foreach loop, iterating over each site you wish to install extension on)
# Disconnect from current context and create new context
$site = "https://<your_tenant>.sharepoint.com/<your_relative_url>"
Connect-PnPOnline -Url $site -Credentials $creds

#Test Connection
Get-PnPSite

# Install app for current site context
Install-PnPApp -Identity $appId

# Install-PnPApp installs the extension on the site and installs the custom action automatically
# Get-PnPCustomAction

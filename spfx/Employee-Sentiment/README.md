 ## sentiment-anlysis

This SharePoint Framework client-side web part levarages the [Text Analytics API](https://azure.microsoft.com/en-us/services/cognitive-services/text-analytics/) for Sentiment Analysis. This is one of the many capabilities within the [Azure Cognitive Services](https://azure.microsoft.com/en-us/services/cognitive-services/) suite.

<img width="350px" src="https://github.com/zakbelmaachi/office-365-monitoring-samples/blob/master/spfx/Employee-Sentiment/images/high-sentiment.PNG" /><img width="350px" src="https://github.com/zakbelmaachi/office-365-monitoring-samples/blob/master/spfx/Employee-Sentiment/images/medium-sentiment.PNG" />

### Sentiment Scoring

Each text string sent to the Text Analytics endpoint API is represented as follows:
```
  { 
    language: 'en', 
    id: '1', 
    text: 'I absolutely love JavaScript development. It\'s so much fun!' 
   },
   ...
```
You can expect a return object with the associated sentiment score (0 - 1) as follows:
```
{
  score: 0.9696099162101746, 
  id: "1"
 }
```

### Configuration

1. Create a [Cognitive Services account](https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-apis-create-account) within the Azure Portal

2. In `EmployeeSentimentWebpart.ts` replace this token with your resptive key  <br>
  ```"Ocp-Apim-Subscription-Key": "<YOUR_SUBSCRIPTION_KEY>",```
  
3. In `EmployeeSentimentWebpart.ts` Replace the Cognitive Services endpoint with your own on line `159`

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

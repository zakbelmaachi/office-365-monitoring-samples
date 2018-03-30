import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './EmployeeSentiment.module.scss';
import * as strings from 'employeeSentimentStrings';
import { IEmployeeSentimentWebPartProps } from './IEmployeeSentimentWebPartProps';

// Http / MockHttp imports 
import MockHttpClient from './MockHttpClient';
import {
  HttpClient,
  HttpClientResponse
} from '@microsoft/sp-http';



// Interfaces -----------------------------------------

// Sentiment Documents for POST body
export interface IDocuments {
  documents: IDocument[];
}

export interface IDocument {
  language: string;
  id: string;
  text: string;
}

// Sentiment Response from POST req
export interface ISentiments {
  scores: ISentiment[];
  errors: any[];
}

export interface ISentiment {
  score: number;
  id: string;
}

// Web part -----------------------------------------

export default class EmployeeSentimentWebPart extends BaseClientSideWebPart<IEmployeeSentimentWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.helloWorld}">
        <div class="${styles.container}">
          <div class="ms-bgColor-neutralLighterAlt ms-fontColor-neutralPrimaryAlt ${styles.row}">
            <div class="${styles.flexCenter}">
              <h2>Current Employee Sentiment</h2>
              <hr class="${styles.lineBreak}">
              <div id="sentiment-score" class="${styles.sentimentScore}">
              </div>
            </div>
          </div>
        </div>
      </div>`;
    this.renderSentimentAsync();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  // property pane is not configured - 
  // an appropriate configuration would be 
  // accepting the Cognitive Services endpoint so it's not hard coded
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                // PropertyPaneTextField('description', {
                //   label: strings.DescriptionFieldLabel
                // }),
                // PropertyPaneDropdown('endpoint', {
                //   label: 'Text Analytics Endpoint',
                //   options: [
                //     { key: 'topics', text: 'Topics' },
                //     { key: 'sentiment', text: 'Sentiment' },
                //     { key: 'keyprhases', text: 'KeyPhrases' }
                //   ]
                // })
              ]
            }
          ]
        }
      ]
    };
  }

  // a better approach would use Promise.all() to avoid nesting promises
  private renderSentimentAsync(): void {
    this.getSentimentDocuments()
      .then((response) => {
        this.getSentiments(response)
          .then((sentiments) => {
            this.getAverageScores(sentiments)
              .then((avgSentiment) => {
                this.renderSentimentsUI(avgSentiment);
              });
          });
      });
  }

  // get formatted sentiment documents from MockHttpClient
  private getSentimentDocuments(): Promise<IDocuments> {
    return MockHttpClient.get()
      .then((data: IDocument[]) => {
        const sentimentDocuments = { documents: data };
        return sentimentDocuments;
      }) as Promise<IDocuments>;
  }

  private getAverageScores(sentiments: ISentiment[]): Promise<number> {
    return new Promise<number>((resolve) => {
      let sum: number = 0;
      for (let i of sentiments) { sum += i.score; }
      let avg = (this.divideScores(sum, sentiments.length)) * 100;
      resolve(avg);
    });
  }

  private divideScores(scoreSum: number, denom: number): number {
    return scoreSum / denom;
  }

  // render average sentiment in UI 
  private renderSentimentsUI(avgScore: number): void {
    const html: Element = this.domElement.querySelector('#sentiment-score');
    let content: string;

    if(avgScore <= 50) {
      content = `<span style="color: #e81123">${avgScore.toFixed(1).toString()}%</span>`;
    } else if (avgScore > 50 && avgScore <= 75) {
      content = `<span style="color: #ff8c00">${avgScore.toFixed(1).toString()}%</span>`;
    } else if (avgScore > 75) {
      content = `<span style="color: #bad80a">${avgScore.toFixed(1).toString()}%</span>`;
    }

    html.innerHTML = content;
  }

  // post sentiment documents via HttpClient and return json response of type ISentiment[]
  private getSentiments(documents: IDocuments): Promise<ISentiment[]> {
    return this.context.httpClient.post('<YOUR_TEXT_ANALYTICS_ENDPOINT>',
      HttpClient.configurations.v1, {
        body: JSON.stringify(documents),
        headers: {
          "Ocp-Apim-Subscription-Key": "<YOUR_SUBSCRIPTION_KEY>",
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).then((response: HttpClientResponse) => {
        return response.json();
      }).then(json => {
        return json.documents;
      }) as Promise<ISentiment[]>;
  }
}

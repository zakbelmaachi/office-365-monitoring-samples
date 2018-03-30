declare interface IEmployeeSentimentStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'employeeSentimentStrings' {
  const strings: IEmployeeSentimentStrings;
  export = strings;
}

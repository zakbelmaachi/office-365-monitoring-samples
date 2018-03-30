import { IDocument } from './EmployeeSentimentWebPart';

export default class MockHttpClient {

    // low sentiment - < 50
    // private static _documents: IDocument[] = [
    //     { language: 'en', id: '0', text: 'I had a bad time riding bikes this week.' },
    //     { language: 'en', id: '1', text: 'I injured myself snowboarding and it was very painful for about a month.' },
    //     { language: 'en', id: '2', text: 'Austin was not fun. The weather was poor...kind of muggy and no sun!' },
    //     { language: 'en', id: '3', text: 'It always rains in Seattle' },
    //     { language: 'en', id: '4', text: 'My flip flops ripped at the beach. Sad!' }
    // ];

    // medium sentiment - > 50 && < 75
    // private static _documents: IDocument[] = [
    //     { language: 'en', id: '0', text: 'I had fun in Austin. The weather was very nice...I was happy.' },
    //     { language: 'en', id: '1', text: 'I absolutely love JavaScript development. It\'s so much fun!' },
    //     { language: 'en', id: '2', text: 'Traveling is a not fun' },
    //     { language: 'en', id: '3', text: 'Mountain biking this week was okay' },
    //     { language: 'en', id: '4', text: 'My work environment is very positive' }
    // ];

    // positive sentiment - < 75
    private static _documents: IDocument[] = [
        { language: 'en', id: '0', text: 'I had fun in Austin. The weather was very nice...I was happy.' },
        { language: 'en', id: '1', text: 'I absolutely love JavaScript development. It\'s so much fun!' },
        { language: 'en', id: '2', text: 'Traveling is a great time, I get to meet so many nice people' },
        { language: 'en', id: '3', text: 'Mountain biking this week was exhilerating' },
        { language: 'en', id: '4', text: 'My work environment is very positive' }
    ];

    public static get(): Promise<IDocument[]> {
        return new Promise<IDocument[]>((resolve) => {
            resolve(MockHttpClient._documents);
        });
    }

}
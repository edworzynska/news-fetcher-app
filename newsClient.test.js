const NewsClient = require('./newsClient');

require('jest-fetch-mock').enableMocks();

describe('NewsClient', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('fetches todays articles', (done) => {
        const mockResponse = {
            response: {
                results: [
                    {
                        id: 'test1',
                        webTitle: 'Test Article 1',
                        fields: { thumbnail: 'http://test1.com/image.jpg' },
                        webUrl: 'http://test1.com'
                    },
                    {
                        id: 'test2',
                        webTitle: 'Test Article 2',
                        fields: { thumbnail: 'http://test2.com/image.jpg' },
                        webUrl: 'http://test2.com'
                    }
                ]
            }
        };

        fetch.mockResponseOnce(JSON.stringify(mockResponse));

        const client = new NewsClient();

        client.getTodaysNews((articles) => {
            expect(articles.length).toBe(2);
            expect(articles[0].title).toBe('Test Article 1');
            expect(articles[0].thumbnail).toBe('http://test1.com/image.jpg');
            done();
        });
    });

    it('handles errors', (done) => {
        fetch.mockReject(new Error('Unable to load the data'));

        const client = new NewsClient();

        const successCallback = jest.fn();
        const errorCallback = jest.fn((error) => {
            expect(error.message).toBe('Unable to load the data');
            expect(successCallback).not.toHaveBeenCalled();
            expect(errorCallback).toHaveBeenCalled(); 
            done();
        });
        client.getTodaysNews(successCallback, errorCallback);
    });

    it('searches for news and fetches them', (done) => {
        const mockResponse = {
            response: {
                results: [
                    {
                        id: 'test1',
                        webTitle: 'Test Article 1',
                        fields: { thumbnail: 'http://test1.com/image.jpg' },
                        webUrl: 'http://test1.com'
                    },
                    {
                        id: 'test2',
                        webTitle: 'Test Article 2',
                        fields: { thumbnail: 'http://test2.com/image.jpg' },
                        webUrl: 'http://test2.com'
                    }]}};
                    fetch.mockResponseOnce(JSON.stringify(mockResponse));

        const client = new NewsClient();

        client.searchNews("keyword", (articles) => {
            expect(articles.length).toBe(2);
            expect(articles[0].title).toBe('Test Article 1');
            expect(articles[0].thumbnail).toBe('http://test1.com/image.jpg');
            done();
        });
    });
});
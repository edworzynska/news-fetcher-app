/**
 * @jest-environment jsdom
 */

require('jest-fetch-mock').enableMocks();

const fs = require('fs');
const NewsView = require('./newsView');
const NewsModel = require('./newsModel');
const NewsClient = require('./newsClient');
const { enableFetchMocks } = require('jest-fetch-mock');

describe('Page view', () => {
    beforeEach(() => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      fetch.resetMocks();
    });

    it('displays an article', () => {
        const model = new NewsModel();
        const client = new NewsClient();
        const view = new NewsView(model, client);

        model.addArticle({
            id: 'test1',
            webTitle: 'Test Article 1',
            fields: { thumbnail: 'http://test1.com/image.jpg' },
            publicationDate: '2014-10-05T22:30',
            webUrl: 'http://test1.com'
        });
        view.displayNews();
        expect(document.querySelectorAll('div.article').length).toEqual(1);

    });
    it('displays todays news', () => {
        const model = new NewsModel();
        const clientMock = new NewsClient();
        const view = new NewsView(model, clientMock);

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

        view.displayTodaysNews(() => {
            expect(articles.length).toBe(2);
            expect(articles[0].title).toBe('Test Article 1');
            expect(articles[0].thumbnail).toBe('http://test1.com/image.jpg');
            done();
        });
    });
    it('searches and displays news', () => {
        const model = new NewsModel();
        const clientMock = new NewsClient();
        const view = new NewsView(model, clientMock);

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

        view.searchNews(() => {
            expect(articles.length).toBe(2);
            expect(articles[0].title).toBe('Test Article 1');
            expect(articles[0].thumbnail).toBe('http://test1.com/image.jpg');
            done();
        });
    });
    it('resets articles on the page', () => {
        const model = new NewsModel();
        const client = new NewsClient();
        const view = new NewsView(model, client);

        model.addArticle({
            id: 'test1',
            webTitle: 'Test Article 1',
            fields: { thumbnail: 'http://test1.com/image.jpg' },
            publicationDate: '2014-10-05T22:30',
            webUrl: 'http://test1.com'
        });
        view.displayNews();
        expect(document.querySelectorAll('div.article').length).toEqual(1);

        view.resetDisplay();
        expect(document.querySelectorAll('div.article').length).toEqual(0);
    });
});
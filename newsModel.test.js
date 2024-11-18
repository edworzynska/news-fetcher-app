const Model = require('./newsModel');
const Article = require('./article');

describe('Model', () => {
    let news;
    let article;
    beforeAll(() => {
        news = new Model();
    });
    it('initialises an empty array of articles', () => {
        expect(news.getArticles().length).toEqual(0);
        expect(news.getArticles()).toEqual([]);
    });
    it('adds an article and returns it', () => {
        article = new Article(123, "title", "://test.img.com", "://test.com");
        news.addArticle(article);
        expect(news.getArticles().length).toEqual(1);
        expect(news.getArticles()).toEqual([article]);
    });
    it('resets the list of articles', () => {
        expect(news.getArticles().length).toEqual(1);
        expect(news.getArticles()).toEqual([article]);
        news.reset();
        expect(news.getArticles().length).toEqual(0);
        expect(news.getArticles()).toEqual([]);
    });
})
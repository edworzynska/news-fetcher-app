class NewsModel {

    constructor() {
        this.articles = [];
    }

    getArticles(){
        return this.articles;
    }

    setArticles(articles) {
        this.articles = articles;
    }

    addArticle(article) {
        this.articles.push(article);
    }

    reset(){
        this.articles.length = 0;
    }
}

module.exports = NewsModel;
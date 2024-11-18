class Article {

    constructor(id, title, imageUrl, articleUrl, webPublicationDate){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.articleUrl = articleUrl;
        this.webPublicationDate = webPublicationDate;
    }

    getTitle(){
        return this.title;
    }

}

module.exports = Article;
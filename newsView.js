const Model = require('./newsModel');
const Client = require('./newsClient');
const Article = require('./article');

class NewsView{
    
    constructor(model, client){
        this.mainContainer = document.querySelector('#main-container');
        this.searchInput = document.querySelector('#search-input');
        this.buttonEl = document.querySelector('#search-button');
        this.model = model;
        this.client = client;

        this.buttonEl.addEventListener('click', () => {
            const searchBy = this.searchInput.value.trim();
            console.log('Search by:', searchBy);
            if (searchBy){
                this.searchNews(searchBy);
            }
            else {
                this.displayTodaysNews();
            }
            
         });
    }

    displayTodaysNews(){
        this.client.getTodaysNews((articles) => {
            this.model.setArticles(articles);
            this.displayNews();
        },
    (error) => {
        console.error("failed to load the data", error);
    });
    }

    searchNews(searchBy){
        this.client.searchNews(searchBy, (articles) => {
            this.model.setArticles(articles);
            this.displayNews();
        }, (error) => {
            this.displayError(), error;
        });
    }

    displayNews(){
        
        this.resetDisplay();

        const articles = this.model.getArticles();
        articles.forEach((article) => {
            const articleEl = document.createElement('div');
            articleEl.className = 'article';

            const dateEl = document.createElement('p');
            dateEl.textContent = article.publicationDate.slice(0, 10) + " at " + article.publicationDate.slice(11, 19);
            articleEl.appendChild(dateEl);

            const titleEl = document.createElement('h3');
            titleEl.textContent = article.title;

            var anchor = document.createElement('a');
            anchor.href = article.url;
            anchor.appendChild(titleEl);

            articleEl.appendChild(anchor);
          
            if (article.thumbnail){
                const imgEl = document.createElement('img');
                imgEl.src = article.thumbnail;
                imgEl.alt = article.title;

                var anchor2 = document.createElement('a');
                anchor2.href = article.url;
                anchor2.appendChild(imgEl);

                articleEl.appendChild(anchor2);
            }

            this.mainContainer.append(articleEl);
        });
    }

    resetDisplay(){
        this.mainContainer.querySelectorAll('div.article').forEach(
            message => message.remove()
          );
    }

    displayError(){
        const errorEl = document.createElement('div');
        errorEl.textContent = "Something went wrong!";
        errorEl.className = 'err';
        this.mainContainer.append(errorEl);
    }
}

module.exports = NewsView;
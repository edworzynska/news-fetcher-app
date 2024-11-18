const apiKey = require('./apiKey');

class NewsClient{

    getTodaysNews(callback, errCallback){
        const today = new Date().toISOString().slice(0, 10);
        const url = `https://content.guardianapis.com/search?from-date=${today}&to-date=${today}&show-fields=thumbnail&api-key=${apiKey}`;
        console.log(today);
        console.log(url);

        fetch(url)
        .then(response => response.json())
        .then(data => {
            const articles = data.response.results.map((articleData) => ({
                id: articleData.id,
                title: articleData.webTitle,
                thumbnail: articleData.fields?.thumbnail,
                url: articleData.webUrl,
                publicationDate: articleData.webPublicationDate
            }));
            if (callback) callback(articles);
        })
        .catch((error) => {
            console.error('Unable to load the data', error);
            if (errCallback) errCallback(error);
        });
    }

    searchNews(searchBy, callback, errCallback){
        const today = new Date().toISOString().slice(0, 10);
        const url = `https://content.guardianapis.com/search?q=${encodeURIComponent(searchBy)}&show-fields=thumbnail&order-by=newest&api-key=${apiKey}`;
        console.log(url);

        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const articles = data.response.results.map((articleData) => ({
                id: articleData.id,
                title: articleData.webTitle,
                thumbnail: articleData.fields?.thumbnail,
                url: articleData.webUrl,
                publicationDate: articleData.webPublicationDate
            }));
            if (callback) callback(articles);
        })
        .catch((error) => {
            console.error('Unable to load the data', error);
            if (errCallback) errCallback(error);
        });
    }
}

module.exports = NewsClient;
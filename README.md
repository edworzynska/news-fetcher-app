# News App

The __News App__ allows users to view the latest news articles and search for news based on a query. It fetches data from the Guardian API and displays articles, including their titles, publication dates, and thumbnails.

## Tech Stack

**JavaScript**: handling the app logic and interactions  
**Jest**: testing framework  
**HTML/CSS**: frontend structure and styling  
**Guardian API**: used to fetch the articles  
**esbuild**: used for bundling the JavaScript files


## Features:

- __Display today’s news__: automatically fetches and displays the latest news for today on the homepage
- __Search news__: users can search for the interesting topics, the latest articles matching the criteria are displayed on the homepage
- __Go to the article__: Titles and thumbnails of the articles are dynamically hyperlinked - users are directed to the the original article once they click

## Key Learnings

Working on this project taught me how to display data dynamically on a website, interact with APIs, and manipulate the DOM and how to handle user's input.
Also, I got more comfortable with frontend development and improved my JavaScript skills. 
Overall, this project gave me a deeper understanding of web development.

### Installation Guide

#### Prerequisites

- valid Guardian API key - you can register here: https://bonobo.capi.gutools.co.uk/register/developer
- Node.js (v12 or higher)
- Git for cloning the repository
 
#### Steps:

- Clone the repository:  
<code>git clone https://github.com/edworzynska/news-fetcher-app</code>

- Navigate to the project directory:  
  <code>cd news-app</code>

- Create the API Key file:
  In the root of the project, create a new file named **apiKey.js** with the following content:
  <code>module.exports = '[your-API-key]';</code>
- Install dependencies:  
  <code> npm install</code>
- Build the project using esbuild  
<code>npm run build</code>
- To run tests:    
  <code> npm test</code>  
- Start the application - the application will be opened in your browser  
  <code>open index.html</code>

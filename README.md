# DUCKLYRICS
#### Video Demo: https://www.youtube.com/watch?v=dbkubRGtvxQ
#### Description:

#####  Abstract
The project Duck Lyrics is a website to search songs and see the lyrics. It also shows a short biographical information about the artist. In the lyrics part, you can press a button to transform all the words of the lyrics in 'quack', that's why the name is Duck Lyrics. You can see the website in https://duck-lyrics-project.web.app/

##### What are the pages of the site
The homepage of the site is very simple, it has a form for the user to write a word or phrase to search for songs. When the user submit the search form, It will show some lists of cards with the song title, artist name, and a link that the user can click to be redirect to the lyrics page. This part has an infinite scroll, so, when the user reachs the end this page, more songs will start to load and appear. If the user did not search anything, this page will show random songs to the user.

In the lyrics page, the user will see a image of the cover art of the song; a list of some information of the song like album, artist name, song title, and release date; An youtube video of the song that the user can play; and the lyrics. In the lyrics, there is a button that will "translate" the songs to duck language, which means all the words in the lyrics will be replaced by "quack". Sometimes the song do not have a cover art or an youtube video, so not each of the song will have all the items. There is a link in this page to redirect the user to the artist page.

In the artist page there is an image of the artist and a short biographical of the same.

The last page is the about page. It contains a text saying a little about the site.

Every page has a layout with a nav bar in the top, this nav bar contains three links. They are the about link to go to the about page; the one in the middle with the logo and name of the site to go to the homepage; and the search link to also go to the homepage. 


##### How the site was made
This project is a single page application that was made using React and React Router, and was hosted using Cloudflare, link is https://ducklyrics.pages.dev. 

##### The design of the site
The logo is a funny duck, and was made using Inkscape. The site and logo have two main colors, trying to remind the colors of a duck, a yellow similar to a duck beak, and a green of a duck head. In the site, these two colors are used to make a linear color gradient.  The font selected is Quicksand, from google fonts, it was chosen because it is a rounded font, which are normally prefer for playful designs.

##### How the site gets the information
The website uses the Genius API to get the information about the song, the song image, the youtuber video link of the song and the information about the artist. However, the Genius API do not give the lyrics. To get this part, since the Genius API gives the link to their webpage related of the song, and this webpage contais the lyrics, it's made a request to this webpage. But, if is done a direct request, the browser will not allow because of CORS policy. To overcome this, we do make a indirect request using a proxy, and this proxy will modify the response to allow the request to being show in the site.

##### What are the files in this project 
It follows a normal react folder structure. The file package-json contais all the dependencies of the project, which means all the external javascript libraries used in the project, including react. 

The folder public contains the index.html that will be send to the user.

The last folder is the src, it contains the react components that will be render in the site.

##### How to use files in this project
You will need to use  Node.js, to use the files of the project. If you want to use the files of this project for production and deployment, you need to use two commands  "npm install", then "npm run build" that creates an new folder "build" wich can be used for deployment. To use this project in your machine with a local development server, you need use "npm install", then "npm start".


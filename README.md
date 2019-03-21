# LIRI Bot

### Overview
 LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

 ### Commands

*`node liri.js concert-this <artist/band name here>`*<br>
	This will search the Bands in Town Artist Events API and provide the `Venue name`, `Venue location`, and `Date of the Event`
<iframe width="560" height="315" src="https://www.youtube.com/embed/DAic-IU_t0k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

*`node liri.js spotify-this-song '<song name here>'`*<br>
	This will show the following information about the song using the Spotify API.  It will display a list of albums with that song title, displaying `artist(s)`, `title`, `album name`, and `preview URL`
<iframe width="560" height="315" src="https://www.youtube.com/embed/6zUWpWTGNL8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

*`node liri.js movie-this '<movie name here>'`*<br>
	This will output information about the movie using the OMDB API.  The following information will be displayed:
	* Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
<iframe width="560" height="315" src="https://www.youtube.com/embed/Kg0H4bK9FIc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

*`node liri.js do-what-it-says`*<br>
	This runs a random command that is stored on the `random.txt` file
<iframe width="560" height="315" src="https://www.youtube.com/embed/JYgCcQ2ld4w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br>
##### The Random File:
<img src="./docs/random.png" alt="random.txt">

### BONUS
The file `log.txt` will contain a list of each command that was ran.
#####The Log File:
<img src="./docs/log.png" alt="log.txt">

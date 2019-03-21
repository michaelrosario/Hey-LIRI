# LIRI Bot

### Overview
 LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

 ### Commands

*`node liri.js concert-this <artist/band name here>`*<br>
	This will search the Bands in Town Artist Events API and provide the `Venue name`, `Venue location`, and `Date of the Event`
       <video width="320" height="200" controls preload> 
           <source src="./docs/concert-this.mp4"></source> 
           <source src="./docs/concert-this.webm"></source> 
       </video>

*`node liri.js spotify-this-song '<song name here>'`*<br>
	This will show the following information about the song using the Spotify API.  It will display a list of albums with that song title, displaying `artist(s)`, `title`, `album name`, and `preview URL`
       <video width="320" height="200" controls preload> 
           <source src="./docs/spotify-this-song.mp4"></source> 
           <source src="./docs/spotify-this-song.webm"></source> 
       </video>

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
       <video width="320" height="200" controls preload> 
           <source src="./docs/movie-this.mp4"></source> 
           <source src="./docs/movie-this.webm"></source> 
       </video>

*`node liri.js do-what-it-says`*<br>
	This runs a random command that is stored on the `random.txt` file
       <video width="320" height="200" controls preload> 
           <source src="./docs/do-what-it-says.mp4"></source> 
           <source src="./docs/do-what-it-says.webm"></source> 
       </video>
<br>
#####The Random File:
<img src="./docs/random.png" alt="random.txt">

### BONUS
The file `log.txt` will contain a list of each command that was ran.
#####The Log File:
<img src="./docs/log.png" alt="log.txt">

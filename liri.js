require("dotenv").config();
const 	axios = require('axios');
const 	moment = require('moment');
var 	fs 	= require("fs");
var 	Spotify = require('node-spotify-api');

// import the keys for APIs
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
//console.log("spotify",spotify);

var omdb = keys.omdb;
//console.log("omdb",omdb);

var userInput = process.argv;
//console.log('userInput',userInput);

var command = userInput[2];
//console.log("command",command);

var commandValue = userInput[3];
//console.log("commandValue",commandValue);

runLIRI(command,commandValue);

function runLIRI(command,commandValue){
	//console.log("command",command);
	//console.log("commandValue",commandValue);
	switch(command) {
	  case "concert-this":
	    concertThis(commandValue);
	    break;
	  case "spotify-this-song":
	    spotifyThis(commandValue);
	    break;
	  case "movie-this":
	    omdbThis(commandValue);
	    break;
	  case "do-what-it-says":
	    doWhatItSays();
	    break;
	  default:
	    console.error(`
	    	I'M SORRY I DO NOT KNOW WHAT YOU ADDED, USE THESE SPECIFIC COMMANDS
	    	--------------------------------------------------------------------
	    	node liri concert-this '<artist/band name here>'
	    	node liri spotify-this-song '<song name here>'
	    	node liri movie-this '<movie name here>'
	    	node liri do-what-it-says
	    `);
	    break;
	}
}


function printHeader(number){
	var divider = "-------------------------------------------------------------------";
	if(number){
		console.log(`${divider} [${number < 10 ? "0"+number : number }]`);
	} else {
		console.log(`${divider} [//]`);
	}
}

function doWhatItSays(){

	fs.readFile("./random.txt", "utf8", function(err, data) {
	  if (err) {
	    return console.log(err);
	  }

	  // Break the string down by comma separation and store the contents into the output array.
	  var output = data.split(";");
	  //console.log('output',output);
	  var random = Math.floor(Math.random()*output.length);
	  //console.log('random', random);
	  var entry = output[random].split(",");
	  var command = entry[0].trim();
	  var commandValue = entry[1].trim().replace(/\"/g,'');
	  printHeader();
	  console.log(`LOADING A RANDOM ENTRY <node liri ${command} "${commandValue}">`);
	  runLIRI(command,commandValue);

	});

}

// This uses the OMDB API to search for movies
function omdbThis(input){

	if(input){
	
		var movieName = input.trim().replace(/\s/g, '+');

		// Then run a request with axios to the OMDB API with the movie specified
		var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey="+omdb.key;

		// This line is just to help us debug against the actual URL.
		//console.log(queryUrl);

		axios.get(queryUrl).then(
		  function(response) {
		  	printHeader();
		  	console.log(`RESULTS FOR <${input.toUpperCase()}>`)
		  	printHeader();
		  	var result = response.data;
		  	//console.log(result);
		    console.log("Title: " + result.Title);
		    console.log("Year: " + result.Year);
		    for(var i = 0; i < result.Ratings.length; i++){
		    	var rating = result.Ratings[i];
		    	if(rating.Source == "Internet Movie Database"){
		    		console.log(`IMDB Rating: ${result.Ratings[i].Value}`);
		    	}
		    	if(rating.Source == "Rotten Tomatoes"){
		    		console.log(`${result.Ratings[i].Source} Rating: ${result.Ratings[i].Value}`);
		    	}
		    }
		    console.log("Country: " + result.Country);
		    console.log("Language: " + result.Language);
		    console.log("Plot: " + result.Plot);
		    console.log("Actors: " + result.Actors);
		    printHeader();
		  }
		);
	} else {
		console.error("Invalid input for movie-this... for now here is MR. Nobody");
		omdbThis("Mr. Nobody");
	}

}


// This function uses the Spotify API to get song information
// Documentation: https://www.npmjs.com/package/node-spotify-api
function spotifyThis(input){

	if(input){

		var spotifyQuery = input.trim().replace(/\s/g, '+');

		spotify.search({ type: 'track', query: spotifyQuery }, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
		 
			//console.log(data); 
			var results = data.tracks.items;
			printHeader();
			console.log(`RESULTS FOR <${input.toUpperCase()}>`)
			for(var i = 0; i < results.length; i++){
				var album = results[i].album;
		    	//console.log(results[i]);
		    	//console.log(JSON.stringify(album.artists));
		    	printHeader(i+1);
		    	console.log(`Artist(s): ${album.artists[0].name}`);
		    	console.log(`Title: ${results[i].name}`);
		    	console.log(`Album: ${album.name}`);
		    	console.log(`Sample URL: ${album.external_urls.spotify}`);
			}
			printHeader();

		});

		
	} else {
		console.error("Invalid input for spotify-this-song... for now here is 'The Sign' by Ace of Base");
		spotifyThis("The Sign by Ace of Base");

	}
}

// This function uses the Bands in Town API to get artist events
function concertThis(input){

	if(input){
		var artist = input.trim();
		var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
		//console.log('url',url);
		axios.get(url)
		  .then(function (response) {
		    // handle success
		    //console.log(response);
		    var results = response.data;
		    printHeader();
		    console.log(`RESULTS FOR <${artist.toUpperCase()}>`);
		    for(var i = 0; i < results.length; i++){
		    	var venue = results[i].venue;
		    	printHeader(i+1);
		    	console.log("Name of Venue: "+venue.name);
		    	console.log("Venue location: "+venue.city+", "+venue.country);
		    	console.log("Date of the Event: "+ moment(results[i].datetime).format('MM/DD/YYYY'));	
		    }
		    printHeader();

		  })
		  .catch(function (error) {
		    // handle error
		    console.log(error);
		  })
		  .then(function () {
		    // always executed
		});
	} else {
		console.error("Invalid input for concert-this");
	}
}
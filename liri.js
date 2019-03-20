require("dotenv").config();
const axios = require('axios');
const moment = require('moment');
var Spotify = require('node-spotify-api');

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

switch(command) {
  case "concert-this":
    concertThis(commandValue);
    break;
  case "spotify-this-song":
    spotifyThis(commandValue);
    break;
  case "movie-this":
    // code block
    break;
  case "do-what-it-says":
    // code block
    break; 
  default:
    console.error(`
    	I'M SORRY I DO NOT KNOW WHAT YOU ADDED, USE THESE SPECIFIC COMMANDS:
    	node liri concert-this '<artist/band name here>'
    	node liri spotify-this-song '<song name here>'
    	node liri movie-this '<movie name here>'
    	node liri do-what-it-says

    `)
}

function printHeader(number){
	if(number){
		console.log(`=================================================================== [${number < 10 ? "0"+number : number }]`);
	} else {
		console.log(`=================================================================== [//]`);
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
		console.error("Invalid input for spotify-this-song");
	}
}

// This function uses the Bands in Town API to get artist events
function concertThis(input){

	if(input){

		var artist = input.trim();
		var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

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
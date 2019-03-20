console.log('this is loaded');

exports.spotify = {
	id: process.env.SPOTIFY_ID,
	secret: process.env.SPOTIFY_SECRET,
	token: process.env.SPOTIFY_TOKEN
};

exports.omdb = {
	key: process.env.OMDB_KEY
};
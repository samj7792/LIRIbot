require("dotenv").config();

var keys = require("./keys.js");

var moment = require("moment");


console.log(process.argv);


switch (process.argv[2]) {

    case "movie-this":

        //console.log("case 1");

        omdb();

        break;
    
    case "spotify-this-song":

        spotify();

        break;
    
    case "concert-this": 

        concert();

        break;

    case "do-what-it-says":

        doIt();

        break;
}



// do-what-it-says function
function doIt() {

    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }

        console.log(data);
        
        var dataArr = data.split(", ");

        console.log(dataArr);

        for (var i=0; i < dataArr.length; i++) {
            switch (dataArr[0]) {

                case "movie-this":
            
                    // Include the axios npm package
                    var axios = require("axios");

                    // Grab or assemble the movie name and store it in a variable called "movieName"
                    var movieName = "";

                    for ( var i = 1; i < dataArr.length ; i++) {
                        movieName += dataArr[i] + "+";
                    }

                    // Then run a request with axios to the OMDB API with the movie specified
                    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

                    // This line is just to help us debug against the actual URL.
                    // console.log(queryUrl);

                    // Then create a request with axios to the queryUrl
                    // ...
                    axios.get(queryUrl).then(
                        function(response) {
                            //console.log(response);
                            var info = response.data;
                            console.log("Title: " + info.Title);
                            console.log("Release Year: " + info.Year);
                            console.log("IMDB Rating: " + info.imdbRating);
                            console.log("Rotten Tomatoes Score: " + info.Ratings[1].Value);
                            console.log("Country of Production: " + info.Country);
                            console.log("Languages: " + info.Language);
                            console.log("Plot: " + info.Plot);
                            console.log("Actors: " + info.Actors);
                        }).catch(function(error) {
                        if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log("---------------Data---------------");
                        console.log(error.response.data);
                        console.log("---------------Status---------------");
                        console.log(error.response.status);
                        console.log("---------------Status---------------");
                        console.log(error.response.headers);
                        } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an object that comes back with details pertaining to the error that occurred.
                        console.log(error.request);
                        } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", error.message);
                        }
                        console.log(error.config);
                    });
            
                    break;
                
                case "spotify-this-song":
            
                    var Spotify = require('node-spotify-api');
 
                    var spotify = new Spotify(keys.spotify);

                    var songName = "";

                    for ( var i = 1; i < dataArr.length ; i++) {
                        songName += dataArr[i] + " ";
                    }
                    
                    spotify
                    .search({ type: 'track', query: songName })
                    .then(function(response) {

                        // JSON response
                        // console.log(JSON.stringify(response, null, 2));

                        console.log("Artist(s): " + response.tracks.items[0].album.artists[0].name);
                        console.log("Song Name: " + response.tracks.items[0].name);
                        console.log("Link to Song: " + response.tracks.items[0].external_urls.spotify);
                        console.log("Album: " + response.tracks.items[0].album.name);

                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            
                    break;
                
                case "concert-this": 
            
                    // Include the axios npm package
                    var axios = require("axios");

                    var bandsintown = require('bandsintown')("codingbootcamp");

                    var artist = "";

                    for ( var i = 1; i < dataArr.length ; i++) {
                        artist += dataArr[i] + "%20";
                    }
                    console.log(artist);

                    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
                
                    axios.get(queryUrl).then(
                    function(response) {
                        //console.log(response);
                        
                        //console.log("Data%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                        //console.log(response.data);

                        var data = response.data;

                        for (var i = 0 ; i < data.length ; i++){
                            console.log("----------Venue----------");
                            console.log(data[i].venue.name);
                            console.log("----------Location----------");
                            console.log(data[i].venue.city + ", " + data[i].venue.region + ", " + data[i].venue.country);
                            console.log("----------Date----------");
                            console.log(moment(data[i].datetime).format('MMMM Do YYYY, h:mm:ss a'));

                            console.log("\n\n")
                        }
                        
                        }).catch(function(error) {
                        if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log("---------------Data---------------");
                        console.log(error.response.data);
                        console.log("---------------Status---------------");
                        console.log(error.response.status);
                        console.log("---------------Status---------------");
                        console.log(error.response.headers);
                        } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an object that comes back with details pertaining to the error that occurred.
                        console.log(error.request);
                        } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", error.message);
                        }
                        console.log(error.config);
                    });
            
                    break;
            }
        }
    });
}



// concert-this function
function concert() {

    // Include the axios npm package
    var axios = require("axios");

    var bandsintown = require('bandsintown')("codingbootcamp");

    var artist = "";

    for ( var i = 3; i < process.argv.length ; i++) {
        artist += "%20" + process.argv[i];
    }

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
 
    axios.get(queryUrl).then(
        function(response) {
            //console.log(response);
            
            //console.log("Data%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
            //console.log(response.data);

            var data = response.data;

            for (var i = 0 ; i < data.length ; i++){
                console.log("----------Venue----------");
                console.log(data[i].venue.name);
                console.log("----------Location----------");
                console.log(data[i].venue.city + ", " + data[i].venue.region + ", " + data[i].venue.country);
                console.log("----------Date----------");
                console.log(moment(data[i].datetime).format('MMMM Do YYYY, h:mm:ss a'));

                console.log("\n\n")
            }
            
        }).catch(function(error) {
        if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
        } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
        } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        }
        console.log(error.config);
    });
}



// spotify-this-song function
function spotify() {

    var Spotify = require('node-spotify-api');
 
    var spotify = new Spotify(keys.spotify);

    var songName = "";

    for ( var i = 3; i < process.argv.length ; i++) {
        songName += process.argv[i] + " ";
    }
    
    spotify
    .search({ type: 'track', query: songName })
    .then(function(response) {

        // JSON response
        // console.log(JSON.stringify(response, null, 2));

        console.log("Artist(s): " + response.tracks.items[0].album.artists[0].name);
        console.log("Song Name: " + response.tracks.items[0].name);
        console.log("Link to Song: " + response.tracks.items[0].external_urls.spotify);
        console.log("Album: " + response.tracks.items[0].album.name);

    })
    .catch(function(err) {
        console.log(err);
    });

}




// function for movie-this
function omdb() {

    // Include the axios npm package
    var axios = require("axios");

    // Grab or assemble the movie name and store it in a variable called "movieName"
    var movieName = "";
    // ...
    // movieName = process.argv[2];

    for ( var i = 3; i < process.argv.length ; i++) {
        movieName += process.argv[i] + "+";
    }

    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);

    // Then create a request with axios to the queryUrl
    // ...
    axios.get(queryUrl).then(
        function(response) {
            //console.log(response);
            var info = response.data;
            console.log("Title: " + info.Title);
            console.log("Release Year: " + info.Year);
            console.log("IMDB Rating: " + info.imdbRating);
            console.log("Rotten Tomatoes Score: " + info.Ratings[1].Value);
            console.log("Country of Production: " + info.Country);
            console.log("Languages: " + info.Language);
            console.log("Plot: " + info.Plot);
            console.log("Actors: " + info.Actors);
        }).catch(function(error) {
        if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
        } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
        } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        }
        console.log(error.config);
    });

}
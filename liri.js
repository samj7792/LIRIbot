require("dotenv").config();

var keys = require("./keys.js");




console.log(process.argv);


switch (process.argv[2]) {

    case "movie-this":

        //console.log("case 1");

        omdb();

        break;
    
    
}





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
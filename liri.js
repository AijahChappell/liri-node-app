require("dotenv").config();
var keys = require("./keys.js");

const Spotify = require("node-spotify-api");
const request = require("request");
const moment = require("moment");
const fs = require("fs");
const newLocal = keys.spotify;
var spotify = new Spotify(newLocal);
console.log(newLocal);
var argArr = process.argv;

var userData = "";
var userDataTwo = "";

for (let i = 3; i < argArr.length; i++) {
    if (i > 3 && i < argArr.length) {
        userData = userData + "%20" + argArr[i];
    } else {
        userData += argArr[i];
    }
    //Remove URL encoding to push to log.txt
    for (let i = 3; i < argArr.length; i++) {
        userDataTwo = userDataTwo.replace(/%20/g, " ");
    };
};

const userCommand = process.argv[2];
console.log(userCommand);
console.log(argArr);
runLiri();

function runLiri() {
    switch (userCommand) {
        case "spotify-this-song":
            console.log("here");
            if (!userData) {
                userData = "The%20Sign";
                userDataTwo = userDataTwo.replace(/%20/g, " ");
            }
            fs.appendFileSync("log.txt", userDataTwo + "\n----------------\n", function (err) {
                if (err) {
                    console.log(err);
                };
            });

            console.log(spotify);
            spotify.search({
                type: "track",
                query: userData
            }, function (err, data) {
                if (err) {
                    console.log(err)
                }
                console.log(data);
                var info = data.tracks.items

                for (let i = 0; i < info.length; i++) {
                    var albumObject = info[i].album;
                    var songName = info[i].name;
                    var preview = info[i].preview_url;
                    var artistInfo = albumObject.artists;
                    console.log(artistInfo);
                    for (let j = 0; j < artistInfo.length; j++) {
                        console.log("Artist: " + artistInfo[j].name);
                        console.log("Song Name: " + songName);
                        console.log("Preview of Song: " + preview);
                        console.log("Album Name: " + albumObject.name);

                        fs.appendFileSync("log.txt", "Artist: " + artistInfo[j].name + "\nSong Name: " + songName + "\nPreview of Song: " + preview + "\nAlbum Name: " + albumObject.name + "\n----------------\n", function (err) {
                            if (err) {
                                console.log(err);
                            };
                        });
                    }
                }
            })
            break;
    }
}

// console.log(userDataTwo);
// Make it so liri.js can take in one of the following commands:

//    * `concert-this`

//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`

// ### What Each Command Should Do

// 1. `node liri.js concert-this <artist/band name here>`

//    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

//      * Name of the venue

//      * Venue location

//      * Date of the Event (use moment to format this as "MM/DD/YYYY")

// 2. `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window

//      * Artist(s)

//      * The song's name

//      * A preview link of the song from Spotify

//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.

// 3. `node liri.js movie-this '<movie name here>'`

//    * This will output the following information to your terminal/bash window:

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

//      * It's on Netflix!

//    * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

// 4. `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.

// ### BONUS

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file. 

// * Do not overwrite your file each time you run a command.
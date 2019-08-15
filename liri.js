require("dotenv").config();
var keys = require("./keys.js");

const axios = require("axios");
const Spotify = require("node-spotify-api");
const request = require("request");
const moment = require("moment");
const fs = require("fs");
const newLocal = keys.spotify;
let spotify = new Spotify(newLocal);
console.log(newLocal);
let argArr = process.argv;

let userData = "";
let userDataTwo = "";

for (let i = 3; i < argArr.length; i++) {
    if (i > 3 && i < argArr.length) {
        userData = userData + "+" + argArr[i];
    } else {
        userData += argArr[i];
    }

};

for (var i = 3; i < argArr.length; i++) {

    userDataTwo = userData.replace("+", " ");

}

let userCommand = process.argv[2];
console.log(userCommand);
console.log(argArr);
runLiri();

function runLiri() {
    switch (userCommand) {
        case "spotify-this-song":
            console.log("here");
            if (!userDataTwo) {
                userDataTwo = "The Sign";
            }
            fs.appendFileSync("log.txt", userDataTwo + "\n----------------\n", function (err) {
                if (err) {
                    console.log(err);
                };
            });


            console.log(spotify);
            spotify.search({
                type: "track",
                query: userDataTwo
            }, function (err, data) {
                if (err) {
                    console.log(err)
                }
                console.log(data);
                let info = data.tracks.items

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
        case "movie-this":
            if (!userData) {
                userData = "Mr+Nobody";
                userDataTwo = "Mr Nobody";
            }
            
            fs.appendFileSync("log.txt", userDataTwo + "\n----------------\n", function (err) {

                if (err) {

                    console.log(err);

                };

            });
            
            var queryURL = "https://www.omdbapi.com/?t=" + userData + "&y=&plot=short&apikey=trilogy"
            console.log(queryURL);
            axios.get(queryURL).then(function (body) {
                console.log(body.data);

                

                    let info = body.data;
                    console.log(info);
                    console.log("Title: " + info.Title)

                    console.log("Release Year: " + info.Year)

                    console.log("OMDB Rating: " + info.Ratings[0].Value)

                    console.log("Rating: " + info.Ratings[1].Value)

                    console.log("Country: " + info.Country)

                    console.log("Language: " + info.Language)

                    console.log("Plot: " + info.Plot)

                    console.log("Actors: " + info.Actors)



                    //Append data to log.txt

                    fs.appendFileSync("log.txt", "Title: " + info.Title + "\nRelease Year: " + info.Year + "\nIMDB Rating: " + info.Ratings[0].Value + "\nRating: " +

                        info.Ratings[1].Value + "\nCountry: " + info.Country + "\nLanguage: " + info.Language + "\nPlot: " + info.Plot + "\nActors: " + info.Actors + "\n----------------\n",

                        function (err) {

                            if (err) {

                                console.log(err);

                            };
                    
                        
                        
                        
                    })
});

break;
    }
}

if (userCommand == "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function (err, data) {

        if (err) {
            return console.log(err)
        }

        let textArr = data.split(",");
        userCommand = textArr[0];
        userData = textArr[1];

        runLiri();

    })

}
var city = "";
var urlPool = [];
var captionPool = [];
var linkPool = [];
var geocodes = "";
var restaurantNames = [];
var restaurantImages = [];
var googlePlace = [];


// function for getting links, urls and captions, and display

function eventGet() {

    var queryURL = "https://api.seatgeek.com/2/events?q=" + city + "&client_id=MTU4NDgzNTh8MTU1MzEzMjIxOC4xNg";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        urlPool = [];
        captionPool = [];
        linkPool = [];
        for (var i=0; i<8; i++) {
            var imgURL = response.events[i].performers[0].image;
            if(imgURL === null){

                imgURL = "https://imgplaceholder.com/280x210/ff7f7f/333333/fa-image";
            }

            var caption = response.events[i].title;
            var eventLink = response.events[i].url;
            urlPool.push(imgURL);
            captionPool.push(caption);
            linkPool.push(eventLink);
        }

        display();
        googleGeo();
       
        
    })

}

function googleGeo(){
    var googleURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&sensor=false&key=AIzaSyBut7sBJR44gD7vF_X4xT9A9Bp_3RsGnKg";

    $.ajax({
        url: googleURL,
        method: "GET"
    }).then(function (response){
        geocodes = [];
        geocodes = response.results[0].geometry.location.lat + "," + response.results[0].geometry.location.lng
        googleResults();
    })
}

function googleResults(){


    var placesURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + geocodes + "&radius=1500&type=restaurant&key=AIzaSyBut7sBJR44gD7vF_X4xT9A9Bp_3RsGnKg"

    $.ajax({
        url: placesURL,
        method: "GET"
    }).then(function (response){
        restaurantNames = [];
        restaurantImages = [];
        googlePlace = [];

    
        for (i = 0; i < 8; i++){
            var names = response.results[i].name
            var images = response.results[i].icon
            var placeid = response.results[i].place_id
            restaurantNames.push(names)
            restaurantImages.push(images)
            googlePlace.push(placeid)
        }

        displayGoogle();
    })
}


// function for writing to html using data in arrays
function display() {
    $(".seatgeek").empty();
    for (var j = 0; j < 8; j++) {
        var newFigure = $("<figure>");
        var newImg = $("<img>");
        newImg.attr("src", urlPool[j]);
        newImg.attr("class", "event-thumb figure-img img-fluid rounded");
        var newCap = $("<figcaption>").text(captionPool[j]);
        newFigure.append(newImg, newCap);
        var newLink = $("<a>").html(newFigure);
        newLink.attr("href", linkPool[j]);
        $(".seatgeek").append(newLink);
    }
}

function displayGoogle() {
    $(".googleplaces").empty();
    for (k = 0; k < 8; k++){
        var newFigure = $("<figure>");
        var newImg = $("<img>");
        newImg.attr("src", restaurantImages[k]);
        newImg.attr("class", "event-thumb figure-img img-fluid rounded");
        var newCap = $("<figcaption>").text(restaurantNames[k]);
        newFigure.append(newImg, newCap);
        var newLink = $("<a>").html(newFigure);
        newLink.attr("href", "https://www.google.com/maps/place/?q=place_id:" + googlePlace[k]);
        $(".googleplaces").append(newLink)
    }

}

$("#search").on("click", function(){
    event.preventDefault();
    city = $("#city-input").val();
    eventGet();
    localStorage.clear();
    localStorage.setItem("cityname", city);
});
// on page load
city = localStorage.getItem("cityname");
if(city != ""){
    eventGet();
}

// FIREBASE DATA BELOW //

$(document).ready(function () {

    // INITIALIZE FIREBASE
       var config = {
           apiKey: "AIzaSyCZ1DDxRmJTZf6skIyVRrwcyXE6O7A62SM",
           authDomain: "guys-night-out.firebaseapp.com",
           databaseURL: "https://guys-night-out.firebaseio.com",
           projectId: "guys-night-out",
           storageBucket: "guys-night-out.appspot.com",
           messagingSenderId: "633021285285"
           };
    
       firebase.initializeApp(config);
    
    
    // VARIABLE FOR FIREBASE DATABASE
       var database = firebase.database();
    
    
    // CAPTURE BUTTON CLICK
       $("#emailAddress").on("click", function (event) {
           event.preventDefault();
    
    // CAPTURE VALUES FROM TEXT BOXES
       var emailAddress = $("#emailAddress-text").val().trim();
    
    
    // CODE FOR PUSH TO FIREBASE
       database.ref().push({
           emailAddress: emailAddress
           });
    });
    
    });



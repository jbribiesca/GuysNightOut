
var city = "";
var urlPool = [];
var captionPool = [];
var linkPool = [];

// function for getting links, urls and captions, and display

function eventGet() {
    
    console.log(city);
    var queryURL = "https://api.seatgeek.com/2/events?q=" + city + "&client_id=MTU4NDgzNTh8MTU1MzEzMjIxOC4xNg";
    console.log(city);
    console.log("test");
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
                console.log("haha");
                imgURL = "https://imgplaceholder.com/280x210/ff7f7f/333333/fa-image";
            }
            console.log(imgURL);
            var caption = response.events[i].title;
            var eventLink = response.events[i].url;
            urlPool.push(imgURL);
            captionPool.push(caption);
            linkPool.push(eventLink);
        }
        console.log("display");
        display();
    })
}

// function for writing to html using data in arrays
function display() {
    $(".seatgeek").empty();
    for (var j = 0; j < 8; j++) {
        // console.log(urlPool[j]);
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


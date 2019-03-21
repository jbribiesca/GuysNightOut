https://api.seatgeek.com/2/events?client_id=MTU4NDgzNTh8MTU1MzEzMjIxOC4xNg

var city = "";
// console.log("test" + city);

// function for displaying event images

function eventImages() {
    city = $("#city").val().toLowerCase();
    var queryURL = "https://api.seatgeek.com/2/events?q=" + city + "&client_id=MTU4NDgzNTh8MTU1MzEzMjIxOC4xNg";
    console.log(city);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i=0; i<8; i++) {
            // getting data
            var imgURL = response.events[i].performers[0].image;
            if(imgURL === null){
                console.log("haha");
                imgURL = "https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image";
            }
            console.log(imgURL);
            var caption = response.events[i].title;
            var eventLink = response.events[i].url;
            // writing to html
            var newFigure = $("<figure>");
            var newImg = $("<img>");
            newImg.attr("src", imgURL);
            newImg.attr("class", "event-thumb");
            var newCap = $("<figcaption>").text(caption);
            newFigure.append(newImg, newCap);
            var newLink = $("<a>").html(newFigure);
            newLink.attr("href", eventLink);
            $(".test").append(newLink);
        }
    })
}




$("#search").on("click", eventImages);
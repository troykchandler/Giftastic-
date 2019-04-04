//JQ always needs to have $docready to start the dominator!
// The Directions state that I need to start with an Array and it needs to be of a topic that interests me.
// I am going to start with comedians that I like and work from there! 
$(document).ready(function(){
console.log("document");
var comedians = ["Kevin Heart","Chris Rock","Robin Williams", "Adam Sandler",
"Bill Bur", "Joe Rogan", "John Stewert", "Jeff Foxsworthy", "Bernie Mac",
 "Will Ferrel", "Dane Cook"]

// Next we need to use a loop that appends a button for each string in the array.
function renderButtons  (){
 //You have to make sure that you dont have repeating buttons.
  $("#GiphyButtons").empty();
  for (var i = 0; i < comedians.length; i++) {
  // Then dynamicaly generating buttons for each movie in the array
  // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
  //I have gone back to activity 10 to review that process....
  var GP = $("<button>");
  GP.addClass("Comedian-Button");
  GP.attr("data-name", comedians[i]);
  GP.text(comedians[i]);
  $("#GiphyButtons").append(GP);
}
console.log(GP);
};


// I need to make sure that I have a function to add a new button. 
//I also learned that if you add "return false;" at the end of the function then someone cant add a blank button. 
// I am not sure it will work.

$(document).on("click", ".Comedian-Button",function(){
  $("#Comedy-Gifs").empty();
  $(".Comedian-Button").removeClass("active");
  $(this).addClass("active");
  
    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + comedians + "&api_key=PJ4SSCnbRrIdEEYKPtpqIMcxrWsKPEwJ";
   
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .then(function(response) {
       console.log(queryURL);
        $("#GiphyButtons").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
        
    var results = response.data; 
       for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); //div for the gifs to go inside
            gifDiv.addClass("gifDiv");
            // pulling rating of gif
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            // pulling still image of gif
            // adding div of gifs to gifsView div
            $("#gifsView").prepend(gifDiv);
        }
        renderButtons(comedians, "Comedian-button", "#Comedian-button");
    });
})
renderButtons(comedians, "Comedian-button", "#Comedian-button");
})

// "use strict";

// search function which receives an input and produces a response via the OMDBapi
function search(input) {
  var url = "http://www.omdbapi.com/?s="+escape(input);
  $.getJSON(url)
  .done(function(response){
    console.log("response success!");
    console.log(response);
    index (response);
  })
  .fail(function(response){
    console.log("response fail!");
  });
}

// index function that takes a response input, and appends information from each
// object in the response array to a div on the primary index page. also invokes
// the clear function to begin, which clears that same div.
function index (response) {
  clear();
  for (var i=0; i<response.Search.length; i++) {
    var detail = "<ul class='movie-details' attr='"+response.Search[i].imdbID+"'>" + response.Search[i].Title + "</ul>";

    // var moreButton = "<button attr='"+response.Search[i].imdbID+"'> More </button>";

    // event listener so that when a movie-div is clicked, the associated title of
    // that movie is taken and used as a new call to the o
    // $detail.click(function(e){
    //   // e.preventDefault();
    //   console.log(e);
    //   console.log("div was clicked");
    //   index(input);
    // });



    $("#movies-details").append(detail);
    // $("#movies-details").append(moreButton);

    $("ul[attr='"+response.Search[i].imdbID+"']").click(function(){
      console.log(this);
      console.log($(this).attr("attr"));
    });
  }
}

function show (film) {
  console.log(film);
}

// clears the #movies-details div on the main index page
function clear () {
  $("#movies-details").html("");
}

// event listener so that when the #search form is submitted, the value in the
// #movie-search field is taken as used as an input for the search function.
$("#search").on("submit", function(e){
  e.preventDefault();
  var $inputText = $("#movie-search");
  var input = $inputText.val();
  $inputText.val("");
  search(input);
});

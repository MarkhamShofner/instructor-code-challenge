// "use strict";

// search function which receives an input and produces a response via the OMDBapi
function search(input) {
  var url = "http://www.omdbapi.com/?s="+escape(input);
  $.getJSON(url)
  .done(function(response){
    console.log("response success!");
    console.log(response);
    show (response);
  })
  .fail(function(response){
    console.log("response fail!");
  });
}

// show function that takes a response input, and appends information from each
// object in the response array to a div on the primary index page. also invokes
// the clear function to begin, which clears that same div.
function show (response) {
  clear();
  for (var i=0; i<response.Search.length; i++) {
    var detail = "<h2>" + response.Search[i].Title + "</h2>";
    $("#movies-details").append(detail);
  }
}

// clears the #movie-details div on the main index page
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

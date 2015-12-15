// "use strict";

// search function which receives and input and produces a response via the OMDBapi
function search(input) {
  var url = "http://www.omdbapi.com/?s="+escape(input);
  $.getJSON(url)
  .done(function(response){
    console.log("response success!");
    response1 = response;
  })
  .fail(function(response){
    console.log("response fail!");
  });
}

// on click event, takes the input from the search field and executes the search function
$("#search").on("submit", function(e){
  debugger;
  console.log("test0");
  e.preventDefault();
  console.log("test");
  var $inputText = $("#movie-search");
  console.log("test2");
  var input = $inputText.val();
  $inputText.val("");
  console.log("test3");
  search(input);
});

// "use strict";

// search function which receives and input and produces a response via the OMDBapi
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

function show (response) {
  clear();
  for (var i=0; i<response.Search.length; i++) {
    var detail = "<h2>" + response.Search[i].Title + "</h2>";
    $("#movies-details").append(detail);
  }
}

function clear () {
  $("#movies-details").html("");
}

$("#search").on("submit", function(e){
  console.log("test1");
  e.preventDefault();
  var $inputText = $("#movie-search");
  var input = $inputText.val();
  $inputText.val("");
  console.log("test2");
  search(input);
});

// "use strict";


var movies = {
  omdbResponse: {},
  callSearch: function(){
    self = this;
    //clear the display area before populating
    self.clearArea();
    //reset response
    self.omdbResponse = {};
    //call searchOMDB function
    self.searchOMDB();
    console.log("check");
    console.log(self.omdbResponse);
  },
  searchOMDB: function() {
    self = this;
    var input = document.getElementById("movie-search").value;
    console.log(input);
    var url = "http://www.omdbapi.com/?s="+escape(input);
    $.getJSON(url)
      .done(function(response){
        console.log("groupResponse success!");
        self.omdbResponse = response;
        self.displayOMDB();
      })
      .fail(function(response){
        console.log("groupResponse fail!");
      })
  },
  displayOMDB: function() {
    self=this;
    console.log(self.omdbResponse);
    for (var i=0; i<self.omdbResponse.Search.length; i++) {
      console.log(i);

    }
  },
  clearArea: function(){
    //get this working or switch out for a toggle on/off function
    //document.getElementById("movies-details").value = "";
    $("#movies-details").html("");
  }
};




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

    $("#movies-details").append(detail);


    $("ul[attr='"+response.Search[i].imdbID+"']").click(function(){
      idExtracted = $(this).attr("attr");
      singleSearch (idExtracted);
    });
  }
}

function show (response) {
  var movieDetails =
    "<h6 class='release'> Release Date:"+response.Released+"</h6>"+
    "<img src="+response.Poster+">"+
    "<h6 class='plot'> Plot:"+response.Plot+"</h6>";
  $("ul[attr='"+response.imdbID+"']").append(movieDetails);
}

function singleSearch (id) {
  var url = "http://www.omdbapi.com/?i="+escape(id);
  $.getJSON(url)
  .done(function(response){
    console.log("single response success!");
    console.log(response);
    show (response);
  })
  .fail(function(response){
    console.log("single response fail!");
  });
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

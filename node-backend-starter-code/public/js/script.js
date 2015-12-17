// "use strict";

var movies = {
  omdbResponse: {},
  callSearch: function() {
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
    var url = "http://www.omdbapi.com/?s=" + escape(input);
    $.getJSON(url)
      .done(function(response) {
        console.log("groupResponse success!");
        self.omdbResponse = response;
        self.groupOMDB();
      })
      .fail(function(response) {
        console.log("groupResponse fail!");
      })
  },
  groupOMDB: function() {
    self = this;
    moviesList = self.omdbResponse.Search;
    console.log(self.omdbResponse);
    for (var i = 0; i < moviesList.length; i++) {
      console.log(moviesList[i].Title);
      var title =
        "<ul class='movie-details' attr='" + moviesList[i].imdbID + "'>" + moviesList[i].Title + "</ul>";

      $("#movies-details").append(title);

      $("ul[attr='" + moviesList[i].imdbID + "']").click(function() {
        idExtracted = $(this).attr("attr");
        self.searchSingle(idExtracted);
      });
    }
  },
  searchSingle: function(id) {
    self = this;
    console.log(id);
    var url = "http://www.omdbapi.com/?i=" + escape(id);
    $.getJSON(url)
      .done(function(response) {
        console.log("single response success!");
        console.log(response);
        self.displaySingle(response);
      })
      .fail(function(response) {
        console.log("single response fail!");
      });
  },
  displaySingle: function(response) {
    console.log("displaysing");
    self = this;
    var movieDetails =
      "<h6 class='release'> Release Date:" + response.Released + "</h6>" +
      "<img src=" + response.Poster + ">" +
      "<h6 class='plot'> Plot:" + response.Plot + "</h6>";
    $("ul[attr='" + response.imdbID + "']").append(movieDetails);
  },
  clearArea: function() {
    //get this working or switch out for a toggle on/off function
    //document.getElementById("movies-details").value = "";
    $("#movies-details").html("");
  }
};


// // event listener so that when the #search form is submitted, the value in the
// // #movie-search field is taken as used as an input for the search function.
// $("#search").on("submit", function(e) {
//   e.preventDefault();
//   var $inputText = $("#movie-search");
//   var input = $inputText.val();
//   $inputText.val("");
//   search(input);
// });

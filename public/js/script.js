// declare a movies object for use throughout the app
var movies = {
  // sets an omdbResponse mule object
  omdbResponse: {},
  // define a callSearch function, which sets the stage for the following functions
  callSearch: function() {
    var self = this;
    //clear the display area before populating
    self.clearArea();
    //reset response object
    self.omdbResponse = {};
    //call searchOMDB function
    self.searchOMDB();
  },
  // searchOMDB for a group response using the current contents of movie-search
  searchOMDB: function() {
    var self = this;
    var input = document.getElementById("movie-search").value;
    console.log(input);
    var url = "https://www.omdbapi.com/?s=" + escape(input);
    $.getJSON(url)
      .done(function(response) {
        console.log("groupResponse success!");
        self.omdbResponse = response;
        // call groupOMDB function after assigning self.omdbResponse
        self.groupOMDB();
      })
      .fail(function(response) {
        console.log("groupResponse fail!");
      });
  },
  // displayOMDB using the returned search
  groupOMDB: function() {
    // set self variable
    var self = this;
    // set moviesList using the response form omdb
    moviesList = self.omdbResponse.Search;
    console.log(self.omdbResponse);
    // loop to create the required html for each movie returned in the moviesList
    for (var i = 0; i < moviesList.length; i++) {
      // test the looped title with a console log
      console.log(moviesList[i].Title);

      // create the looped title
      var title =
        "<div class='movie-details' attr='" + moviesList[i].imdbID + "'>" + moviesList[i].Title + "</div>" +
        " <button attr='" + moviesList[i].imdbID + "'>favorite</button>";

      // add the looped title to the movieDetails
      $("#movies-details").append(title);

      idExtracted = moviesList[i].imdbID;
      self.searchSingle(idExtracted);

      // event listener for adding favorites
      $("button[attr='" + moviesList[i].imdbID + "']").click(function(e) {
        e.preventDefault();
        idExtracted = $(this).attr("attr");
        favorites.favoriteClicked(idExtracted);
      });

      // event listener for displaying movies
      $("div[attr='" + moviesList[i].imdbID + "']").click(function() {
        idExtracted = $(this).attr("attr");
        self.movieClick(idExtracted);
      });
    }
  },
  // take a single id and make a specific individual query to OMDBapi
  searchSingle: function(id) {
    var self = this;
    console.log(id);
    var url = "https://www.omdbapi.com/?i=" + escape(id);
    $.getJSON(url)
      .done(function(response) {
        console.log("single response success!");
        console.log(response);
        // call the displaySingle function using single response
        self.displaySingle(response);
      })
      .fail(function(response) {
        console.log("single response fail!");
      });
  },
  // take the single response and place it on the page
  displaySingle: function(response) {
    var self = this;
    var movieDetails =
      "<div id='" + response.imdbID + "'class='details'><h6 class='release'> Release Date: " + response.Released + "</h6>" +
      "<img class='poster' src=" + response.Poster + ">" +
      "<h6 class='plot'> Plot: " + response.Plot + "</h6></div>";
    $("div[attr='" + response.imdbID + "']").append(movieDetails);
    document.getElementById(response.imdbID).style.display = "none";
  },
  // toggle the display state of the movie element
  movieClick: function(id) {
    var displayState = document.getElementById("" + id + "").style.display;
    if (displayState === "none") {
      document.getElementById("" + id + "").style.display = "block";
    } else {
      document.getElementById("" + id + "").style.display = "none";
    }
  },
  // clear the movies-details area
  clearArea: function() {
    $("#movies-details").html("");
  }
};


// event listener so that when the #search form is submitted, the value in the
// #movie-search field is taken as used as an input for the search function.
$("#search").on("submit", function(e) {
  e.preventDefault();
  movies.callSearch();
});

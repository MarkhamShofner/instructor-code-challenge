// declare favorites object variable, very similar logic to movies variable
var favorites = {
  favoritesList: [],
  favoriteClicked: function(id) {
    console.log(id);
    var self=this;

    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: "/favorites",
      data: {"id": id},
    }).done(function(response) {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        var favorite = response[i];
      }
    }).fail(function(response){
      console.log("Ajax post request failed.");
    });
  },
  retrieveFavorites: function(favorites) {
    //means to show favorite once array is received from data.json backend
    console.log(favorites);

    var self=this;

    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: "/favorites",
    }).done(function(response) {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        var favorite = response[i];
        console.log(favorite);
        self.listFavorites(favorite);
      }
    }).fail(function(response){
      console.log("Ajax post request failed.");
    });

  },
  listFavorites: function(favoriteId){
    var self = this;
    console.log(favoriteId.id);
    var favorite = "<p id='" + favoriteId.id + "'class='details'></p>";
    $("#favorites-details").append(favorite);
    this.searchSingle(favoriteId.id);
  },
  searchSingle: function(id) {
    var self = this;
    console.log(id);
    var url = "https://www.omdbapi.com/?i=" + escape(id);
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
    var self = this;
    var movieDetails =
      "<div id='" + response.imdbID + "'class='details'><h6 class='release'> Release Date: " + response.Released + "</h6>" +
      "<img class='poster' src=" + response.Poster + ">" +
      "<h6 class='plot'> Plot: " + response.Plot + "</h6></div>";
    $("p[id='" + response.imdbID + "']").append(movieDetails);
  },
  hideFavorites: function () {
    $("#favorites-details").html("");
  }
};

$("#favorites-list").click(function(e) {
  e.preventDefault();
  favorites.retrieveFavorites();
});
$("#favorites-hide").click(function(e) {
  e.preventDefault();
  favorites.hideFavorites();
});

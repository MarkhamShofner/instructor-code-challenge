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
    // movies.searchSingle(favoriteId.id);
  },
  // searchSingle: function(favoriteId){
  //   self = this;
  // }
};

$("#favorites-list").click(function(e) {
  e.preventDefault();
  favorites.retrieveFavorites();
});

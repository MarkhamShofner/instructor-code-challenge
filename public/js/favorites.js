var favorites = {
  favoriteClicked: function(id) {
    console.log(id);
    self=this;

    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: "/favorites",
      data: {"id": id},
    }).done(function(response) {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        var favorite = response[i];
        self.listFavorite(favorite);
      }
    }).fail(function(response){
      console.log("Ajax post request failed.");
    });
  },
  listFavorite: function() {
    //means to show favorite once array is received from data.json backend
  }
};

//JS file for Twitchy app
//Author: R. Wood
//Date: Sept, 2016
$(document).ready(function() {
  var users = ['brunofin', "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck",
  "habathcx", "RobotCaleb", "noobs2ninjas", "comster404"];
  var clientID = "roqffuqyfxwkztfnou4iafve53p0qe8";

  function getUsers(users) {
    var n = users.length;

    for (var i = 0; i < n; i++) {
      user = users[i];
      getStream(user);
    }
  }

  function displayUser(user, table, logo) {
    $('.' + table).append("<tr><td><a href='https://twitch.tv/" + user
    + "/profile'><img src='" + logo + "' class='img-responsive image' alt='Responsive image' /></a></td><td id='"
     + user + "'>" + user + "</td></tr>");
  }

  function displayInfo(user, game, link) {
    $('#' + user).after("<td>" + game + "</td><td><a class='btn btn-default' role='button' href='"
     + link + "' target='_blank' aria-hidden='true' title='Go to page'>Go To Page</a></td>");
  }

  function getProfile(user) {
    var channelUrls = "https://api.twitch.tv/kraken/channels/" + user;

    $.ajax({
      type: 'GET',
      url: channelUrls,
      headers: {
        'Client-ID': clientID
      },
      success: function(data) {
        if (data.logo) { //if user's logo is not null (falsy)
          var logo = data.logo;
        } else {
          var logo = "http://www-cdn.jtvnw.net/images/xarth/404_user_50x50.png";
        }

        console.log(data);
        return logo;
      },
      error: function(err) {
        var error = "There has been an error retrieving channels of type: " + err;
        alert(error);
      }
    });
  }

  function getStream(user) {
    var streamUrl = 'https://api.twitch.tv/kraken/streams/' + user;
    $.ajax({
     type: 'GET',
     url: streamUrl,
     headers: {
       'Client-ID': clientID
     },
     success: function(data) {
       var isStreaming = data.stream;
       var game, logo, table;
       var link = 'https://twitch.tv/' + user;

       if (isStreaming) { //if isStreaming is not null (falsy)
         table = "online-users";
         game = data.stream.game;
         logo = data.stream.channel.logo;
         displayUser(user, table, logo);
         displayInfo(user, game, link);
       } else {
         table = "offline-users";
         game = "Offline";
         logo = getProfile(user);
         displayUser(user, table, logo);
         displayInfo(user, game, link);
       }

       console.log(data);
     },
     error: function(err) {
       table = "n-a";
       logo = "http://media02.hongkiat.com/fruits-vege-stock-photos/highres/fruitsvege-stock04.jpg";//placeholder image
       displayUser(user, table, logo);
       $('#' + user).after("<td>Unavailable</td>");
     }
    });
  }

  getUsers(users);

//Collapsable tables
  $('.panel-heading').click(function() {
    $(this).find('.open-close').text(function(_, value) {
      return (value == '-' ? '+' : '-'); //displays + if expanded - if collapsed
    });
    $(this).nextUntil('.panel-heading').toggle();
  });

});

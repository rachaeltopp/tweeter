/* Client-side JS logic goes here
 * jQuery is already loaded */


// function to parse the date into amount of time passed
function parseHumanDate(timeCreated) {
  var created = new Date(timeCreated);
  var seconds = Math.floor((Date.now() - created) / 1000);

  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    if(interval < 2) {
      return interval + ' year ago';
    } else {
      return interval + ' years ago';
    }
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    if(interval < 2) {
      return interval + ' month ago';
    } else {
      return interval + ' months ago';
    }
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    if(interval < 2) {
      return interval + ' hour ago';
    } else {
      return interval + ' hours ago';
    }
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    if(interval < 2) {
      return interval + ' hour ago';
    } else {
      return interval + ' hours ago';
    }
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    if(interval < 2) {
      return interval + ' minute ago';
    } else {
      return interval + ' minutes ago';
    }
  }

  return Math.floor(seconds) + ' seconds ago';
}


$(document).ready(function() {
    const createTweetElement = function (tweet) {
        const $tweet = $("<article>").addClass("tweet");
        const $header = $("<header>");
        $header.append($("<img>").attr("src",tweet.user.avatars.small));
        $header.append($("<h2>").text(tweet.user.name));
        $header.append($("<p>").addClass("twitter-handle").text(tweet.user.handle));
        
        $tweet.append($header);
    
        $tweet.append($("<p>").text(tweet.content.text));
    
        const $footer = $("<footer>");
        $footer.append($("<p>").text(parseHumanDate(tweet.created_at)));
    
        const $div = $("<div>").attr('id', "hover-content");
        $div.append($("<i class='fa fa-flag' aria-hidden='true'></i>"));
        $div.append($("<i class='fa fa-retweet' aria-hidden='true'></i>"));
        $div.append($("<i class='fa fa-heart' aria-hidden='true'></i>"));
        
        $footer.append($div);
    
        $tweet.append($footer);
        
        return $tweet;
     };
    
    const renderTweets = function(tweets) {
      const $tweetsContainer = $("#all-tweets");
      for (var tweet of tweets) {
        createTweetElement(tweet).prependTo($tweetsContainer);
      }
      return $tweetsContainer;
    }

    function loadTweets() {
      $.ajax({
        url: '/tweets/',
        method: 'GET',
        success: renderTweets
      });
    }
    loadTweets();
    
    $(".new-tweet form").submit(function(event) {
      event.preventDefault();
      if(!$('textarea').val()) {
       alert("You have not entered a tweet to submit");
       return;
      }
      if($(".counter").text() < 0) {
        alert("Your tweet is too long");
        return;
      }

      $.post("/tweets", $(this).serialize(), function() {
        $.get("/tweets", renderTweets);
      })

      $("form").trigger("reset");
      
    })
   
});



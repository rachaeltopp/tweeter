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
      //function to create the HTML container in which tweets will be rendered
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
      // function to render the tweets into the above container created
      const renderTweets = function(tweets) {
          const $tweetsContainer = $("#all-tweets");
          for (var tweet of tweets) {
              createTweetElement(tweet).prependTo($tweetsContainer);
          }
          return $tweetsContainer;
      }
      // function to update the tweets when a new one is posted (need to empty
      // container and add them again with the new one)
      const updateTweets = function(tweets) {
          const $tweetsContainer = $("#all-tweets");
          $tweetsContainer.empty();
          for (var tweet of tweets) {
              createTweetElement(tweet).prependTo($tweetsContainer);
          }
          return $tweetsContainer;
      }
      //function to load the tweets to the page using ajax request
      function loadTweets() {
          $.ajax({
              url: '/tweets/',
              method: 'GET',
              success: renderTweets
          });
      }
      loadTweets();
    
      //function to submit new tweets, checking for empty string and character count
      $(".new-tweet form").submit(function(event) {
          event.preventDefault();
          if(!$('textarea').val() || $('textarea').val().trim() == "") {
              alert("I'm sure you can think of something to say!");
              return;
          }
          if($(".counter").text() < 0) {
              alert("Woah, keep it shorter than 140 characters!");
              return;
          }

          $.post("/tweets", $(this).serialize(), function() {
              $.get("/tweets", updateTweets);
          });

          $("form").trigger("reset");
          $(".counter").text(140);

      });
      //function to slide toggle the tweet box upon clicking compose button
      //then focus on text box when tweet box
      $(".compose-button").click(function(){
          $(".new-tweet").slideToggle(function () {
              $(".new-tweet").find("textarea").focus();        
          });
          return false;
      });
   
});



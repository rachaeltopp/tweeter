/* Client-side JS logic goes here
 * jQuery is already loaded */

// Test / driver code (temporary). Eventually will get this from the server.

 var data =  
  [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ]
  

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
        $footer.append($("<p>").text(new Date(tweet.created_at)));
    
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

    renderTweets(data);
});

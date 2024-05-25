const Twitter = require('twitter');
const fs = require('fs').promises;
require('dotenv').config();

const user = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

function getLatestTweets(username,tweetcount = 20)
{
const params = {screen_name: username, count: tweetcount};

user.get('statuses/user_timeline',params)
.then
(tweets => {tweets.forEach(tweet => {
        console.log('Tweet by ${tweet.user.name}: &{tweet.text}');
    });
})
.catch(error => {
    console.error('Error fetching tweets:', error);
});

}

const Twitter = require('twitter-v2');
require('dotenv').config();

const client = new Twitter({
bearer_token: process.env.TWITTER_BEARER_TOKEN
});

function getLatestTweets(username, tweetCount = 20) {
console.log(`Fetching tweets for ${username}...`);

const params = {
    query: `from:${username}`,
    max_results: tweetCount,
    'tweet.fields': 'created_at,author_id'
};

return client.get('tweets/search/recent', params)
    .then(response => {
    const { data } = response;
    if (data && data.length > 0) {
        console.log(`Fetched ${data.length} tweets.`);
        data.forEach(tweet => {
        console.log(`Tweet by ${username}: ${tweet.text}`);
        });
    } else {
        console.log('No tweets found for this user.');
    }
    })
    .catch(error => {
    console.error('Error fetching tweets:', error);
    });
}

module.exports = { getLatestTweets };

const mainMenu = require("./Interface/Terminal/terminal");
const { fetchLatestTweets } = require("./twitter");


//Start
mainMenu.mainMenu();

const username = process.argv[2]; 
if (username) 
{
    const finalUser = username.startsWith('@') ? username.slice(1) : username;
    fetchLatestTweets(finalUser, 20);
} 
else 
{
console.log('Please enter your twitter username');
}

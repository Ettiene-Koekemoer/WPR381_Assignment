const inquirer = require("inquirer");
const readlineSync = require("readline-sync");
const { closeApp, getUserInput } = require("./utils");
const { lookUpSong } = require("./spotifyApi");
const { getLatestTweets} = require("./twitter");
let lastAction = null;

//Twitter Function
const loadLatestTweets = async () => {
  const input = await getUserInput("Input @Name of Twitter user: ");
  const cleanUsername = input.startsWith('@') ? input.slice(1) : input;
  console.log(`Looking up tweets for ${cleanUsername}...`);
  await getLatestTweets(cleanUsername, 20);
  console.log('Finished looking up tweets.');
};

//Spotify Function
const lookUpSpotifySong = async () => {
  await getUserInput("Input Name of Song: ").then(async (input) => {
    await lookUpSong(input);
  });
};

//Main Menu
const mainMenu = () => {
  console.clear();
  console.log("=== Simple API Terminal ===\n");
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "Select an Option",
        choices: ["Load Latest Tweets", "Spotify Song Look-Up", "Exit"],
      },
    ])
    .then(async (selection) => {
      //console.clear();
      lastAction = selection.action;
      console.clear();
      console.log("=== " + lastAction + " ===\n");
      switch (selection.action) {
        case "Load Latest Tweets":
          //loadTweets call
          await loadLatestTweets();
          await goBackToMainMenu();
          break;
        case "Spotify Song Look-Up":
          //lookUpSong call
          await lookUpSpotifySong();
          await goBackToMainMenu();
          break;
        case "Exit":
          closeApp();
          break;
      }
    });
};

//Back to Menu
const goBackToMainMenu = async () => {
  const choices = ["Main Menu", "Retry Last Action", "Exit"];
  inquirer
    .prompt([
      {
        type: "list",
        name: "back",
        message: "Back To Main Menu OR Exit",
        choices: choices,
      },
    ])
    .then(async (selection) => {
      console.clear();
      console.log("=== Retry " + lastAction + " ===\n");
      if (selection.back === "Main Menu") {
        mainMenu();
      } else if (selection.back === "Retry Last Action") {
        switch (lastAction) {
          case "Load Latest Tweets":
            //loadTweets call
            await loadLatestTweets();
            await goBackToMainMenu();
            break;
          case "Spotify Song Look-Up":
            //lookUpSong call
            await lookUpSpotifySong();
            await goBackToMainMenu();
            break;
        }
      } else {
        closeApp();
      }
    });
};

module.exports = {
  mainMenu,
  goBackToMainMenu,
};

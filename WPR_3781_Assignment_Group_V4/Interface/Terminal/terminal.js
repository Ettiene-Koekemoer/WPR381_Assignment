const inquirer = require("inquirer");
const readlineSync = require('readline-sync');
const { closeApp, getUserInput } = require("./utils");
const { lookUpSong } = require("./spotifyApi");

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
      switch (selection.action) {
        case "Load Latest Tweets":
          //loadTweets call
          await getUserInput("Input @Name of Twitter User: ").then((input) => {
            console.log("Tweets of User: ", input);
            //I added Input capture if needed, if your function does not need it or has it built in remove getUserInput
          });
          await goBackToMainMenu();
          break;
        case "Spotify Song Look-Up":
          //lookUpSong call
          await getUserInput("Input Name of Song: ").then(async(input) => {
            await lookUpSong(input);
          });
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
  inquirer
    .prompt([
      {
        type: "list",
        name: "back",
        message: "Back To Main Menu OR Exit",
        choices: ["Main Menu", "Exit"],
      },
    ])
    .then(async (selection) => {
      if (selection.back === "Main Menu") {
        mainMenu();
      } else {
        closeApp();
      }
    });
};

module.exports = {
  mainMenu,
  goBackToMainMenu,
};

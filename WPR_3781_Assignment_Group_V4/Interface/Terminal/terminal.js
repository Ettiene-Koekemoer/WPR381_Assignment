const inquirer = require("inquirer");
const readlineSync = require("readline-sync");
const { closeApp, getUserInput } = require("./utils");
const { lookUpSong } = require("./spotifyApi");
let lastAction = null;

//Spotify Function
const lookUpSpotifySong = async () => {
  await getUserInput("Input Name of Song: ").then(async (input) => {
    await lookUpSong(input);
  });
};

//Main Menu
const mainMenu = () => {
  console.clear();
  console.log("=== Group 4 Assignment 1 ===\n");

  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "Select an Option",
        choices: ["Spotify Song Look-Up", "Exit"],
      },
    ])
    .then(async (selection) => {
      //console.clear();
      lastAction = selection.action;
      console.clear();
      console.log("=== " + lastAction + " ===\n");
      switch (selection.action) {        
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

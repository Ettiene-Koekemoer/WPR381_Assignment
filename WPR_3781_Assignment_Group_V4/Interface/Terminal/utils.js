const readline = require("readline");

// Wait Timer function
const wait = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

//Close App
const closeApp = async () => {
  const message = "Goodbye!";
  for (const char of message) {
    process.stdout.write(char);
    await wait(100);
  }
  await wait(1000);
  console.clear();
  process.exit();
};

//Gets User Input from Terminal
function getUserInput(promptText) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question(promptText, (input) => {
      resolve(input.trim());
      rl.close();
    });
  });
}

module.exports = {
  closeApp,
  getUserInput,
};
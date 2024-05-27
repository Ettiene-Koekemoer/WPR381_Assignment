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
async function getUserInput(promptText) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let input;
  let isValid = false;

  while (!isValid) {
    input = await new Promise((resolve) => {
      rl.question(promptText, (input) => {
        resolve(input.trim());
      });
    });

    //If the input is invalid, display an error message and loop again
    //Cleaning input prevents error 400
    if (input.length === 0 || input.length > 50) {
      console.log(
        "Invalid input: Input should not be empty and should be less than or equal to 50 characters."
      );
    } else {
      isValid = true;
    }
  }

  rl.close();
  return input;
}

module.exports = {
  closeApp,
  getUserInput,
};

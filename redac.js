// get DOM
let text = document.getElementById("text");
const redacted = document.getElementById("redacted");
const input = document.getElementById("input");
const scrambler = document.getElementById("scrambler");

// DOM buttons
const button = document.getElementById("button");
const clear = document.getElementById("clear");

// redact button
button.addEventListener("click", () => {
  if (text.value == "") return; // returns the function if there is no user input
  let start = performance.now() / 1000; //execution time start (divided by 1000 to convert milliseconds to seconds)
  text.value = text.value.replace(/\n/g, " \n"); // this ensures line-breaking space does not join two words together
  let textArray = text.value.split(" "); //An array of user input text

  //   counters for number of words matched and number of characters scrambled, respectively
  let count = 0;
  let charScrambled = 0;

  //   converting the text array into a newArray where the input words are redacted
  const newArray = textArray.map((word) => {
    let inputArray = input.value.split(" "); //converting the words to be redacted into an array
    let regex = /[\W\s\d]/g; //regex for all non-word characters and whitespace characters

    for (let userInput of inputArray) {
      let userInputRegex = new RegExp(userInput, "gi");

      if (
        userInput.toLowerCase().replace(regex, "") ==
        word.toLowerCase().replace(regex, "")
      ) {
        count++;
        word = word.replace(
          userInputRegex,
          scrambler.value.repeat(userInput.length)
        );
      }
    }
    return word;
  });
  let Redacted = {};
  Redacted.text = newArray.join(" ");

  //  looping over the redacted text to get a count of the total redacted characters
  for (let char of Redacted.text) {
    if (char == scrambler.value) {
      charScrambled++;
    }
  }
  let end = performance.now() / 1000; //execution time end (divided by 1000 to convert milliseconds to seconds)
  let executionTime = (end - start).toFixed(5); //execution time to 5 decimal places

  Redacted.charScrambled = charScrambled;
  Redacted.executionTime = executionTime;
  Redacted.wordsScanned = textArray.length;
  Redacted.count = count;

  localStorage.setItem("Redacted", JSON.stringify(Redacted));
  setInterval(() => {
    return window.location.assign("/redacted.html");
  }, 100);
});

// clear button
clear.addEventListener("click", () => {
  text.value = "";
  input.value = "";
  scrambler.value = "";
});

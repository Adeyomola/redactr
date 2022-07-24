// get DOM
const summary = document.getElementById("summary");
let text = document.getElementById("text");
const redacted = document.getElementById("redacted");
const input = document.getElementById("input");
const scrambler = document.getElementById("scrambler");

// DOM buttons
const button = document.getElementById("button");
const clear = document.getElementById("clear");
const copy = document.getElementById("copy");

// redact button
button.addEventListener("click", () => {
  if (text.value == "") return; // returns the function if there is no user input
  let start = performance.now() / 1000; //execution time start (divided by 1000 to convert milliseconds to seconds)
  let textArray = text.value.split(" "); //An array of user input text
  //   counters for number of words matched and number of characters scrambled, respectively
  let count = 0;
  let charScrambled = 0;

  //   converting the text array into a newArray where the input words are redacted
  const newArray = textArray.map((word) => {
    let inputArray = input.value.split(" "); //converting the words to be redacted into an array
    let regex = /[,?""'':;!\[\]\.\(\)\{\}]/g; // regular expression for punctuation marks

    for (userInput of inputArray) {
      if (userInput.toLowerCase() == word.toLowerCase().replace(regex, "")) {
        count++;
        word = scrambler.value.repeat(userInput.length);
      }
    }
    return word;
  });
  redacted.value = newArray.join(" ");

  //  looping over the redacted text to get a count of the total redacted characters
  for (let char of redacted.value) {
    if (char == scrambler.value) {
      charScrambled++;
    }
  }

  let end = performance.now() / 1000; //execution time end (divided by 1000 to convert milliseconds to seconds)
  let executionTime = (end - start).toFixed(5); //execution time to 5 decimal places

  // summary of the performance of the redacter
  summary.innerHTML = `<strong>Number of words scanned:</strong>  ${textArray.length}&nbsp&nbsp&nbsp
  <strong>Number of words matched:</strong> ${count}&nbsp&nbsp&nbsp
  <strong>Number of characters scrambled:</strong>  ${charScrambled}&nbsp&nbsp&nbsp
  <strong>Redaction Time:</strong> ${executionTime} seconds</strong>`;

  if (window.innerWidth < 1024) {
    summary.innerHTML = `<strong>Number of words scanned:</strong>  ${textArray.length}<br>
  <strong>Number of words matched:</strong> ${count}<br>
  <strong>Number of characters scrambled:</strong>  ${charScrambled}<br>
  <strong>Redaction Time:</strong> ${executionTime} seconds</strong>`;
  }
});

// clear button
clear.addEventListener("click", () => {
  text.value = "";
  redacted.value = "";
  summary.innerHTML = "";
  input.value = "";
});

// copy function
copy.addEventListener("click", () => {
  // select output text field
  redacted.select();
  redacted.setSelectionRange(0, 99999);
  // copy text to clipboard
  navigator.clipboard.writeText(redacted.value);
});

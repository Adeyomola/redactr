const redacted = document.getElementById("redacted");
const summary = document.getElementById("summary");
const copy = document.getElementById("copy");

const Redacted = JSON.parse(localStorage.getItem("Redacted"));

window.addEventListener("load", () => {
  // summary of the performance of the redacter
  summary.innerHTML = `<strong class="col-2">Words scanned: ${Redacted.wordsScanned}</strong>
  <strong class="col-2">Words matched: ${Redacted.count}</strong>
  <strong class="col-2">Characters scrambled: ${Redacted.charScrambled}</strong>
  <strong class="col-2">Redaction Time: ${Redacted.executionTime} seconds</strong> </strong>`;

  if (window.innerWidth < 1024) {
    summary.innerHTML = `<strong class="py-1 text-center">Words scanned: ${Redacted.wordsScanned}</strong>
  <strong class="py-1 text-center">Words matched: ${Redacted.count}</strong>
  <strong class="py-1 text-center">Characters scrambled:  ${Redacted.charScrambled}</strong>
  <strong class="py-1 text-center">Redaction Time: ${Redacted.executionTime} seconds</strong>`;
  }
  redacted.value = Redacted.text;
});

// copy function
copy.addEventListener("click", () => {
  // select output text field
  redacted.select();
  redacted.setSelectionRange(0, 99999);
  // copy text to clipboard
  navigator.clipboard.writeText(redacted.value);
  Swal.fire({
    title: "Copied!",
  });
});

// clear button
clear.addEventListener("click", () => {
  redacted.value = "";
  summary.innerHTML = "";
  localStorage.removeItem("Redacted");
});

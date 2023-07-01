const form = document.getElementById("spellcheck-form");
const resultDiv = document.getElementById("result");
const checkBtn = document.getElementById("check-btn");

function reload() {
  window.location.reload();
}

checkBtn.addEventListener("click", () => {
  const word = document.getElementById("word").value;
  checkSpelling(word);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const word = document.getElementById("word").value;
  checkSpelling(word);
});

function checkSpelling(word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response) => response.json())
      .then((result) => {
        // Check if the word is spelled correctly
        if (result.title === "No Definitions Found") {
          resultDiv.innerHTML = `Did you mean <strong>${result.suggestion}</strong>?`;
        } else {
          // Display the word definition
          const definition = result[0].meanings[0].definitions[0].definition;
          resultDiv.innerHTML = `<strong>${word}</strong>: ${definition}`;
        }
  
        // Fetch related words
        fetch(`https://api.datamuse.com/words?sp=${word}*&max=5`)
          .then((response) => response.json())
          .then((relatedWords) => {
            // Display related words
            const relatedWordList = relatedWords.map((relatedWord) => relatedWord.word);
            const relatedWordStr = relatedWordList.join(", ");
            resultDiv.innerHTML += `<br>Related words: ${relatedWordStr}`;
          })
          .catch((error) => {
            console.error(error);
            resultDiv.innerHTML += "<br>An error occurred while fetching related words.";
          });
      })
      .catch((error) => {
        console.error(error);
        resultDiv.innerHTML = "An error occurred. Please try again later.";
      });
  }
  


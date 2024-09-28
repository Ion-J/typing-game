//select the elements
document.addEventListener("DOMContentLoaded", () => {
  const textToTypeElement = document.getElementById("text-to-type");
  const typingInputElement = document.getElementById("typing-input");
  const speedElement = document.getElementById("speed");
  const accuracyElement = document.getElementById("accuracy");
  const timeRemainingElement = document.getElementById("time-remaining");
  console.log({
    textToTypeElement,
    typingInputElement,
    speedElement,
    accuracyElement,
    timeRemainingElement,
  });
  const sampleTexts = [
    "The clouds told secrets to the trees, who whispered them to the grass, and soon the entire field was laughing.",
    "Perhaps we are all just stars, forgotten in the daylight and only remembered when the sky darkens.",
    "Did you know? An octopus has three hearts, and two of them stop beating when it swims.",
    "Magic isn't real, but try telling that to the stars—they're always casting light over the darkest skies.",
    "In the age of quantum computing, data isn't just stored—it's experienced",
    "The sky wore shades of pink and purple as if painting itself with the whispers of dreams.",
    "In the neon-soaked city, where shadows ran faster than light, every click of a key could rewrite reality.",
    "Golden leaves falling,Quiet whispers in the wind,Autumn's lullaby",
    "The oceans turned to glass, and beneath the surface, fish swam through mirrors instead of water",
    "He typed one line of code, and the machine began to hum, a soft melody that shouldn't have been there",
    "The only map you need in life is your heart's compass—it always knows which direction leads to happiness",
  ];

  //function
  let currentIndex = 0;
  let startTime = new Date();
  let errors = 0;
  let timeRemaining = 60;
  let timerInterval = null;

  function initializeGame() {
    const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    textToTypeElement.textContent = text;
    typingInputElement.value = "";
    currentIndex = 0;
    startTime = new Date();
    errors = 0;
    timeRemaining = 60;
    clearInterval(timerInterval);
    startTimer();
    updateFeedback();
  }

  function startTimer() {
    timeRemainingElement.textContent = timeRemaining;

    timerInterval = setInterval(() => {
      timeRemaining--;
      timeRemainingElement.textContent = timeRemaining;

      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        endGame();
      }
    }, 1000);
  }

  function endGame() {
    typingInputElement.disabled = true;
    displayMessage("Time's up! Restarting...");
    setTimeout(() => {
      typingInputElement.disabled = false;
      initializeGame();
    }, 5000);
  }

  function updateFeedback() {
    const currentTime = new Date();
    const elapsedTime = (currentTime - startTime) / 60000;
    const wordsTyped = typingInputElement.value.trim().split(/\s+/).length;
    const speed = Math.round(wordsTyped / elapsedTime);
    speedElement.textContent = speed;

    const accuracy =
      currentIndex > 0
        ? Math.round(((currentIndex - errors) / currentIndex) * 100)
        : 100;
    accuracyElement.textContent = accuracy;
  }

  function checkCharacter(inputChar, targetChar) {
    if (inputChar !== targetChar) {
      errors++;
      new Audio("/typing-game/error.mp3").play();
      return false;
    } else {
      return true;
    }
  }

  function displayMessage(message) {
    const messageArea = document.getElementById("message-area");
    messageArea.textContent = message;
    setTimeout(() => {
      messageArea.textContent = "";
    }, 3000);
  }

  typingInputElement.addEventListener("input", (e) => {
    const typedText = typingInputElement.value;
    const targetText = textToTypeElement.textContent;

    if (currentIndex < targetText.length) {
      const isCorrect = checkCharacter(
        typedText[currentIndex],
        targetText[currentIndex]
      );
      textToTypeElement.innerHTML =
        targetText.substring(0, currentIndex) +
        `<span class='${isCorrect ? "correct" : "incorrect"}'>${
          targetText[currentIndex]
        }</span>` +
        targetText.substring(currentIndex + 1);
      currentIndex++;

      if (currentIndex === targetText.length) {
        displayMessage("Text completed starting a new one.");
        initializeGame();
      }
    }

    updateFeedback();
  });

  initializeGame();
});

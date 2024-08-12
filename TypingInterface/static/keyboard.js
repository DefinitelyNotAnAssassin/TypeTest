import { StartTimer, StopTimer} from "./timer.js";
import { InitializeMenu } from "./menu.js";
import { InitializeStatistics } from "./statistics.js";

let isTimerRunning = false;
const statistics = InitializeStatistics();


document.addEventListener("DOMContentLoaded", async () => {
    await getWords()
  })

  function startTypingTimer(){ 
    StartTimer();
    isTimerRunning = true;
  }

  function updateLetterStyle(letterElement, isCorrect) {
    if (isCorrect) {
      letterElement.classList.add("text-white")
      letterElement.classList.remove("text-red-400")
      letterElement.classList.remove("opacity-50")
    } else {
      letterElement.classList.add("text-red-400")
      letterElement.classList.remove("opacity-50")
    }
  }

  function moveToNextWord(words, currentWord, currentLetter) {
    words[currentWord].classList.remove("word-active")
    currentWord++
    currentLetter = 0
    const currentLetterElement = words[currentWord]
      .querySelectorAll(".letter")
      [currentLetter] 
    // create an element for the caret
    
    const caret = document.createElement("span") 
    caret.classList.add("caret")
    caret.textContent = ""
    // append before the letter 
    currentLetterElement.insertBefore(caret, currentLetterElement.firstChild)

    scrollToCaret(words[currentWord].querySelectorAll(".letter")[currentLetter])
    

    
  

    words[currentWord].classList.add("word-active")
    return { currentWord, currentLetter }
  }

  function handleKeyPress(e, words, currentWord, currentLetter) {

    const invalidKeyCodes = [8, 16, 17, 18, 20, 91, 93, 37, 38, 39, 40];

    if (e.keyCode === 8) {
        const letterElements = words[currentWord].querySelectorAll(".letter");
        const letterElement = letterElements[currentLetter];
        return handleBackspace(e, letterElement, currentLetter, letterElements, currentWord, words);
    }

    if (invalidKeyCodes.includes(e.keyCode)) {

        return { currentWord, currentLetter };
    }
    
    const letterElements = words[currentWord].querySelectorAll(".letter");
    const letterElement = letterElements[currentLetter];
  
    // Check if its the first letter of the first word
    if (currentWord == 0 && currentLetter == 0 && !isTimerRunning) {
      startTypingTimer();
    }
  
    if (isEndOfWord(currentLetter, letterElements, currentWord, words)) {
      return handleEndOfWord(e, words, currentWord, currentLetter);
    } else {
      return handleLetterInput(e, letterElement, currentLetter, letterElements, currentWord, words);
    }
  }
  
  function isEndOfWord(currentLetter, letterElements, currentWord, words) {
    return currentLetter >= letterElements.length;
  }
  
  function handleEndOfWord(e, words, currentWord, currentLetter) {
    
    if (e.keyCode === 32) { // Spacebar pressed
       
      if (currentWord == words.length - 1) {
        alert("You have completed the typing test!");
        const time = StopTimer();
        console.log("Time taken: ", time);
        // InitializeMenu();
        return { currentWord, currentLetter };
      } else {
        return moveToNextWord(words, currentWord, currentLetter);
      }
    } else {
      currentLetter--; // Stay on the last letter until space is pressed
    }
    return { currentWord, currentLetter };
  }
  
  function handleLetterInput(e, letterElement, currentLetter, letterElements, currentWord, words) {
    const isCorrect = e.key === letterElement.textContent;
  
    if (isCorrect) {
      updateLetterStyle(letterElement, true);
      currentLetter++;
    } else  {
      updateLetterStyle(letterElement, false);
      currentLetter++;
    }
  
    if (isLastLetterOfLastWord(currentWord, words, currentLetter, letterElements)) {
      removeCaretFromAll(letterElements);
      return { currentWord, currentLetter };
    }
  
    updateCaretPosition(letterElements, currentLetter);
    return { currentWord, currentLetter };
  }

  function handleBackspace(e, letterElement, currentLetter, letterElements, currentWord, words) {
    if (currentLetter > 0) {
      currentLetter--;
      updateCaretPosition(letterElements, currentLetter);
      letterElements[currentLetter].classList.remove("text-white");
        letterElements[currentLetter].classList.remove("text-red-400");
        letterElements[currentLetter].classList.add("opacity-50");

    }
    return { currentWord, currentLetter };
}

  
  function isLastLetterOfLastWord(currentWord, words, currentLetter, letterElements) {
    return currentWord === words.length - 1 && currentLetter === letterElements.length;
  }
  
  function removeCaretFromAll(letterElements) {
    document.querySelectorAll(".caret").forEach((caret) => {
      caret.remove();
    });
  }
  
  function updateCaretPosition(letterElements, currentLetter) {
    removeCaretFromAll(letterElements);
    if (currentLetter < letterElements.length) {
        const caret = document.createElement("span") 
        caret.classList.add("caret")


        letterElements[currentLetter].insertBefore(caret, letterElements[currentLetter].firstChild)
    
    }
  }

  
  function scrollToCaret(caretElement) {
    const container = document.querySelector(".main")
    const caretRect = caretElement.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    console.log(caretRect.bottom, containerRect.bottom)
    if (caretRect.bottom >= containerRect.bottom) {
      container.scrollTop += caretRect.bottom - containerRect.bottom
    }
  }

  const getWords = () => {
    fetch("/get_words")
      .then((response) => response.json())
      .then((data) => {
        populateWords(JSON.parse(data))
        return data
      })
  }

  const populateWords = (wordSet) => {
    const main = document.querySelector(".main")

    wordSet.forEach((word) => {
      const wordElement = document.createElement("div")
      wordElement.classList.add("word")
      wordElement.classList.add("text-2xl")
      wordElement.classList.add("text-white")

      if (word === wordSet[0]) {
        wordElement.classList.add("word-active")
      }
      word.split("").forEach((letter) => {
        const letterElement = document.createElement("span")
        letterElement.classList.add("letter")
        letterElement.classList.add("opacity-50")
        letterElement.textContent = letter
        wordElement.appendChild(letterElement)
      })
      main.appendChild(wordElement)
    })

    InitializeTest()
  }

  const InitializeTest = () => {
    const words = document.querySelectorAll(".word")
    let currentWord = 0
    let currentLetter = 0

    document.addEventListener("keydown", (e) => {
      ;({ currentWord, currentLetter } = handleKeyPress(
        e,
        words,
        currentWord,
        currentLetter
      ))
    })

    // add caret to the first letter of the first word 

    const caret = document.createElement("span")
    caret.classList.add("caret")
    caret.textContent = ""
    words[0].querySelectorAll(".letter")[0].insertBefore(caret, words[0].querySelectorAll(".letter")[0].firstChild)
    

    

  }



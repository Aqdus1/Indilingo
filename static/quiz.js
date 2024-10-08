
    // Quiz questions and answers
    const quizData = [ 
      {
        question: "Question 1",
        image: "images/pyaar.jpeg",
        options: ["ਪਿਆਰ", "ਯਾਰ", "ਨੀਲਾ", "ਰੰਗੀਲਾ"],
        correctAnswer: 0
      },
      {
        question: "Question 2",
        audio: "audio/nookeela.mp3",
        options: ["ਪਤੀਲਾ", "ਮੁਟਿਆਰ", "ਨੁਕੀਲਾ", "ਅਖਬਾਰ"],
        correctAnswer: 2
      },
      {
        question: "Question 3",
        image: "images/zeherila.jpeg",
        options: ["ਅਖਬਾਰ", "ਨੁਕੀਲਾ", "ਰੰਗੀਲਾ", "ਜ਼ਹਿਰੀਲਾ"],
        correctAnswer: 3
      },
      {
        question: "Question 4",
        image: "images/akhbaar.jpeg",
        options: ["ਸਰਦਾਰ", "ਪਿਆਰ", "ਅਖਬਾਰ", "ਜ਼ਹਿਰੀਲਾ"],
        correctAnswer: 2
      },
      {
        question: "Question 5",
        audio: "audio/mutiyaar.mp3",
        options: ["ਮੁਟਿਆਰ", "ਅਖਬਾਰ", "ਪਿਆਰ", "ਨੁਕੀਲਾ"],
        correctAnswer: 0
      },
      {
        question: "Question 6",
        image: "images/neela.jpeg",
        options: ["ਪਤੀਲਾ", "ਨੀਲਾ ", "ਜ਼ਹਿਰੀਲਾ", "ਰੰਗੀਲਾ "],
        correctAnswer: 1
      },
      {
        question: "Question 7",
        image: "images/yaar.jpeg",
        options: ["ਸਰਦਾਰ", "ਪਿਆਰ", "ਮੁਟਿਆਰ ", "ਯਾਰ"],
        correctAnswer: 3
      },
      {
        question: "Question 8",
        audio: "audio/sardaar.mp3",
        options: ["ਸਰਦਾਰ", "ਰੰਗੀਲਾ", "ਅਖਬਾਰ ", "ਮੁਟਿਆਰ "],
        correctAnswer: 0
      },
      {
        question: "Question 9",
        image: "images/rangeela.jpeg",
        options: ["ਜ਼ਹਿਰੀਲਾ", "ਨੀਲਾ", "ਰੰਗੀਲਾ", "ਨੁਕੀਲਾ"],
        correctAnswer: 2
      },
      {
        question: "Question 10",
        image: "images/patiila.jpeg",
        options: ["ਰੰਗੀਲਾ", "ਮੁਟਿਆਰ", "ਪਤੀਲਾ", "ਜ਼ਹਿਰੀਲਾ"],
        correctAnswer: 2
      }
      // Add your quiz questions here...
    ];
    
    const questionElement = document.getElementById("question");
    const mediaContainer = document.getElementById("media-container");
    const optionsElement = document.getElementById("options");
    const submitButton = document.getElementById("submit-btn");
    const resultContainer = document.getElementById("result-container");
    const resultText = document.getElementById("result-text");

    let currentQuestionIndex = 0;
    let correctAnswers = 0;

    function loadQuestionWithImage() {
      const currentQuestion = quizData[currentQuestionIndex];
      questionElement.textContent = currentQuestion.question;
      mediaContainer.innerHTML = `<img src="${currentQuestion.image}" alt="Question Image" style="max-width: 300px;">`;
      optionsElement.innerHTML = "";

      for (let i = 0; i < currentQuestion.options.length; i++) {
        const option = document.createElement("li");
        option.textContent = currentQuestion.options[i];
        option.onclick = () => selectOption(i, option);
        optionsElement.appendChild(option);
      }
    }

    function loadQuestionWithAudio() {
      const currentQuestion = quizData[currentQuestionIndex];
      questionElement.textContent = currentQuestion.question;
      mediaContainer.innerHTML = `<audio controls src="${currentQuestion.audio}"></audio>`;
      optionsElement.innerHTML = "";

      for (let i = 0; i < currentQuestion.options.length; i++) {
        const option = document.createElement("li");
        option.textContent = currentQuestion.options[i];
        option.onclick = () => selectOption(i, option);
        optionsElement.appendChild(option);
      }
    }

    function selectOption(selectedIndex, selectedOption) {
      const options = optionsElement.getElementsByTagName("li");

      for (let i = 0; i < options.length; i++) {
        options[i].classList.remove("selected");
      }

      selectedOption.classList.add("selected");
      submitButton.disabled = false;
    }

    function checkAnswer() {
      const options = optionsElement.getElementsByTagName("li");
      const selectedOption = optionsElement.querySelector(".selected");

      if (!selectedOption) {
        return; // No option selected
      }

      const selectedIndex = Array.from(options).indexOf(selectedOption);

      if (selectedIndex === quizData[currentQuestionIndex].correctAnswer) {
        correctAnswers++;
        selectedOption.classList.add("correct");
      } else {
        selectedOption.classList.add("wrong");
      }

      for (let i = 0; i < options.length; i++) {
        options[i].onclick = null; // Disable click event for options
      }

      submitButton.disabled = true;

      if (currentQuestionIndex < quizData.length - 1) {
        setTimeout(nextQuestion, 1000); // Move to the next question after 1 second
      } else {
        setTimeout(showResult, 1000); // Show the result after 1 second
      }
    }

    function nextQuestion() {
      currentQuestionIndex++;

      if (quizData[currentQuestionIndex].image) {
        loadQuestionWithImage();
      } else if (quizData[currentQuestionIndex].audio) {
        loadQuestionWithAudio();
      }
    }

    function showResult() {
      const percentage = (correctAnswers / quizData.length) * 100;
      resultText.textContent = `You answered ${correctAnswers} out of ${quizData.length} questions correctly. Your score is ${percentage}%.`;
      resultContainer.style.display = "block";
      document.getElementById("quiz-container").style.display = "none";
    }

    submitButton.addEventListener("click",checkAnswer);

    // Initial question loading
    if (quizData[currentQuestionIndex].image) {
      loadQuestionWithImage();
    } else if (quizData[currentQuestionIndex].audio) {
      loadQuestionWithAudio();
    }

    function redirectToAnotherPage() {
      window.location.href = 'second.html?lang=' + 'punjabi'; // Replace "second.html" with the desired page URL
    }

    // Add click event listener to the submit button in the result container
    const submitResultButton = document.getElementById("submit-result-btn");
    submitResultButton.addEventListener("click", redirectToAnotherPage);

(function() {
  "use strict";

  let questions = [
    {    question: "Was bedeutet 10-4?",    answers: ["Information", "Fahndung im Gange", "Antarktis", "Bestätigung (OK)"],
    correctAnswer: 4
  },
  {
    question: "Was ist der Code für die Standortabfrage?",
    answers: ["10-7", "10-28", "10-20", "10-3"],
    correctAnswer: 3
  },
  {
    question: "Was bedeutet 10-80?",
    answers: ["Fahndung im Gange", "Person mit Waffe", "Schlägerei im Gange", "Bombendrohung"],
    correctAnswer: 1
  },
  {
    question: "Was würden Sie tun, wenn Sie den Code 10-40 hören und zu einem Einsatz fahren?",
    answers: ["Ohne Licht und Sirene", "Mit Sirenen und Licht", "Nichts", "Alle erschießen"],
    correctAnswer: 1
  },
  {
    question: "Was bedeutet 10-22?",
    answers: ["Ignorieren", "Aufstand", "Wichtige Verbrechenswarnung", "Benötigt einen Krankenwagen"],
    correctAnswer: 1
  },
  {
    question: "Was bedeutet 10-43?",
    answers: ["Brandalarm", "Konvoi oder Eskorte", "Information", "Bombendrohung"],
    correctAnswer: 3
  },
  {
    question: "Was ist der Code für 'Aufstand'?",
    answers: ["Es gibt keinen Code", "10-34", "10-24", "10-23"],
    correctAnswer: 2
  },
  {
    question: "Was bedeutet 10-8?",
    answers: ["Außer Betrieb", "In Betrieb", "Wiederholung", "Information zu einer Lizenz"],
    correctAnswer: 2
  },
  {
    question: "Und was ist mit 10-81? Weißt du, was es bedeutet?",
    answers: ["Herzstillstand", "Fahndung im Gange", "Schlägerei im Gange", "Bericht über Alkohol- / Drogentest"],
    correctAnswer: 4
  },
  {
    question: "Was bedeutet 10-7?",
    answers: ["Brauche Unterstützung", "Straße blockiert bei __", "Person mit Waffe", "Außer Betrieb"],
    correctAnswer: 1
  }
];

  let questionIndex,
    currentQuestion,
    score,
    timeSpent,
    quizTimer,
    questionIsAnswered,
    isQuizDone;
  let quiz = document.getElementById("quiz");

  function initQuiz() {
    quiz.classList.remove("quiz-intro");
    quiz.classList.add("quiz-started");

    questionIndex = 0;
    currentQuestion = 1;
    questionIsAnswered = 0;
    score = 0;
    timeSpent = "00:00";

    quiz.innerHTML = `<div id="progress-container"><span id="progress"></span></div>
    <div id="stats">
    <p>Frage: <span id="questionNumber">${currentQuestion}/${
      questions.length
    }</span></p>
    <p>Punktezahl: <span id="score">${score}</span></p>
    <p>Zeit: <span id="timer">00:00</span></p>
    </div>
    <section id="answers"></section>`;

    displayQuestion();
    startTimer();
  }

  function displayQuestion() {
    let question = questions[questionIndex];
    let answers = document.getElementById("answers");
    let answerNumber = 0;
    let output = `<h2 class="text-center bold">${currentQuestion}. ${
      question.question
    }</h2>`;

    for (let i in question.answers) {
      answerNumber++;
      output += `<div class="answer">
      <input type="radio" id="answer-${answerNumber}" name="answers" value="${answerNumber}">
      <label for="answer-${answerNumber}">
      <span class="answer-number">${answerNumber}.</span> ${question.answers[i]}
      </label>
      </div>`;
    }

    answers.innerHTML = output;
  }

  function startTimer() {
    let s = 0;
    let m = 0;
    let h = 0;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let timer = document.getElementById("timer");

    quizTimer = setInterval(function() {
      s++;

      if (s > 59) {
        s = 0;
        m++;
        seconds = "0" + s;
      }

      if (m > 59) {
        m = 0;
        h++;
        minutes = "00";
      }

      seconds = s > 9 ? s : "0" + s;
      minutes = m > 9 ? m : "0" + m;
      hours = h > 9 ? h : "0" + h;

      timeSpent = h
        ? hours + ":" + minutes + ":" + seconds
        : minutes + ":" + seconds;
      timer.textContent = timeSpent;
    }, 1000);
  }

  function displayResults() {
    let notification = document.getElementById("notification");
    notification.parentElement.removeChild(notification);
    quizTimer = null;
    isQuizDone = 1;

    let pageURL = window.location.href;
    let shareText = `Ich habe gerade diesen Quiz abgeschlossen und ${score} von ${
      questions.length
      } Fragen richtig beantwortet.`;
    let fbShareURL = `https://www.facebook.com/sharer.php?u=${pageURL}&quote=${shareText}`;
    let twitterShareURL = `https://twitter.com/intent/tweet?text=${shareText} ${pageURL}`;

    quiz.innerHTML = `<section id="results" class="text-center">
    <h2 class="bold">Hier sind deine Ergebnisse:</h2>
    <p id="percentage">${scorePercentage()}%</p>
    <p>Du hast <span class="bold">${score}</span> von <span class="bold">${
      questions.length
    }</span> Fragen rightig.</p>
    <p style="margin-top: 10px;">Deine Zeit: <span class="bold">${timeSpent}</span></p>

    <h3 class="bold">Teile deine Ergebnisse</h3>
    <a class="share-link fb-bg" href="${fbShareURL}" target="_blank">Facebook</a>
    <a class="share-link twitter-bg" href="${twitterShareURL}" target="_blank">Twitter</a>

    <button type="button" id="start-over-btn" class="btn blue-btn">Nochmal</button>
    </section>`;
  }

  function goToNextQuestion() {
    currentQuestion++;
    questionIndex++;
    questionIsAnswered = 0;

    let notification = document.getElementById("notification");
    notification.parentElement.removeChild(notification);

    let questionNumber = document.getElementById("questionNumber");
    questionNumber.textContent = `${currentQuestion}/${questions.length}`;

    displayQuestion();
  }

  function submitAnswer(e) {
    let selectedAnswer = Number(e.target.value);
    let rightAnswer = questions[questionIndex].correctAnswer;
    let answers = document.getElementsByName("answers");
    let progress = document.getElementById("progress");

    questionIsAnswered = 1;

    progress.style.width = progressPercentage() + "%";

    let notification = document.createElement("div");
    let message = document.createElement("p");
    let label = e.target.nextElementSibling;
    notification.id = "notification";

    if (selectedAnswer === rightAnswer) {
      score++;
      message.textContent = "Rightig!";
      label.classList.add("green-bg");
    } else {
      message.textContent = "Falsch!";
      label.classList.add("red-bg");

      answers.forEach(answer => {
        if (Number(answer.value) !== rightAnswer) return;

        answer.nextElementSibling.classList.add("green-bg");
      });
    }

    let button = document.createElement("button");
    button.classList.add("blue-btn");

    if (isLastQuestion()) {
      button.id = "show-results-btn";
      button.textContent = "Meine ergebnisse";
      clearInterval(quizTimer);
      quizTimer = null;
    } else {
      button.id = "next-btn";
      button.textContent = "Weiter";
    }

    notification.appendChild(message);
    notification.appendChild(button);
    quiz.insertAdjacentElement("afterend", notification);

    button.focus();

    answers.forEach(answer => (answer.disabled = "disabled"));

    document.getElementById("score").textContent = score;
  }

  let scorePercentage = () => (score / questions.length * 100).toFixed(0);
  let progressPercentage = () =>
    (currentQuestion / questions.length * 100).toFixed(0);
  let isLastQuestion = () => currentQuestion === questions.length;

  function spaceBarHandler() {
    if (document.querySelector(".quiz-intro")) {
      initQuiz();
    }

    if (questionIsAnswered && quizTimer) {
      goToNextQuestion();
    }

    if (!quizTimer && !isQuizDone) {
      displayResults();
      console.log("last");
    }
  }

  function numericKeyHandler(e) {
    let answers = document.getElementsByName("answers");

    answers.forEach(answer => {
      if (answer.value === e.key) {
        if (questionIsAnswered) return;

        answer.checked = "checked";

        let event = new Event("change");
        answer.dispatchEvent(event);
        submitAnswer(event);

        questionIsAnswered = 1;
      }
    });
  }

  document.addEventListener("click", function(e) {
    if (
      e.target.matches("#start-quiz-btn") ||
      e.target.matches("#start-over-btn")
    )
      initQuiz();
    if (e.target.matches("#next-btn")) goToNextQuestion();
    if (e.target.matches("#show-results-btn")) displayResults();
  });

  document.addEventListener("change", function(e) {
    if (e.target.matches('input[type="radio"]')) submitAnswer(e);
  });

  document.addEventListener("keyup", function(e) {
    if (e.keyCode === 32) spaceBarHandler();
    if (e.keyCode >= 48 && e.keyCode <= 57) numericKeyHandler(e);
  });

  document
    .getElementById("shortcuts-info-btn")
    .addEventListener("click", function() {
      let info = document.querySelector(".shortcuts-info");
      info.classList.toggle("display-block");
    });
})();


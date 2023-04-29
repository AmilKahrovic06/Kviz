console.log(questions);
let odgovorio = false;
let tacan = false;

var ukupnoPitanja = questions.length;
var trenutnoPitanje = 0;
let timeLeft = 30;
let timerId;

function promesaj() {
  questions.sort(function (a, b) {
    return Math.random() - 0.5;
  });
}

function kreirajDugmeRestart() {
  let restartGame = document.createElement("button");
  restartGame.innerHTML = "Restart";
  restartGame.style.color = "red";
  restartGame.style.fontSize = "20px";
  restartGame.style.padding = "20px";
  restartGame.style.borderRadius = "10px";
  restartGame.style.cursor = "pointer";
  restartGame.style.position = "fixed";
  restartGame.style.bottom = "70px";
  restartGame.style.left = "100px";
  restartGame.onclick = () => {
    window.location.reload();
  };
  odgovori.appendChild(restartGame);
}
function promeniBojuPozadine() {
  if (questionIndex == 5 || questionIndex == 10 || questionIndex == 15) {
    pitanje.style.backgroundColor = "orange";
  } else {
    pitanje.style.backgroundColor = "black";
  }
}

promesaj();

let odgovori = document.querySelector(".answers");
let pitanje = document.querySelector(".question");
console.log(pitanje);

let questionIndex = 0;
const tekstPitanja = document.createElement("h3");
tekstPitanja.className = "question_js";
tekstPitanja.innerHTML = questions[questionIndex].question;
function startTimer() {
  timerId = setInterval(() => {
    timeLeft--;

    document.getElementById("time").textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerId);
      disableButton();
      document.getElementById("time").textContent = 0;
    }
  }, 1000);
}

function answers() {
  promeniBojuPozadine();
  kreirajDugmeRestart();
  startTimer();
  console.log(
    "Tacan odgovor:",
    questions[questionIndex].correct_answer + 1,
    ". odgovor."
  );
  pitanje.appendChild(tekstPitanja);

  questions[questionIndex].answers.forEach((answer) => {
    // console.log(answer);

    const button = document.createElement("button");
    button.className = "ans_button";
    button.textContent = answer;

    button.addEventListener("click", () => {
      console.log(button.innerText);
      const modal = document.createElement("div");
      modal.className = "modal";

      const modalContent = document.createElement("div");
      modalContent.className = "modal-content";

      const modalText = document.createElement("p");
      modalText.style.fontSize = "30px";
      modalText.textContent = "Are you sure this is your final answer?";
      modalContent.appendChild(modalText);

      const modalButtons = document.createElement("div");
      modalButtons.className = "modal-buttons";

      const yesButton = document.createElement("button");
      yesButton.textContent = "Yes";
      yesButton.style.backgroundColor = "green";

      yesButton.addEventListener("click", () => {
        console.log("Odgovor potvrđen!");
        let index = questions[questionIndex].answers.indexOf(button.innerText);
        console.log("Odgovoreno:", index + 1);

        if (index === questions[questionIndex].correct_answer) {
          console.log("Tacan odgovor");
          button.style.backgroundColor = "green";
          tacan = true;
        } else {
          console.log("Netacan odgovor");
          button.style.backgroundColor = "red";
          tacan = false;
        }
        modal.style.display = "none";
        odgovorio = true;
        disableButton();
      });

      const noButton = document.createElement("button");
      noButton.textContent = "No";
      noButton.style.backgroundColor = "rgb(180, 0, 0)";
      noButton.addEventListener("click", () => {
        modal.style.display = "none";
      });
      modalButtons.appendChild(yesButton);
      modalButtons.appendChild(noButton);
      modalContent.appendChild(modalButtons);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      modal.style.display = "block";
    });
    odgovori.appendChild(button);
  });
}

function prikaziPitanje() {
  clearInterval(timerId);
  timeLeft = 30;
  odgovorio = false;
  tacan = false;
  odgovori.innerHTML = "";
  console.log("Indeks pitanja:", questionIndex);
  tekstPitanja.innerHTML = questions[questionIndex].question;

  answers();
}

prikaziPitanje();

function disableButton() {
  const btn = document.querySelectorAll(".ans_button");

  btn.forEach((el) => {
    el.disabled = true;
  });
}

function next() {
  if (odgovorio) {
    if (tacan) {
      questionIndex++;
      trenutnoPitanje++;

      if (questionIndex < questions.length) {
        prikaziPitanje();
        console.log(trenutnoPitanje);

        var progressBar = document.querySelector(".progress-bar");
        var progressPercent = (trenutnoPitanje / ukupnoPitanja) * 100;
        progressBar.style.width = progressPercent + "%";
        progressBar.style.transition = "0.7s cubic-bezier(.9,-0.55,.15,.64)";
      } else {
        pitanje.innerText =
          "The quiz is over! You have completed all the questions! Congratulations!";
        clearInterval(timerId);
        document.getElementById("time").textContent = 0;
        pitanje.style.color = "white";
        odgovori.innerHTML = "";
        document.querySelector(".next").style.display = "none";
        var progressBar = document.querySelector(".progress-bar");
        var progressPercent = (trenutnoPitanje / ukupnoPitanja) * 100;
        progressBar.style.width = progressPercent + "%";
        progressBar.style.transition = "0.7s cubic-bezier(.9,-0.55,.15,.64)";
        kreirajDugmeRestart();
      }
    } else {
      pitanje.innerHTML =
        "The quiz is over! You did not answer correctly. Please restart the game";
      clearInterval(timerId);
      document.getElementById("time").textContent = 0;
      pitanje.style.color = "white";
      pitanje.style.fontSize = "20px";
      pitanje.style.padding = "20px";
      odgovori.innerHTML = "";
      document.querySelector(".next").style.display = "none";
      kreirajDugmeRestart();
    }
  } else {
    const modal = document.createElement("div");
    modal.className = "modal";
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    const modalText = document.createElement("p");
    modalText.textContent = "Please answer the question.";
    modalContent.appendChild(modalText);
    const modalButton = document.createElement("button");
    modalButton.style.padding = "10px 20px 10px 20px";
    modalButton.style.margin = "20px";
    modalButton.style.borderRadius = "4px";
    modalButton.style.backgroundColor = "white";
    modalButton.style.border = "none";

    modalButton.textContent = "OK";
    modalButton.addEventListener("click", () => {
      modal.style.display = "none";
    });
    modalContent.appendChild(modalButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    modal.style.display = "block";
  }
}

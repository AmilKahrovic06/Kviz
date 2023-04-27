console.log(questions);
let odgovorio = false;
let tacan = false;

function promesaj() {
  questions.sort(function (a, b) {
    return Math.random() - 0.5;
  });
}
promesaj();

let odgovori = document.querySelector(".answers");
let pitanje = document.querySelector(".question");
console.log(pitanje);

let questionIndex = 0;
const tekstPitanja = document.createElement("h3");
tekstPitanja.className = "question_js";
tekstPitanja.innerHTML = questions[questionIndex].question;

function answers() {
  pitanje.appendChild(tekstPitanja);

  questions[questionIndex].answers.forEach((answer) => {
    console.log(answer);

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
      modalText.textContent = "Jeste li sigurni da je ovo vas konacan odgovor?";
      modalContent.appendChild(modalText);

      const modalButtons = document.createElement("div");
      modalButtons.className = "modal-buttons";

      const yesButton = document.createElement("button");
      yesButton.textContent = "Da";
      yesButton.style.backgroundColor = "green";

      yesButton.addEventListener("click", () => {
        console.log("Odgovor potvrđen!");
        let index = questions[questionIndex].answers.indexOf(button.innerText);
        console.log(index);

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
      noButton.textContent = "Ne";
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
  odgovorio = false;
  tacan = false;
  odgovori.innerHTML = "";
  console.log(questionIndex);
  tekstPitanja.innerHTML = questions[questionIndex].question;

  answers();
}

prikaziPitanje();

function disableButton() {
  const btn = document.querySelectorAll(".ans_button");
  if (odgovorio) {
    btn.forEach((el) => {
      el.disabled = true;
    });
  }
}

function next() {
  if (odgovorio) {
    if (tacan) {
      questionIndex++;
      if (questionIndex < questions.length) {
        prikaziPitanje();
      } else {
        pitanje.innerHTML =
          "Kviz je zavrsen! Zavrsili ste sva pitanja! Svaka cast!";
        odgovori.innerHTML = "";
        document.querySelector(".next").style.display = "none";
      }
    } else {
      pitanje.innerHTML =
        "Kviz je zavrsen! Niste odgovorili tacno. Molimo pokrenite igru ispocetka";
      pitanje.style.color = "white";
      pitanje.style.fontSize = "20px";
      pitanje.style.padding = "20px";
      odgovori.innerHTML = "";
      document.querySelector(".next").style.display = "none";
    }
  } else {
    const modal = document.createElement("div");
    modal.className = "modal";
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    const modalText = document.createElement("p");
    modalText.textContent = "Molimo vas, odgovorite na pitanje.";
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

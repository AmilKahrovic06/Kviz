console.log(questions);
let odgovorio = false
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
    modalText.textContent = "Jeste li sigurni da je ovo vaš konačan odgovor?";
    modalContent.appendChild(modalText);
    const modalButtons = document.createElement("div");
    modalButtons.className = "modal-buttons";
    const yesButton = document.createElement("button");
    yesButton.textContent = "Da";

    yesButton.addEventListener("click", () => {
  
    console.log("Odgovor potvrđen!");
    let index = questions[questionIndex].answers.indexOf(button.innerText);
    console.log(index)
      if (index=== questions[questionIndex].correct_answer) {    
        console.log('tacan')
        button.style.backgroundColor = 'green'
        tacan = true;     
    }
      else{
        button.style.backgroundColor = 'red'
        console.log('nije tacan')
        tacan = false;
      }


      modal.style.display = "none";
      odgovorio=true;
      disableButton();
    });
    const noButton = document.createElement("button");
    noButton.textContent = "Ne";
    noButton.addEventListener("click", () => {
  
      modal.style.display = "none";
  
      if (questionIndex < questions.length - 1) {
        questionIndex++;
        prikaziPitanje();
      }
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
odgovori.innerHTML = "";
console.log(questionIndex)
tekstPitanja.innerHTML = questions[questionIndex].question;

answers();
}

prikaziPitanje();


function disableButton(){
    const btn = document.querySelectorAll(".ans_button");
    if(odgovorio){

        btn.forEach(el=>{
            el.disabled = true;
            
        })
    }

}


function next () {
 questionIndex++
 answers.innerHTML=""
answers()

tekstPitanja.innerHTML = questions[questionIndex].question;
console.log(questionIndex)

}
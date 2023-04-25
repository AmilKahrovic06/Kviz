console.log(questions);

function promesaj(){
    questions.sort(function(a, b) {
        return Math.random() - 0.5;
      });
}
promesaj();

  let pitanje=document.querySelector(".question");


console.log(questions[0])
const questionIndex=0;
console.log(questions[questionIndex].question)
const tekstPitanja=document.createElement("p");
tekstPitanja.innerHTML=questions[questionIndex].question;
   


    function answers(){
        questions[questionIndex].answers.forEach((answer) => {
            const button = document.createElement('button');
            button.textContent = answer;
            pitanje.appendChild(tekstPitanja);
            pitanje.appendChild(button);
          });
    }

    answers();
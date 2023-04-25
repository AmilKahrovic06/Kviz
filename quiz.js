console.log(questions);

function promesaj(){
    questions.sort(function(a, b) {
        return Math.random() - 0.5;
      });
}
promesaj();

  let odgovori=document.querySelector(".answers");
  let pitanje=document.querySelector(".question");
  console.log(pitanje)


console.log(questions[0])
const questionIndex=0;
console.log(questions[questionIndex].question)
const tekstPitanja=document.createElement("p");
tekstPitanja.innerHTML=questions[questionIndex].question;
 
   


    function answers(){
        pitanje.appendChild(tekstPitanja)

        questions[questionIndex].answers.forEach((answer) => {
            const button = document.createElement('button');
            button.textContent = answer;
            

            odgovori.appendChild(button);
          });
    }

    answers();
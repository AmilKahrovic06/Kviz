console.log(questions);

function promesaj(){
    questions.sort(function(a, b) {
        return Math.random() - 0.5;
      });
}
promesaj();

  let pitanje=document.querySelector(".question");
  
  questions.answers.forEach(element => {
    document.write(questions[element])
  });

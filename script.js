const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false}
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false}
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true}
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            {text: "Earth", correct: false},
            {text: "Mars", correct: true},
            {text: "Jupiter", correct: false},
            {text: "Saturn", correct: false}
        ]
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: [
            {text: "Gold", correct: false},
            {text: "Iron", correct: false},
            {text: "Diamond", correct: true},
            {text: "Quartz", correct: false}
        ]
    },
    {
        question: "Which is the longest river in the world?",
        answers: [
            {text: "Amazon River", correct: false},
            {text: "Nile River", correct: true},
            {text: "Yangtze River", correct: false},
            {text: "Mississippi River", correct: false}
        ]
    },
    {
        question: "How many bones are there in an adult human body?",
        answers: [
            {text: "206", correct: true},
            {text: "306", correct: false},
            {text: "156", correct: false},
            {text: "216", correct: false}
        ]
    },
    {
        question: "Which country is home to the Kangaroo?",
        answers: [
            {text: "South Africa", correct: false},
            {text: "Australia", correct: true},
            {text: "New Zealand", correct: false},
            {text: "Kenya", correct: false}
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            {text: "CO2", correct: false},
            {text: "O2", correct: false},
            {text: "H2O", correct: true},
            {text: "NaCl", correct: false}
        ]
    },
    {
        question: "Which gas do plants absorb from the atmosphere for photosynthesis?",
        answers: [
            {text: "Oxygen", correct: false},
            {text: "Hydrogen", correct: false},
            {text: "Nitrogen", correct: false},
            {text: "Carbon Dioxide", correct: true}
        ]
    }
];

const questionElement = document.querySelector("#question")
const answerBtn= document.querySelector(".answer-buttons")
const nxtBtn = document.querySelector("#nxtBtn")

let currentQuestionNo=0;
let score=0;

function startQuiz(){
    currentQuestionNo=0;
    score=0;
    nxtBtn.classList.add("hidden")
    showQuestion();
}

function showQuestion(){
    resetState();
    let currntQuestion = questions[currentQuestionNo];
    let questionNo= currentQuestionNo+1;
    // display question
    questionElement.innerHTML=questionNo+". "+currntQuestion.question;

    currntQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        // button.classList.add("Obtn finlandica border border-slate-400 hover:bg-sky-300 text-left pl-2");
        button.className="Obtn finlandica border border-slate-400 hover:bg-sky-300 text-left pl-2"
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }

        button.addEventListener("click",selectAnswer);
    })

}

function resetState(){
    nxtBtn.classList.add("hidden")
    // while(answerBtn.firstChild){
    //     answerBtn.removeChild(answerBtn.firstChild);
    // }
    answerBtn.innerHTML = "";

}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true'
    if(isCorrect){
        selectedBtn.classList.add("bg-green-600","hover:bg-green-600")
        selectedBtn.classList.remove("hover:bg-sky-300")
        score++;
    }
    else{
        selectedBtn.classList.add("bg-red-500","hover:bg-red-500")
        selectedBtn.classList.remove("hover:bg-sky-300")
    } 
    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct ==="true"){
            button.classList.add("bg-green-600","hover:bg-green-600")
        
        }
        button.classList.remove("hover:bg-sky-300")
        button.disabled=true;
    });
    nxtBtn.classList.remove("hidden")
}

function showScore(){
    resetState();
    questionElement.innerHTML=`Your scored ${score} out of ${questions.length}!`;
    nxtBtn.innerHTML="Play Again!"
    nxtBtn.classList.remove("hidden")
}

function handleNextButton(){
    currentQuestionNo++;
    if(currentQuestionNo < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nxtBtn.addEventListener("click",()=>{
    if(currentQuestionNo < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
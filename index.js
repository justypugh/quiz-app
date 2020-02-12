// When user clicks the start button on the main screen
function quizStart() {
    $(".start-button").on("click", function(event) {
        renderQuestion();
    });
}

function renderQuestion() { //renders quesiton
    let question = STORE.questions[STORE.currentQuestion];
    updateQuestionInfo();
    let html = $(`
    <form id="js-questions" class="question-form">
    <fieldset class="questions">
        <div class="question">
            <legend>${question.question}</legend>
        </div>

        <div class="responses"></div> 
        
        <div class="feedback"></div>
        
        <div class="controls">
            <button role="submitAnswer" type="submit" class="submit-button">Submit</button>
            <button role="nextQuestion" class="next-button">Next</button>
        </div>  
    </form>            
    </fieldset>    
    `);
    $(".js-questions-and-answers").html(html);
    $(".start").hide();
    $(".next-button").hide();
    $(".endOfQuiz").hide();
    updateResponses();
}

function updateQuestionInfo() { //updates what question number user is on and their score
    let html = (`
        <ul role="score" class="scoreInfo">
        <li class="outOf">Question: <span class="currentQuestion">${STORE.currentQuestion + 1}</span>/5</li>
        <li class="outOf">Score: <span class="score">${STORE.score}</span></li>
        </ul>
        `);
    $(".scoreInformation").html(html);
}

function updateResponses() { //updates possible responses for the represented question
    let question = STORE.questions[STORE.currentQuestion];
    for(let i = 0; i < question.options.length; i++) {
        $(".responses").append(`
        <label for="answers">
            <input type="radio" class="radio" name="answers" id="answers" value="${question.options[i]}" required /><span>${question.options[i]}</span>
        </label>
        `);
    }
}    


// When user submits a possible answer, checks if right or wrong, and lets user know
function submitAnswer() {
    $("body").on("submit", ".question-form", function(event){
        event.preventDefault();
        let presentQuestionAnswer = STORE.questions[STORE.currentQuestion].answer;
        let selected = $("input:checked").val(); 
        if(presentQuestionAnswer === selected) {
            STORE.score++;
            ifAnswerCorrect();
        } else {
            ifAnswerWrong(presentQuestionAnswer);
        }
        console.log(STORE.score);
        updateQuestionInfo();
        $(".submit-button").hide();
        $(".next-button").show();
    });
}

function ifAnswerCorrect() { //if the answer is correct
    let html = "<p>CORRECT! Good Job!</p>"
    $(".feedback").html(html);
} 

function ifAnswerWrong(presentQuestionAnswer) { //if the answer is incorrect
    let html = `<p>Sorry, the right answer is ${presentQuestionAnswer}.`
    $(".feedback").html(html);
}


// when user clicks clicks on "next" button
function nextQuestion() {
    $("body").on("click", ".next-button", function(event) {
        event.preventDefault();
        checkIfThroughQuestions();
    });    
}

function checkIfThroughQuestions() { //chekcs if finished running through questions
    let realNextQuestion = STORE.currentQuestion++;
    if(STORE.currentQuestion === STORE.questions.length) {
        end();
    } else {
        renderQuestion(realNextQuestion);
        updateQuestionInfo();
    }
}
   

function end() {
    let html = (`
    <fieldset class="endOfQuiz">
    <div class="quizEnd">
    <legend>You have finished the quiz!</legend>
    <h2>Your Score: ${STORE.score}/5 </h2>
</div>
<div class="controls">
    <button role="restartQuiz" class="restart-button">Restart</button>
</div>
</fieldset>
<section class="js-questions-and-answers"></section>
<section class="end"></section>
    `);        
    $("main").html(html);   
console.log("Finished");
}


// when user finishes the quiz and wants to start over
function restartQuiz() {
   $("body").on("click", ".restart-button", function(event){
    STORE.currentQuestion = 0;
    STORE.score = 0;
    renderQuestion();
    console.log("clicked");
   }); 
}

// handling the quiz app
function handleQuizApp() {
    quizStart();
    submitAnswer();
    nextQuestion();
    restartQuiz();
    
}

$(handleQuizApp);
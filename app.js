const box = document.querySelector('.box');
let scoreBox = document.querySelector('#score');
let questionBox = document.querySelector('.question-box h3');
let optionsHTML = document.querySelectorAll('.option');
let option1 = document.querySelector('#opt-1');
let option2 = document.querySelector('#opt-2');
let option3 = document.querySelector('#opt-3');
let option4 = document.querySelector('#opt-4');
let timerBox = document.getElementById('timer');
let timer = document.getElementById('fill-timer');
let questionNoBox = document.getElementById('question-number');
let highScore = document.getElementById('high-score');

let index = 1;
let score = 0;
let clickTimes = [];
let noOfQuestions = 11;
let currentQuestionNumber = 1;

let highestScore = localStorage.getItem('highest-score');

highScore.innerText = highestScore;

// fetching quiz data;
const fetchQuiz = async(limit) => {
    const res = await fetch(`https://the-trivia-api.com/questions?limit=${limit}`);
    const data = await res.json();
    return data;
}

// connector function to connect html loading function and data fetching function
const loadQuestions = async() => {
    try {
        let res = await fetchQuiz(50);
        loadHtml(res[0]);
    } catch(err) {
        console.log(err.message);
    }
}

// html loading function
function loadHtml(question) {
    
    let options = [...question.incorrectAnswers, question.correctAnswer];
    options = options.sort();
    optionsHTML = Array.from(optionsHTML);
    
    // assigning the text dynamically to the html elements
    questionBox.innerText = question.question;
    optionsHTML[0].innerText = options[0];
    optionsHTML[1].innerText = options[1];
    optionsHTML[2].innerText = options[2];
    optionsHTML[3].innerText = options[3];
    questionNoBox.innerText = currentQuestionNumber;

    // checking for correct answer
    optionsHTML.forEach((item) => {
        item.addEventListener('click', (e) => {
            if(e.target.innerText === question.correctAnswer) {
                score += 10;
                scoreBox.innerText = score;
            }
        })
    });
}

// function for button clicks
function btnClick (options) {

    options[0].addEventListener('click', (e) => {
        loadQuestions();

        currentQuestionNumber++;
        if(currentQuestionNumber === noOfQuestions) {
            document.write(`<div>
                <h3>Game over refresh the page now, your score is - ${score}</h3>
                <button onclick="document.location.reload(true)">Refresh</button>
                </div>
            `);

            if(!highestScore) {
                highestScore = localStorage.setItem('highest-score', score);
            }
            
            if(score > localStorage.getItem('highest-score')) {
                highestScore = localStorage.setItem('highest-score', score);
            }
        }
    });
    
    options[1].addEventListener('click', (e) => {
        loadQuestions();
        currentQuestionNumber++;

        if(currentQuestionNumber === noOfQuestions) {
            document.write(`<div>
                <h3>Game over refresh the page now, your score is - ${score}</h3>
                <button onclick="document.location.reload(true)">Refresh</button>
                </div>
            `);

            if(!highestScore) {
                highestScore = localStorage.setItem('highest-score', score);
            }

            
            if(score > localStorage.getItem('highest-score')) {
                highestScore = localStorage.setItem('highest-score', score);
            }
        }
    });
    
    options[2].addEventListener('click', (e) => {
        loadQuestions();
        currentQuestionNumber++;
        
        if(currentQuestionNumber === noOfQuestions) {
            document.write(`<div>
                <h3>Game over refresh the page now, your score is - ${score}</h3>
                <button onclick="document.location.reload(true)">Refresh</button>
                </div>
            `);
            if(!highestScore) {
                highestScore = localStorage.setItem('highest-score', score);
            }

            if(score > localStorage.getItem('highest-score')) {
                highestScore = localStorage.setItem('highest-score', score);
            }
        }
    });
    
    options[3].addEventListener('click', (e) => {
        loadQuestions();
        currentQuestionNumber++;

        if(currentQuestionNumber === noOfQuestions) {
            document.write(`<div>
                <h3>Game over refresh the page now, your score is - ${score}</h3>
                <button onclick="document.location.reload(true)">Refresh</button>
                </div>
            `);
            if(!highestScore) {
                highestScore = localStorage.setItem('highest-score', score);
            }

            
            if(score > localStorage.getItem('highest-score')) {
                highestScore = localStorage.setItem('highest-score', score);
            }
        }
    });
}

function move() {
    var id = setInterval(frame, 100);
    let width = 1;
    function frame() {
        if (width >= 100) {
            clearInterval(id);
            timer.style.width = "0%";
            move();
            loadQuestions();
        } else {
            width++;
            timer.style.width = width + '%';
        }
    }
}

// first render function
window.addEventListener('load', () => {
    loadQuestions();
});

// button clicking function called
btnClick(optionsHTML);
move();

const username = localStorage.getItem("playerName");
document.getElementById("playerName").textContent = username;

const question25 = [
    {
        question: "What company makes the Xperia model of smartphone?",
        answers: ["Sony", "Samsung", "Xiaomi", "Nokia"],
        correctAnswer: 0,
    },
    {
        question: "Who wrote 'Kobzar'?",
        answers: ["G. Skovoroda", "L. Ukrainka", "T. Shevchenko", "I. Franko"],
        correctAnswer: 2,
    },
    {
        question: "What is the speed of light?",
        answers: ["300 * 10^8", "300 * 10^3", "300 * 10^4", "300 * 10^6"],
        correctAnswer: 3,
    },
    {
        question: "What is the name of Jon Snow’s sword?",
        answers: ["Blackfyre", "Oathkeeper", "Longclaw", "Ekskalibur"],
        correctAnswer: 2,
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Leonardo Da Vinci", "Vincent van Gogh", "Edvard Munch", "Salvador Dalí"],
        correctAnswer: 0,
    },
    {
        question: "Which city is home to the Brandenburg Gate?",
        answers: ["Vienna", "Berlin", "Zurich", "Hamsburg"],
        correctAnswer: 1,
    },
    {
        question: "Who discovered America?",
        answers: ["Ferdinand Magellan", "Amerigo Vespucci", "Vasco da Gama", "Christopher Columbus"],
        correctAnswer: 3,
    },
    {
        question: "What year did World War II end?",
        answers: ["1945", "1918", "1939", "1943"],
        correctAnswer: 0,
    },
    {
        question: "What is the largest river?",
        answers: ["Amazon", "Nile", "Shannon", "Dnipro"],
        correctAnswer: 1,
    },
    {
        question: "Who is generally considered the inventor of the motor car?",
        answers: ["Henry Ford", "Henry M. Leland", "Karl Benz", "Marylin Monroe"],
        correctAnswer: 2,
    },
    {
        question: "Who invented the iPhone?",
        answers: ["Steve Jobs", "Elon Musk", "Bill Gates", "Nikola Tesla"],
        correctAnswer: 0,
    },
    {
        question: "What is the square root of 81?",
        answers: ["6", "7", "10", "9"],
        correctAnswer: 3,
    },
    {
        question: "Which is the largest ocean on Earth?",
        answers: ["Indian Ocean", "Pacific Ocean", "Atlantic Ocean", "Arctic Ocean"],
        correctAnswer: 1,
    },
    {
        question: "Where was tea invented?",
        answers: ["USA", "England", "China", "Poland"],
        correctAnswer: 2,
    },
    {
        question: "What is the capital city of Japan?",
        answers: ["Tokyo", "Kyoto", "Hiroshima", "Nagasaki"],
        correctAnswer: 0,
    },
    {
        question: "What is the capital of Australia?",
        answers: ["Adelaide", "Canberra", "Sydney", "Perth"],
        correctAnswer: 1,
    },
    {
        question: "What city hosted the 2002 Olympic Games?",
        answers: ["Berlin", "Tokyo", "Beijing", "Sydney"],
        correctAnswer: 3,
    },
    {
        question: "What is 12 squared?",
        answers: ["144", "100", "121", "81"],
        correctAnswer: 0,
    },
    {
        question: "What is the largest US state (by landmass)?",
        answers: ["California", "Florida", "Alaska", "Texas"],
        correctAnswer: 2,
    },
    {
        question: "Who fought in the coliseum?",
        answers: ["Jedis", "Gladiators", "Pikachu", "Knight"],
        correctAnswer: 1,
    },
    {
        question: "What letter denotes speed in physics?",
        answers: ["V", "F", "S", "T"],
        correctAnswer: 0,
    },
    {
        question: "What is the smallest country in the world?",
        answers: ["USA", "Ireland", "Vatican", "Switzerland"],
        correctAnswer: 2,
    },
    {
        question: "The fear of insects is known as what?",
        answers: ["Arachnophobia", "Ailurophobia", "Claustrophobiaa", "Entomophobia"],
        correctAnswer: 3,
    },
    {
        question: "How many days are there in a leap year?",
        answers: ["365", "364", "366", "1"],
        correctAnswer: 2,
    },
    {
        question: "What is the strongest muscle in the human body?",
        answers: ["Jaw", "Glutes", "Brain", "Heart"],
        correctAnswer: 0,
    }
];

const moneyAmounts = [
    "£100", "£200", "£300", "£500", "£1,000",
    "£2,000", "£4,000", "£8,000", "£16,000",
    "£32,000", "£64,000", "£125,000", "£250,000",
    "£500,000", "£1 Million"
];


const question15 = question25.sort(() => Math.random() - 0.5).slice(0, 15);
let currentQuestionIndex = 0;


function setQuestion() {

    resetAnswerButtons();

    const questionLabel = document.querySelector('.question-container label');
    const answerButtons = document.querySelectorAll('.answer-button');

    answerButtons.forEach(button => {
        button.onclick = null;
    });

    if (currentQuestionIndex < question15.length) {
        const currentQuestion = question15[currentQuestionIndex];

        questionLabel.textContent = currentQuestion.question;

        currentQuestion.answers.forEach((answer, index) => {
            answerButtons[index].textContent = answer;

            answerButtons[index].onclick = () => {
                clearTimeout(timer);
                checkAnswer(index);
            }
        }); 

        startTimer();
    }

    else {
        alert("Congrats! You have won a million!!");
        saveGameResults();
        window.location.href = "summary.html";
    }
    loadmoneyList();
}


//Mozilla Developer Network, 2023. Window.setTimeout. [online] Available at: https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout [Accessed 23rd October 2023].
function startTimer() {
    const timeLimit = 15000;
    timer = setTimeout(() => {
        alert("Time is up! You have lost all your money HAHAHA.");
        disableGame();
        saveGameResults();
        window.location.href = "summary.html";
    }, timeLimit);
}


const safePoints = [4, 9, 14];
let gameResult = [];


function checkAnswer(selectedIndex) {
    const currentQuestion = question15[currentQuestionIndex];

    gameResult.push({
        question: currentQuestion.question,
        answers: currentQuestion.answers,
        correctAnswer: currentQuestion.correctAnswer,
        selectedAnswer: selectedIndex
    });

    if (selectedIndex === currentQuestion.correctAnswer) {
        currentQuestionIndex++;
        setQuestion();
    } else {
        let earnedMoney = 0;
        for (let i = safePoints.length - 1; i >= 0; i--) {
            if (currentQuestionIndex > safePoints[i]) {
                earnedMoney = moneyAmounts[safePoints[i]];
                break;
            }
        }

        alert(
            `Wrong answer! You have lost. Your prize is: ${earnedMoney || "£0"}`
        );
        
        disableGame();
        saveGameResults();
        window.location.href = "summary.html";

    }
}


/*Sky.pro, 2023. Сохранение и работа с массивом в local storage на JavaScript. [online] 
Available at: https://sky.pro/wiki/html/sokhranenie-i-rabota-s-massivom-v-local-storage-na-java-script/ [Accessed 23rd October 2023].*/
function saveGameResults() {
    localStorage.setItem("gameResults", JSON.stringify(gameResult));
}



function disableGame() {
    const answerButtons = document.querySelectorAll(".answer-button");
    answerButtons.forEach((button) => {
        button.onclick = null;
    });

    const questionLabel = document.querySelector(".question-container label");
    questionLabel.textContent = "Game Over! HAHA Loser";
}


function loadmoneyList() {
    let moneyItems = document.querySelectorAll("#moneyTable tr");

    moneyItems.forEach(item => {
        item.style.backgroundColor = ""; 
    });

    if (currentQuestionIndex < moneyItems.length) { 
        moneyItems[moneyItems.length - 1 - currentQuestionIndex].style.backgroundColor = "red"; 
    }
}

let = fiftyFiftyChanceUsed = false;
let = askForHelpAudienceUsed = false;
let = askForHelpFriendUsed = false;

function fiftyFiftyChance(){
    if (fiftyFiftyChanceUsed) return;

    const currentQuestion = question15[currentQuestionIndex];
    const correctAnswerIndex = currentQuestion.correctAnswer;
    const answers = [0,1,2,3];
    const incorrectAnswers = [];

    for(let i = 0; i < answers.length; i++ ){
        if (i != correctAnswerIndex){
            incorrectAnswers.push(i);
        }
    }
    
    const answersToRemove = incorrectAnswers.sort(() => Math.random() - 0.5).slice(0, 2);

    answersToRemove.forEach(index => {
        const button = document.querySelectorAll(".answer-button")[index];
        button.textContent = "";
        button.disabled = true;
    });

    const fiftyFiftyButton = document.getElementById("fiftyFifty");
    fiftyFiftyButton.disabled = true;
    fiftyFiftyUsed = true;

}


function askForHelpAudience(){
    if (askForHelpAudienceUsed) return;

    const answers = [0,1,2,3];
    const answersToRemove = answers.sort(() => Math.random() - 0.5).slice(0, 3);
    
    answersToRemove.forEach(index => {
        const button = document.querySelectorAll(".answer-button")[index];
        button.textContent = "";
        button.disabled = true;
    });

    const askAudienceButton = document.getElementById("askAudience");
    askAudienceButton.disabled = true;
    askForHelpAudienceUsed = true;
}

function askForHelpFriend(){
    if (askForHelpFriendUsed) return;

    const answers = [0,1,2,3];
    const answersToRemove = answers.sort(() => Math.random() - 0.5).slice(0, 3);
    
    answersToRemove.forEach(index => {
        const button = document.querySelectorAll(".answer-button")[index];
        button.textContent = "";
        button.disabled = true;
    });


    const askFriendButton = document.getElementById("askFriend");
    askFriendButton.disabled = true;
    askForHelpFriendUsed = true;
}

function resetAnswerButtons() {
    const answerButtons = document.querySelectorAll(".answer-button");
    answerButtons.forEach(button => {
        button.disabled = false;
        button.textContent = "";
        button.style.border = "";
    });
}


document.addEventListener("DOMContentLoaded", () => {
    loadmoneyList();
    setQuestion();
});
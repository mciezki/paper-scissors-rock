//Objects with variables:
const choices = {
    playerChoice: "",
    computerChoice: "",
}

const gameSummary = {
    numbers: 0,
    wins: 0,
    looses: 0,
    draws: 0,
}

//Buttons:
const hands = document.querySelectorAll('.select img');
const startButton = document.querySelector('.start');
const selectedHands = document.querySelector('.select');

//Functions:

//Player choice:
function selectHand() {
    choices.playerChoice = this.dataset.option;
    hands.forEach(hand => {
        hand.style.boxShadow = "";
    })
    this.style.boxShadow = "0 0 0 4px green";
}

//Computer choice:
function computerHand() {
    const index = Math.floor(Math.random() * hands.length);
    choices.computerChoice = hands[index].dataset.option;
}

//Game Result:
function gameResult() {
    if ((choices.playerChoice === "paper" && choices.computerChoice === "rock") || (choices.playerChoice === "rock" && choices.computerChoice === "scissors") || (choices.playerChoice === "scissors" && choices.computerChoice === "paper")) {
        ++gameSummary.wins;
        return "PLAYER :)";
    } else if (choices.playerChoice === choices.computerChoice) {
        ++gameSummary.draws;
        return "DRAW :|";
    } else {
        ++gameSummary.looses;
        return "COMPUTER :(";
    }
}

//Game Finish:
function gameEnd(result) {
    document.querySelector('.numbers span').textContent = gameSummary.numbers;
    document.querySelector('[data-summary="your-choice"]').textContent = choices.playerChoice;
    document.querySelector('[data-summary="ai-choice"]').textContent = choices.computerChoice;
    document.querySelector('[data-summary="your-choice"]').style.color = "yellow";
    document.querySelector('[data-summary="ai-choice"]').style.color = "yellow";
    document.querySelector('[data-summary="who-win"]').textContent = result;
    if (result === "PLAYER :)") {
        document.querySelector('[data-summary="who-win"]').textContent = result;
        document.querySelector('[data-summary="who-win"]').style.color = "green";
        document.querySelector('.wins span').textContent = gameSummary.wins;
    } else if (result === "COMPUTER :(") {
        document.querySelector('[data-summary="who-win"]').style.color = "red";
        document.querySelector('.looses span').textContent = gameSummary.looses;
    } else {
        document.querySelector('[data-summary="who-win"]').style.color = "blue";
        document.querySelector('.draws span').textContent = gameSummary.draws;
    }
}

//Game Restart:
function choiceRestart() {
    choices.playerChoice = "";
    hands.forEach(hand => hand.style.boxShadow = "");
}

//Game runner:
function gameStart() {
    ++gameSummary.numbers;
    if (!choices.playerChoice) {
        return alert("You have to choose your move!")
    }
    computerHand();
    const result = gameResult();
    gameEnd(result);
    choiceRestart();
}

//addEventListener:
hands.forEach(hand => hand.addEventListener('click', selectHand));
startButton.addEventListener('click', gameStart);


document.addEventListener('click', (e) => {
    const insideHand = selectedHands.contains(e.target);
    if (!insideHand) {
        choices.playerChoice = "";
        hands.forEach(hand => hand.style.boxShadow = "");
    }
})
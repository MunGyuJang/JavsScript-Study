const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'CONPUTER_WINS';

let SELECTION;
let gameIsRunning = false;

function checkYourChoice(selection) {
    if (
        selection !== ROCK &&
        selection !== PAPER &&
        selection !== SCISSORS
    ) {
        return false;
    } else {
        return true;
    }
}

function getPlayerChoice() { // 기존에 배운 함수 방식
    const selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}?`, '').toUpperCase();

    if (
        !checkYourChoice(selection)
    ) {
        alert('Invalid choice!');
        getPlayerChoice();
    } else {
        SELECTION = selection;
    }

    return SELECTION;
}

const getComputerChoice = function() { // 익명 함수 방식
    const randomValue = Math.random();

    if (randomValue < 0.34) {
        return ROCK;
    } else if (randomValue < 0.67) {
        return PAPER;
    } else {
        return SCISSORS;
    }
}

const getWinner = (cChoice, pChoice) => // 익명 함수를 생성하는 또 다른 방법
    cChoice === pChoice
        ? RESULT_DRAW
        :   (cChoice === ROCK && pChoice === PAPER) ||
            (cChoice === PAPER && pChoice === SCISSORS) ||
            (cChoice === SCISSORS && pChoice === ROCK)
        ? RESULT_PLAYER_WINS
        : RESULT_COMPUTER_WINS;

    // if (cChoice === pChoice) { 위의 동작과 같은 일반적인 로직
    //     return RESULT_DRAW;
    // } else if (
    //     (cChoice === ROCK && pChoice === PAPER) ||
    //     (cChoice === PAPER && pChoice === SCISSORS) ||
    //     (cChoice === SCISSORS && pChoice === ROCK)
    // ) {
    //     return RESULT_PLAYER_WINS;
    // } else {
    //     return RESULT_COMPUTER_WINS;
    // }

startGameBtn.addEventListener('click', function() {
    if (gameIsRunning) {
        return;
    }
    gameIsRunning = true;
    console.log('Game is starting...');
    const playerChoice = getPlayerChoice();
    const computerChoice = getComputerChoice();
    const winner = getWinner(computerChoice, playerChoice);
    let message = `You picked ${playerChoice}, computer picked ${computerChoice}, therefore you `;
    if (winner === RESULT_DRAW) {
        message = message + 'had a draw.';
    } else if (winner === RESULT_PLAYER_WINS) {
        message = message + 'won.';
    } else {
        message = message + 'lost.';
    }
    alert(message);
    gameIsRunning = false;
});

/* 
const add = function(a, b) {
    return a + b
}
const add2 = (a, b) => a + b;

() => { ... } 괄호는 있어야 함

arg => { ... } 단, 인수가 한 개면 생략 가능

(a, b) => { 필요하면 중괄호를 추가 가능(객체를 반환하려 할 때는 주의할 것)
    a += 2; return a + b;
}


Rest 매개변수
fn(1, 2, 3, 4, 5)
const fn = (a, b, ...c) => {
    a = 1
    b = 2
    c = [3, 4, 5]
}


bind 메서드
function fn1(handler, b) { handler에 한 개의 매개변수만 전달할 수 있음
    handler(b)
}

function fn2(a, b) { 두 개의 매개변수가 필요함

}

fn1(fn2.bind(this, a)) 핸들러로 사용될 fn2에 첫 번째 인자 a를 미리 전달

*/
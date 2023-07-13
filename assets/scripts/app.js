const defaultResult = 0;
let calcDescription = defaultResult;
let currentResult = defaultResult;

function getUserNumberInput() {
    return +userInput.value;
}

function add() {
    const enteredNumber = getUserNumberInput()
    calcDescription = `${calcDescription} + ${enteredNumber}`
    currentResult += enteredNumber;
    outputResult(currentResult, calcDescription);
}

function sub() {
    const enteredNumber = getUserNumberInput()
    calcDescription = `${calcDescription} - ${enteredNumber}`
    currentResult -= enteredNumber;
    outputResult(currentResult, calcDescription);
}

function mul() {
    const enteredNumber = getUserNumberInput()
    calcDescription = `(${calcDescription}) * ${enteredNumber}`
    currentResult *= enteredNumber;
    outputResult(currentResult, calcDescription);
}

function div() {
    const enteredNumber = getUserNumberInput()
    calcDescription = `(${calcDescription}) / ${enteredNumber}`
    currentResult /= enteredNumber;
    outputResult(currentResult, calcDescription);
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', sub);
multiplyBtn.addEventListener('click', mul);
divideBtn.addEventListener('click', div);

// 줄 주석 {ctrl + /} by vscode
/* 블럭 주석 {alt + shift + a} by vscode
백틱으로 감싸면 ${}이나 줄넘김을 사용할 수 있다.
변수-- : 변수 -= 1과 동일
변수++ : 변수 += 1과 동일
--변수 : 변수에 1을 뺀 값을 반환
++변수 : 변수에 1을 더한 값을 반환
*/
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

function getEnteredValue() {
    const enteredValue = prompt('Maximun life for you and the monster.', '100');
    if (isNaN(enteredValue) || enteredValue <= 0) {
        alert("Not a valid value!");
        getEnteredValue();
    } 
    
    return parseInt(enteredValue);
}

let chosenMaxLife = getEnteredValue();
let battleLog = [];
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBounsLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, tg) {
    let logEntry = {
        event: ev,
        value: val,
        target: tg,
        finalMonsterHealth: currentMonsterHealth,
        finalPlayerHealth: currentPlayerHealth
    };
    battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function attackPlayer() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = Math.min(dealPlayerDamage(MONSTER_ATTACK_VALUE), currentPlayerHealth);
    currentPlayerHealth -= playerDamage;
    writeToLog('MONSTER_ATTACK', playerDamage, 'PLAYER');

    if (currentPlayerHealth <= 0 && hasBounsLife) {
        hasBounsLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert("You would be dead but the bonus life saved you!");
    }

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
            alert("You have a draw!");
            battleLog.push({event: 'A DRAW'});
        } else if (currentPlayerHealth > 0) {
            alert("You won!");
            battleLog.push({event: 'PLAYER WON'});
        } else if (currentMonsterHealth > 0) {
            alert("You lose!");
            battleLog.push({event: 'MONSTER WON'});
        }
        reset();
    }
}

function attackMonster(attackValue, event) {
    const damage = Math.min(dealMonsterDamage(attackValue), currentMonsterHealth);
    currentMonsterHealth -= damage;
    writeToLog(event, damage, 'MONSTER');

    attackPlayer();
}

function attackHandler() {
    attackMonster(ATTACK_VALUE, 'PLAYER_ATTACK');
}

function strongAttackHandler() {
    attackMonster(STRONG_ATTACK_VALUE, 'PLAYER_STRONG_ATTACK');
}

function healPlayerHandler() {
    if (chosenMaxLife === currentPlayerHealth) {
        alert("You already have max health.");
        return;
    }

    let healValue = Math.min(chosenMaxLife - currentPlayerHealth, HEAL_VALUE);
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog('PLAYER_HEAL', healValue, 'PLAYER');

    attackPlayer();
}

function printLogHandler() {
    for (const log of battleLog) {
        console.log(log);
    }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);

/* 삼항연산자
a = a >= 1 ? 1 : 0
a가 1보다 크거나 같으면 a에게 1을 할당하고, 그렇지 않으면 0을 할당

!! : 값을 불리언 타입으로 변환(부정을 부정)

a = a || b
a가 truthy한 값이라면 a를 아니라면 b(기본값)를 할당

a = a && b
a가 truthy한 값이라면 b를 할당, 아니라면 a 그대로

switch (a) {
    case b:
        break;
    case c:
        break
    case d:
}

for (;;) == while (true)

do {                repeat
    a++;                a++;
} while (a < 3)     until a < 3

outerWhile: do {
    innerFor: for {
        break outerWhile; (레이블을 사용해 외부 반복문 중단하기)
    }
}

try { 

} catch (error) { try에서 오류가 발생할 경우

} finally { 위의 과정에서 오류 발생 여부에 상관없이 실행

}
 */
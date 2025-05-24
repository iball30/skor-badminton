let score1 = 0;
let score2 = 0;
let gameOver = false;

const score1Element = document.getElementById("score1")
const score2Element = document.getElementById("score2")
const gameStatusElement = document.getElementById("gameStatus")
const player1Container = document.getElementById("player1Container")
const player2Container = document.getElementById("player2Container")

const add1Btn = document.getElementById("add1")
const subtract1Btn = document.getElementById("subtract1")
const reset1Btn = document.getElementById("reset1")
const add2Btn = document.getElementById("add2")
const subtract2Btn = document.getElementById("subtract2")
const reset2Btn = document.getElementById("reset2")
const resetGameBtn = document.getElementById("resetGame")

function gameStatus() {
    if(score1 >= 30 || score2 >= 30) {
        return score1 > score2 ? "player1_wins" : "player2_wins"
    }

    if(score1 >= 21 || score2 >= 21) {
        const diff = Math.abs(score1 - score2);
        if(diff >= 2) {
            return score1 > score2 ? "player1_wins" : "player2_wins"
        }
    }

    if(score1 >= 20 && score2 >= 20) {
        if(score1 === score2) {
            if(score1 >= 29) {
                return "final_deuce"
            } else if(score1 >= 20) {
                return "deuce"
            }
        }
        return "advantage";
    }
    return "playing"
}

function updateDisplay() {
    score1Element.textContent = score1;
    score2Element.textContent = score2;

    const status = gameStatus();

    player1Container.classList.remove("winner");
    player2Container.classList.remove("winner");

    switch (status) {
        case "player1_wins": 
            gameStatusElement.innerHTML = "<div class='game-over'>Pemain 1 Menang!!</div>";
            player1Container.classList.add("winner")
            gameOver = true;
            break;
        case "player2_wins":
            gameStatusElement.innerHTML = "<div class='game-over'>Pemain 2 Menang!!</div>";
            player2Container.classList.add("winner")
            gameOver = true;
            break;
        case "final_deuce":    
            gameStatusElement.innerHTML = "<div class='deuce-indicator'>FINAL DEUCE (29 - 29) - Poin selanjutnya menentukan pemenangnya!!</div>";
            gameOver = false;  
            break;
        case "deuce" :
            gameStatusElement.innerHTML = "<div class='deuce-indicator'>DEUCE - Harus unggul 2 poin untuk menang!!</div>";
            gameOver = false;
            break;
        case "advantage": 
            gameStatusElement.innerHTML = '<div class="deuce-indicator">1 Poin lagi buat pemenang</div>';
            gameOver = false;
            break;
        default:
            gameStatusElement.innerHTML = "Game berlangsung - Main hingga 21 poin";
            gameOver = false;    
    }
    updateButtonStates();
}

function updateButtonStates() {
    const allButton = [add1Btn, add2Btn, subtract1Btn, subtract2Btn, reset1Btn, reset2Btn];
    allButton.forEach(btn => {
        if(gameOver) {
            btn.disabled = true;
        } else {
            btn.disabled = false;
        }
    });

    subtract1Btn.disabled = gameOver || score1 <= 0;
    subtract2Btn.disabled = gameOver || score2 <= 0;
}

add1Btn.addEventListener("click", () => {
    if(!gameOver) {
        score1++;
        updateDisplay();
    }
})

subtract1Btn.addEventListener("click", () => {
    if(!gameOver && score1 > 0) {
        score1--;
        updateDisplay();
    }
})

reset1Btn.addEventListener("click", () => {
    if(!gameOver) {
        score1 = 0;
        updateDisplay();
    }
})

add2Btn.addEventListener("click", () => {
    if(!gameOver) {
        score2++;
        updateDisplay();
    }
})

subtract2Btn.addEventListener("click", () => {
    if(!gameOver && score1 > 0) {
        score2--;
        updateDisplay();
    }
})

reset2Btn.addEventListener("click", () => {
    if(!gameOver) {
        score2 = 0;
        updateDisplay();
    }
})

resetGameBtn.addEventListener("click", () => {
    score1 = 0;
    score2 = 0;
    gameOver = false;
    updateDisplay()
})

updateDisplay();
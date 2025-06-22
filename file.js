let container = document.querySelector("#container");
let dino = document.querySelector("#dino");
let block = document.querySelector("#block");
let road = document.querySelector("#road");
let cloud = document.querySelector("#cloud");
let score = document.querySelector("#score");
let gameOver = document.querySelector("#gameOver");

let interval = null;
let playerScore = 0;
let highScore = localStorage.getItem("highScore") || 0;

const updateScore = () => {
    playerScore++;
    score.innerHTML = `Score: <b>${playerScore}</b> | High Score: <b>${highScore}</b>`;
};

// Start game on spacebar press
window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        gameOver.style.display = "none";
        block.classList.add("blockActive");
        road.firstElementChild.style.animation = "roadAnimate 1.5s linear infinite";
        cloud.firstElementChild.style.animation = "cloudAnimate 50s linear infinite";

        playerScore = 0;
        clearInterval(interval);
        interval = setInterval(updateScore, 200);
    }
});

// Make Dino jump
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && !dino.classList.contains("dinoActive")) {
        dino.classList.add("dinoActive");
        setTimeout(() => {
            dino.classList.remove("dinoActive");
        }, 500); // Match the jump animation duration
    }
});

// Collision detection
setInterval(() => {
    let dinoBottom = parseInt(getComputedStyle(dino).getPropertyValue("bottom"));
    let blockLeft = parseInt(getComputedStyle(block).getPropertyValue("left"));

    if (dinoBottom <= 90 && blockLeft >= 40 && blockLeft <= 120) {
        gameOver.style.display = "block";
        block.classList.remove("blockActive");
        road.firstElementChild.style.animation = "none";
        cloud.firstElementChild.style.animation = "none";

        clearInterval(interval);

        if (playerScore > highScore) {
            highScore = playerScore;
            localStorage.setItem("highScore", highScore);
        }

        playerScore = 0;
    }
}, 10);

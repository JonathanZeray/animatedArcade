"use strict";

const dino = document.getElementById("dino");
const rock = document.getElementById("rock");
const score = document.getElementById("score");
const button = document.getElementById("button");
const scoreList = document.querySelector('.scoretable');
const playAgainButton = document.getElementById("playAgainButton");


const hiscores = JSON.parse(localStorage.getItem('hiscores')) || [];


let counter = 0;
let timeout;
let timer_on = 0;



function timedCount() {
    document.getElementById("score").innerHTML = counter;
    counter++;
    timeout = setTimeout(timedCount, 1000);
  }

function startCount () {
    if (!timer_on) {
        timer_on = 1;
        timedCount();
    }
}

function jump() {
    dino.classList.add("jump-animation");
    setTimeout(() => {
        dino.classList.remove("jump-animation");
    }, 500);
}


document.addEventListener("keypress", () => {
    if (!dino.classList.contains("jump-animation")) {
        jump();
    }
    jump();
})

function rockSlide() {
    rock.classList.add("rock-animation");
}

button.addEventListener("click", () => {
    rockSlide();
});

function nameStorage() {
    let newName = prompt("You got a score of: " + score.innerHTML + " \nWhats your name?");
        let newScore = Number(score.innerHTML);

        const scoreObj = {
            names: newName,
            scores: newScore
        }; 

        populateTable();

        hiscores.push(scoreObj);
        hiscores.sort( (a,b) =>  b.scores - a.scores);
        hiscores.splice(5);
        populateTable();
        localStorage.setItem("hiscores", JSON.stringify(hiscores));     
}

function populateTable() {
    scoreList.innerHTML = hiscores.map((row) => {
      return `<tr><td>${row.names}</td><td>${row.scores}</tr>`;
    }).join('');
  }

function collision() {
    const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    const rockLeft = parseInt(window.getComputedStyle(rock).getPropertyValue("left"));
    if (rockLeft < 50 && rockLeft > 0 && dinoTop > 150 ) {
        nameStorage();
        endGame();
    }

}

setInterval(() => {
    collision();
}, 50); 

function clearScores() {
    hiscores.splice(0, hiscores.length);
    localStorage.setItem('hiscores', JSON.stringify(hiscores));
    populateTable(hiscores, scoreList);
  }

  function endGame() {
        rock.classList.remove("rock-animation");
        score.style.display = "none";
        button.style.display = "none";
        playAgainButton.style.display = "block";

    }

    function playAgain() {
        location.reload();
    }

    populateTable();



    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            console.log(entry)
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    });
    
    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));
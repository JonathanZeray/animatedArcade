"use strict";


const changeImg = document.getElementById("myImg");
const gameScreen = document.getElementById("game");

function moveLeft() {
    let left = 
    parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    left -= 100;
    if(left>=0){
        character.style.left = left + "px";
    }
}

function moveRight() {
    let left = 
    parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    left += 100;
    if(left<=200) {
    character.style.left = left + "px";
    }
}

document.addEventListener("keydown", event => {
    if(event.key==="ArrowLeft"){moveLeft();}
    if(event.key==="ArrowRight"){moveRight();}
});


let block = document.getElementById("block");
let counter = 0;
let scoreCounter = document.getElementById("counter");
block.addEventListener('animationiteration', () => {
    let random = Math.floor(Math.random() * 3);
    let left = random * 100;
    block.style.left = left + "px";
    scoreCounter.innerHTML = "Score: " + (counter++ + 1);


//     let playerName
//     let namn = document.getElementById("pNamn");
//     button.onclick = function () {
//     playerName = prompt( counter + " <- Your score! Enter your name");
//     namn.append(playerName,": ", counter);
// }

});


setInterval(function(){
    let characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    let blockTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));
    if(characterLeft == blockLeft && blockTop<500 && blockTop > 300) {
        // alert("Game Over! Scroll down to enter name and score");
        block.style.animation = "none";
        changeImg.src = "https://i.giphy.com/media/oe33xf3B50fsc/giphy.webp";
        changeImg.style.borderRadius = "50%";
    }
},1)

// document.getElementById("left").addEventListener("touchstart", moveLeft);
// document.getElementById("right").addEventListener("touchstart", moveRight);



/* SLIDING ANIMATION JS */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));
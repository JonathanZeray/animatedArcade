gsap.registerPlugin(Flip);

const links = document.querySelectorAll(".nav-item a");
const activeNav = document.querySelector(".active-nav");

links.forEach(link => {
    link.addEventListener("mouseover", () =>{
        // Code to change color of nav.
        // gsap.to(links, {color: "black"});

        // if(document.activeElement === link){
        //     gsap.to(link, {color: "red"})
        // }

        //Code to move the underline.
        const state = Flip.getState(activeNav);
        link.appendChild(activeNav);
        Flip.from(state, {
            duration: 1.5,
            absolute: true,
            ease: "elastic.out(1,0.8)",
        });
    });
})


// Code for the cards

const cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {
    card.addEventListener("click", () => {

        // Get the state of the cards
        const state = Flip.getState(cards);

        // add the active class to clicked card, and inactive to the others
        const isCardActive = card.classList.contains("active");
        cards.forEach((otherCard, otherIdx) => {
            otherCard.classList.remove("active");
            otherCard.classList.remove("is-inactive");
            // code below, check if the clicked card has the class of active and compare indexes from 
            // first loop to second loop. If they dont match, add the is-inactive class to the non clicked cards. 
            if(!isCardActive && index!== otherIdx){
                otherCard.classList.add("is-inactive");
            }

        });
        if(!isCardActive) card.classList.add("active");

        Flip.from(state, {
            duration: 1,
            ease: "expo.out",
            absolute: true,
            onComplete: () => {
                gsap.to(".card p", {y: 450});
            }
        })
    });
});
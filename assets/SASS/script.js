const buttons = document.querySelector("[data-carousel-button")

/* event lisenter used for swapping to the next imate*/
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carousel1button === "next ? 1 : -1"
        const slides = button
        .closest("[data-carousel]")
        .querySelector("[data-slides]")

    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1 ;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true 
    delete activeSlide.dataset.active
    })
})
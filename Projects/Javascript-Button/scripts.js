const redSlider = document.querySelector("#rangeRed");
const greenSlider = document.querySelector("#rangeGreen");
const blueSlider = document.querySelector("#rangeBlue");
const button = document.querySelector(".button");
let red = redSlider.value;
let green = greenSlider.value;
let blue = blueSlider.value;
const backg = document.querySelector(".background");

function btnPressed(){
    let numb = document.querySelector('#clicks').textContent;
    numb++;
    document.querySelector('#clicks').textContent = numb;
    console.log(red);
}

redSlider.addEventListener("input", (e) => {
    red = document.querySelector("#rangeRed").value;
    backg.style.background = "rgb("+red+", "+blue+", "+green+")";
    document.querySelector("#colorOutput").textContent = backg.style.background;
});
blueSlider.addEventListener("input", (e) => {
    blue = document.querySelector("#rangeBlue").value;
    backg.style.background = "rgb("+red+", "+blue+", "+green+")";
    document.querySelector("#colorOutput").textContent = backg.style.background;
});
greenSlider.addEventListener("input", (e) => {
    green = document.querySelector("#rangeGreen").value;
    backg.style.background = "rgb("+red+", "+blue+", "+green+")";
    document.querySelector("#colorOutput").textContent = backg.style.background;
});

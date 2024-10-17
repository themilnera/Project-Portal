let currentDate = new Date().toLocaleDateString();
let date = document.querySelector("#date");
let year = currentDate.match(/\d\d\d\d/);
date.textContent = currentDate;

let yearSelector = document.querySelector("#year");
yearSelector.textContent = year;
//./Javascript-Button/index.html

fetch('projects.txt')
    .then(response => response.text())
    .then(data => {
        let names = data.split("\r\n");
        console.log(names);
        makeCards(names);
      })
      .catch(error => {
        console.log("Failed to get projects file");
      });

function makeCards(names){
    for(let i = 0; i < names.length; i++){
        console.log(i);
        document.querySelector(".cards").innerHTML += 
        `<div class="card">
            <div class="card-inner">
                <div class="card-front">
                    <h2>${names[i]}</h2>
                </div>
                <div class="card-back">
                    <a href="./Projects/${names[i]}/index.html">Link to project</a>
                </div>
            </div>
        </div>`
    }
}
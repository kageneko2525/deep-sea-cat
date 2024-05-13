
fetch("/parts/header.html")
.then((response) => response.text())
.then((data) => document.querySelector("#header_box").innerHTML = data);

fetch("/parts/indexMenu.html")
.then((response) => response.text())
.then((data) => {
    document.querySelector("#sideMenu_box").innerHTML = data;
    loadSidemenuScript(); 
});    

function loadSidemenuScript() {
    const script = document.createElement('script');
    script.src = '/js/sideMenu.js';
    document.body.appendChild(script); 
}    




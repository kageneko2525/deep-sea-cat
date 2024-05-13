fetch("/parts/header.html")
.then((response) => response.text())
.then((data) => document.querySelector("#header_box").innerHTML = data);

fetch("/parts/sideMenu.html")
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



fetch("/images/favicon.jpg")
.then((response) => {
    if(response.ok) {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = '/images/favicon.jpg';
        document.head.appendChild(link);
    }
})
.catch((error) => {
    console.error('Failed to set favicon:', error);
});



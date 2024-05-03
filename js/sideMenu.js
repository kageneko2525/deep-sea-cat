

var menuBtn = document.getElementById('menu_btn');
var sideMenu = document.getElementById('side_menu');

menuBtn.onclick = function () {
    if (sideMenu.style.width === '250px') {
        sideMenu.style.width = '0';
    } else {
        sideMenu.style.width = '250px';
    }
}

window.onclick = function (event) {
    if (!sideMenu.contains(event.target) && event.target !== menuBtn) {
        sideMenu.style.width = '0'; 
    }
}

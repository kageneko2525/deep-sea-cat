// ヘッダーのHTMLをフェッチして、header_boxに挿入
fetch("/parts/header.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector("#header_box").innerHTML = data;
    })
    .catch(error => console.error('Error loading header:', error));

// サイドメニューのHTMLをフェッチして、sideMenu_boxに挿入
fetch("/parts/indexMenu.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector("#sideMenu_box").innerHTML = data;
        loadSidemenuScript(); // スクリプトをロード
    })
    .catch(error => console.error('Error loading side menu:', error));

function loadSidemenuScript() {
    const scripts = [ '/js/sideMenu.js', '/js/index.js'];
    
    scripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        document.body.appendChild(script);
    });
}

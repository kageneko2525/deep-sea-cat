

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


fetch('/contents.json')
.then(response => response.json())
.then(data => {
  let tagCounts = {}; // タグとその出現回数を格納するオブジェクト

  // 全ての投稿をループ
  data.forEach(post => {
    // 各投稿のタグを取得し、タグごとにカウントを行う
    post.tags.forEach(tag => {
      if (tagCounts[tag]) {
        tagCounts[tag]++;
      } else {
        tagCounts[tag] = 1;
      }
    });
  });

  // タグを出現回数でソート
  let sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  // ソートされたタグをHTMLに追加
  let sideMenu = document.querySelector('.side_menu');
  sortedTags.forEach(([tag, count]) => {
    let tagElement = document.createElement('div');
    let paragraph = document.createElement('p'); // pタグを作成
    paragraph.textContent = `${tag} (${count})`;
    paragraph.classList.add('tag'); // 'tag' クラスをpタグに追加
    paragraph.dataset.tag = tag; // データ属性にタグ名を追加
    paragraph.onclick = function () { tagClick(this); }; // onclickイベントを追加
    tagElement.appendChild(paragraph); // pタグをdivタグに追加
    sideMenu.appendChild(tagElement);
  });
})
.catch(error => console.error('Error:', error));
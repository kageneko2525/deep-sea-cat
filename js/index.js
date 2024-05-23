console.log("見てくれてありがとう！")
console.log("ソースコードはgithubで公開してるよ！")
console.log("よかったら改善点教えてね！")

//記事の格納
let articles = [];

//何番目の記事か
let currentIndex = 0;

//記事の表示件数
const articlesPerPage = 10;

// JSONファイルからデータを読み込む関数
function loadArticles() {

  //tagクラスにクリック時関数を実行するようにする
  document.querySelectorAll('.tag').forEach(tagElement => {
    tagElement.setAttribute('onclick', 'tagClick(this)');
  });

  //jsonから記事を取得し格納
  fetch('/articles.json')
    .then(response => response.json())
    .then(data => {
      articles = data.sort((a, b) => b.post_date.localeCompare(a.post_date));
      showArticles();
      // 記事の総数を表示
      document.querySelector('.allTagCount').textContent = articles.length;
    })
    
}

// 記事を表示する関数
function showArticles() {

  //記事格納変数
  const articlesContainer = document.getElementById('articles');

  //記事をリセット
  articlesContainer.innerHTML = '';
  const endIndex = Math.min(currentIndex + articlesPerPage, articles.length);
  updateIndexArticles(currentIndex, endIndex);
  for (let i = currentIndex; i < endIndex; i++) {
    const article = articles[i];
    const link = document.createElement('a');
    link.href = article.path;
    const articleDiv = document.createElement('div');
    articleDiv.className = "articles";
    const heading = document.createElement('h2');
    heading.textContent = article.title;
    const dateParagraph = document.createElement('p');
    // 日付を20yy年mm月dd日の形式に変換して表示
    const formattedDate = formatDate(article.post_date);
    const formattedUpDate = formatDate(article.last_updated);
    dateParagraph.textContent = `投稿日時: ${formattedDate} / 最終更新: ${formattedUpDate}`;
    articleDiv.appendChild(heading);
    articleDiv.appendChild(dateParagraph);
    link.appendChild(articleDiv);
    articlesContainer.appendChild(link);
    articlesContainer.appendChild(document.createElement('br'));
  }
}

// 前の10件を表示する関数
function showPrevious() {
  if (currentIndex >= articlesPerPage) {
    currentIndex -= articlesPerPage;
    showArticles();
  }
  window.scrollTo(0, 0);
}

// 次の10件を表示する関数
function showNext() {
  if (currentIndex + articlesPerPage < articles.length) {
    currentIndex += articlesPerPage;
    showArticles();
  }
  window.scrollTo(0, 0);
}

window.onload = function () {


  fetch('/articles.json')
    .then(response => response.json())
    .then(data => {
      articles = data.sort((a, b) => b.post_date.localeCompare(a.post_date));
      currentIndex = 0;
      showArticles();
    })

  fetch('/articles.json')
    .then(response => response.json())
    .then(data => {
      articles = data.sort((a, b) => b.post_date.localeCompare(a.post_date));
      currentIndex = 0;
      loadArticles();
      showArticles();
    })





};
// 日付を20yy年mm月dd日の形式に変換する関数
function formatDate(dateString) {
  const year = dateString.slice(0, 2);
  const month = dateString.slice(2, 4);
  const day = dateString.slice(4, 6);
  return `20${year}年${month}月${day}日`;
}
// 「すべて」のタグをクリックしたときにすべての記事を表示する関数
document.querySelectorAll('.allTag').forEach(item => {
  item.addEventListener('click', event => {
    fetch('/articles.json')
      .then(response => response.json())
      .then(data => {
        articles = data.sort((a, b) => b.post_date.localeCompare(a.post_date));
        currentIndex = 0;
        showArticles();
      })
  });
});




//allタグクリック時すべての記事を表示する関数
function allTagClick() {
  {
    fetch('/articles.json')
      .then(response => response.json())
      .then(data => {
        articles = data.sort((a, b) => b.post_date.localeCompare(a.post_date));
        currentIndex = 0;
        showArticles();
      })
  }
}



//タグをクリックしたときそのタグの記事を表示する関数
function tagClick(p) {
  {
   
    const tag = p.dataset.tag;
    fetch('/articles.json')
      .then(response => response.json())
      .then(data => {
        const taggedArticles = data.filter(article => article.tags.includes(tag));
        articles = taggedArticles.sort((a, b) => b.post_date.localeCompare(a.post_date));
        currentIndex = 0;

        showArticles();
      })

  }
}




// タグをクリックしたときに記事を表示する関数
document.querySelectorAll('.tag').forEach(item => {
  item.addEventListener('click', event => {
    // クリックされた要素がタグの場合のみ処理を実行
    if (event.target.classList.contains('tag')) {
      const tag = event.target.dataset.tag;
      fetch('/articles.json')
        .then(response => response.json())
        .then(data => {
          const taggedArticles = data.filter(article => article.tags.includes(tag));
          articles = taggedArticles.sort((a, b) => b.post_date.localeCompare(a.post_date));
          currentIndex = 0;
          showArticles();
        })
    } else if (event.target.classList.contains('tagCount')) {
      const tag = event.target.parentNode.dataset.tag;
      fetch('/articles.json')
        .then(response => response.json())
        .then(data => {
          const taggedArticles = data.filter(article => article.tags.includes(tag));
          articles = taggedArticles.sort((a, b) => b.post_date.localeCompare(a.post_date));
          currentIndex = 0;

          showArticles();
        })
    }
  });
});



function updateIndexArticles(startIndex, plusIndex) {
  // indexというIDを持つdiv要素を取得

  const indexDiv = document.getElementById('index');
  const endIndex = plusIndex;
  // startIndexからendIndexまでの範囲を表示するテキストを作成
  const newText = `${startIndex + 1}件目から${endIndex}件目までの内容を表示中`;
  // div要素の内容を新しいテキストに変更
  indexDiv.textContent = newText;
}



fetch('/articles.json')
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
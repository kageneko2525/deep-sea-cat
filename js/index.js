let articles = [];
let currentIndex = 0;
const articlesPerPage = 10;
console.log("見てくれてありがとう！")
console.log("ソースコードはgithubで公開予定だよ！")
console.log("よかったら改善点教えてね！")

// JSONファイルからデータを読み込む関数
function loadArticles() {
  document.querySelectorAll('.tag').forEach(tagElement => {
    tagElement.setAttribute('onclick', 'tagClick(this)');
  });
  fetch('/content.json')
    .then(response => response.json())
    .then(data => {
      articles = data.sort((a, b) => b.post_date.localeCompare(a.post_date));
      showArticles();
      // 記事の総数を表示
      document.querySelector('.allTagCount').textContent = articles.length;
    })
    .catch(error => console.error('データを読み込めませんでした:', error));
}

// 記事を表示する関数
function showArticles() {
  const articlesContainer = document.getElementById('articles');
  articlesContainer.innerHTML = '';
  const endIndex = Math.min(currentIndex + articlesPerPage, articles.length);
  updateIndexContent(currentIndex, endIndex);
  for (let i = currentIndex; i < endIndex; i++) {
    const article = articles[i];
    const link = document.createElement('a');
    link.href = article.path;
    const articleDiv = document.createElement('div');
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

// ページ読み込み時に記事を読み込む
window.onload = function () {

  fetch('/content.json')
  .then(response => response.json())
  .then(data => {
    articles = data.sort((a, b) => b.post_date.localeCompare(a.post_date));
    currentIndex = 0;
    showArticles();
    updateTagCounts(); // タグに一致する記事の数を更新
  })
  .catch(error => console.error('データを読み込めませんでした:', error));
  loadArticles();
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
    fetch('/content.json')
      .then(response => response.json())
      .then(data => {
        articles = data.sort((a, b) => b.post_date.localeCompare(a.post_date));
        currentIndex = 0;
        showArticles();
        updateTagCounts(); // タグに一致する記事の数を更新
      })
      .catch(error => console.error('データを読み込めませんでした:', error));
  });
});





function allTagClick() {
  {
    fetch('/content.json')
      .then(response => response.json())
      .then(data => {
        articles = data.sort((a, b) => b.post_date.localeCompare(a.post_date));
        currentIndex = 0;
        showArticles();
        updateTagCounts(); // タグに一致する記事の数を更新
      })
      .catch(error => console.error('データを読み込めませんでした:', error));
  }
}




function tagClick(p) {
  {
    // クリックされた要素がタグの場合のみ処理を実行

    const tag = p.dataset.tag;
    fetch('/content.json')
      .then(response => response.json())
      .then(data => {
        const taggedArticles = data.filter(article => article.tags.includes(tag));
        articles = taggedArticles.sort((a, b) => b.post_date.localeCompare(a.post_date));
        currentIndex = 0;
      
        showArticles();
        updateTagCounts(); // タグに一致する記事の数を更新
      })
      .catch(error => console.error('データを読み込めませんでした:', error));

  }
}




// タグをクリックしたときに記事を表示する関数
document.querySelectorAll('.tag').forEach(item => {
  item.addEventListener('click', event => {
    // クリックされた要素がタグの場合のみ処理を実行
    if (event.target.classList.contains('tag')) {
      const tag = event.target.dataset.tag;
      fetch('/content.json')
        .then(response => response.json())
        .then(data => {
          const taggedArticles = data.filter(article => article.tags.includes(tag));
          articles = taggedArticles.sort((a, b) => b.post_date.localeCompare(a.post_date));
          currentIndex = 0;
          showArticles();
          updateTagCounts(); // タグに一致する記事の数を更新
        })
        .catch(error => console.error('データを読み込めませんでした:', error));
    } else if (event.target.classList.contains('tagCount')) {
      const tag = event.target.parentNode.dataset.tag;
      fetch('/content.json')
        .then(response => response.json())
        .then(data => {
          const taggedArticles = data.filter(article => article.tags.includes(tag));
          articles = taggedArticles.sort((a, b) => b.post_date.localeCompare(a.post_date));
          currentIndex = 0;

          showArticles();
          updateTagCounts(); // タグに一致する記事の数を更新
        })
        .catch(error => console.error('データを読み込めませんでした:', error));
    }
  });
});

// すべてのタグの記事数を更新する関数
function updateTagCounts() {
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    const tagName = tag.dataset.tag;
    fetch('/content.json')
      .then(response => response.json())
      .then(data => {
        const taggedArticles = data.filter(article => article.tags.includes(tagName));
        tag.querySelector('.tagCount').textContent = taggedArticles.length;
      })
      .catch(error => console.error('データを読み込めませんでした:', error));
  });
}


function updateIndexContent(startIndex, plusIndex) {
  // indexというIDを持つdiv要素を取得

  const indexDiv = document.getElementById('index');
  const endIndex =  plusIndex;
  // startIndexからendIndexまでの範囲を表示するテキストを作成
  const newText = `${startIndex + 1}件目から${endIndex }件目までの内容を表示中`;
  // div要素の内容を新しいテキストに変更
  indexDiv.textContent = newText;
}

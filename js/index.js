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
  fetch('/contents.json')
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
    articleDiv.className = "contents";
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


    fetch('/contents.json')
      .then(response => response.json())
      .then(data => {
        articles = data.sort((a, b) => b.post_date.localeCompare(a.post_date));
        currentIndex = 0;
        showArticles();
      })
      .catch(error => console.error('データを読み込めませんでした:', error));

  fetch('/contents.json')
    .then(response => response.json())
    .then(data => {
      articles = data.sort((a, b) => b.post_date.localeCompare(a.post_date));
      currentIndex = 0;
      loadArticles();
      showArticles();
    })
    .catch(error => console.error('データを読み込めませんでした:', error));

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
        paragraph.onclick = function() { tagClick(this); }; // onclickイベントを追加
        tagElement.appendChild(paragraph); // pタグをdivタグに追加
        sideMenu.appendChild(tagElement);
      });
    })
    .catch(error => console.error('Error:', error));
  
  // タグがクリックされたときの処理
 

  
  
  
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
    fetch('/contents.json')
      .then(response => response.json())
      .then(data => {
        articles = data.sort((a, b) => b.post_date.localeCompare(a.post_date));
        currentIndex = 0;
        showArticles();
      })
      .catch(error => console.error('データを読み込めませんでした:', error));
  });
});





function allTagClick() {
  {
    fetch('/contents.json')
      .then(response => response.json())
      .then(data => {
        articles = data.sort((a, b) => b.post_date.localeCompare(a.post_date));
        currentIndex = 0;
        showArticles();
      })
      .catch(error => console.error('データを読み込めませんでした:', error));
  }
}




function tagClick(p) {
  {
    // クリックされた要素がタグの場合のみ処理を実行

    const tag = p.dataset.tag;
    fetch('/contents.json')
      .then(response => response.json())
      .then(data => {
        const taggedArticles = data.filter(article => article.tags.includes(tag));
        articles = taggedArticles.sort((a, b) => b.post_date.localeCompare(a.post_date));
        currentIndex = 0;

        showArticles();
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
      fetch('/contents.json')
        .then(response => response.json())
        .then(data => {
          const taggedArticles = data.filter(article => article.tags.includes(tag));
          articles = taggedArticles.sort((a, b) => b.post_date.localeCompare(a.post_date));
          currentIndex = 0;
          showArticles();
        })
        .catch(error => console.error('データを読み込めませんでした:', error));
    } else if (event.target.classList.contains('tagCount')) {
      const tag = event.target.parentNode.dataset.tag;
      fetch('/contents.json')
        .then(response => response.json())
        .then(data => {
          const taggedArticles = data.filter(article => article.tags.includes(tag));
          articles = taggedArticles.sort((a, b) => b.post_date.localeCompare(a.post_date));
          currentIndex = 0;

          showArticles();
        })
        .catch(error => console.error('データを読み込めませんでした:', error));
    }
  });
});



function updateIndexContent(startIndex, plusIndex) {
  // indexというIDを持つdiv要素を取得

  const indexDiv = document.getElementById('index');
  const endIndex = plusIndex;
  // startIndexからendIndexまでの範囲を表示するテキストを作成
  const newText = `${startIndex + 1}件目から${endIndex}件目までの内容を表示中`;
  // div要素の内容を新しいテキストに変更
  indexDiv.textContent = newText;
}



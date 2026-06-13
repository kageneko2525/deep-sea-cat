module.exports = {
  // 各ページの出力パスを「元のファイルパス + .html」に固定する。
  // 例: src/content/diary/2024/0430.html -> /content/diary/2024/0430.html
  permalink: (data) => data.permalink || `${data.page.filePathStem}.html`,
};

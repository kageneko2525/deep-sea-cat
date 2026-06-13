URL : https://deepseacat.moe/

## 開発 / ビルド
```
npm install        # 初回のみ
npm run dev        # ローカルプレビュー (http://localhost:8080)
npm run build      # _site/ に静的サイトを生成
```

## Cloudflare Pages 設定
GitHub リポジトリを接続し、ビルド設定を以下にする（push のたびに自動ビルド＆デプロイ）:

- Framework preset : Eleventy
- Build command    : npx @11ty/eleventy
- Build output dir  : _site
- 環境変数 NODE_VERSION : 20  (Eleventy 3 は Node 18 以上が必要)

## 共通 <head> の編集
全ページの <head> は src/_includes/base.njk の1か所だけ。
各ページ側はフロントマターでフラグを立てるだけ:

- title         : <title> に入る記事名
- indexPage     : true でトップ用 (index.css + indexParts.js)
- codeHighlight : true でコード記事用 (highlight.js + copy.css/js)

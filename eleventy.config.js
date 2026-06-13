module.exports = function (eleventyConfig) {
  ["css", "js", "images", "files", "parts"].forEach((d) =>
    eleventyConfig.addPassthroughCopy(d)
  );
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("articles.json");

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    htmlTemplateEngine: false, // 本文HTMLはそのまま。レイアウトのnjkは別途処理される
  };
};

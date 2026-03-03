module.exports = function(eleventyConfig) {
  // Filtro padStart
  eleventyConfig.addFilter("padStart", function(value, targetLength, padString) {
    return String(value).padStart(Number(targetLength), padString || " ");
  });
  // Copia file statici

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("admin");

  // Collezioni
  eleventyConfig.addCollection("articoli", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_articoli/*.md")
      .sort((a, b) => b.data.numero - a.data.numero);
  });

  eleventyConfig.addCollection("galleria", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_galleria/*.md");
  });

  eleventyConfig.addCollection("numeri", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_numeri/*.md")
      .sort((a, b) => b.data.numero - a.data.numero);
  });

  eleventyConfig.addCollection("rubriche", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_rubriche/*.md");
  });

  eleventyConfig.addCollection("autori", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_autori/*.md");
  });

  // Filtro per filtrare articoli per numero
  eleventyConfig.addFilter("byNumero", function(articoli, numero) {
    return articoli.filter(a => a.data.numero == numero);
  });

  // Filtro per filtrare articoli per rubrica
  eleventyConfig.addFilter("byRubrica", function(articoli, rubrica) {
    return articoli.filter(a => a.data.rubrica === rubrica);
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "src/_includes",
      layouts: "src/_layouts"
    },
    templateFormats: ["html", "njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};

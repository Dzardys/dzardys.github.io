async function loadArticles() {
  const res = await fetch('articles.json');
  if (!res.ok) throw new Error("Nepodařilo se načíst articles.json");
  return res.json();
}

async function loadMarkdown(file) {
  const res = await fetch(`articles/${file}`);
  if (!res.ok) throw new Error(`Nepodařilo se načíst soubor ${file}`);
  return res.text();
}

async function renderArticleList(filter = "") {
  const list = document.getElementById("article-list");
  list.innerHTML = "";
  const articles = await loadArticles();
  
  articles
    .filter(a => a.title.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => a.title.localeCompare(b.title, 'cs'))
    .forEach(article => {
      const li = document.createElement("li");
      li.textContent = article.title;
      li.classList.remove("active");
      li.addEventListener("click", () => openArticle(article.file, li));
      list.appendChild(li);
    });
}

async function openArticle(file, listItem) {
  try {
    const md = await loadMarkdown(file);
    const html = marked.parse(md, {
      gfm: true,
      breaks: true,
      smartLists: true,
      smartypants: true
    });
    const content = document.getElementById("content");
    content.innerHTML = html;
    
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
    
    document.querySelectorAll('#article-list li').forEach(li => li.classList.remove('active'));
    if (listItem) listItem.classList.add('active');
  } catch (err) {
    document.getElementById("content").innerHTML = `<p class="error">${err.message}</p>`;
  }
}

const search = document.getElementById("search");
search.addEventListener("input", () => {
  renderArticleList(search.value);
});

renderArticleList();
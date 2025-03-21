document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("fetchNewsBtn").addEventListener("click", fetchNews);
});

function fetchNews() {
  const apiKey = "c355efb1d3f4460499fcec2bda73b016";
  const category = "sports";
  const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        if (response.status === 426) {
          throw new Error("NewsAPI requires a paid plan for this request (Error 426).");
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!data || !data.articles || data.articles.length === 0) {
        throw new Error("No news articles found.");
      }
      displayNews(data.articles);
    })
    .catch(error => {
      console.error("Error fetching news:", error);
      document.getElementById("newsContainer").innerHTML = `<p class="text-danger">Failed to load news: ${error.message}</p>`;
    });
}

function displayNews(articles) {
  const newsContainer = document.getElementById("newsContainer");
  newsContainer.innerHTML = "";

  articles.slice(0, 10).forEach(article => {
    const newsCard = document.createElement("div");
    newsCard.className = "col-md-6 col-lg-4 mb-4";
    newsCard.innerHTML = `
      <div class="card h-100">
        <img src="${article.urlToImage || 'placeholder.jpg'}" class="card-img-top" alt="News Image">
        <div class="card-body">
          <h5 class="card-title">${article.title}</h5>
          <p class="card-text">${article.description || 'No description available'}</p>
          <p class="text-muted">Source: ${article.source?.name || 'Unknown'}</p>
          <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
        </div>
      </div>
    `;
    newsContainer.appendChild(newsCard);
  });
}

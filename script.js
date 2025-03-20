document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("fetchNewsBtn").addEventListener("click", fetchNews);
  });
  
  function fetchNews() {
    const apiKey = "c355efb1d3f4460499fcec2bda73b016";
    const category = "sports";
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayNews(data.articles);
      })
      .catch(error => console.error("Error fetching news:", error));
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
            <p class="text-muted">Source: ${article.source.name}</p>
            <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
          </div>
        </div>
      `;
      newsContainer.appendChild(newsCard);
    });
  }
  
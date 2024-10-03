let newsData = JSON.parse(localStorage.getItem('newsData')) || [];

function renderNewsList() {
    const newsList = document.getElementById('news-list');
    newsList.innerHTML = '';

    newsData.forEach((news, index) => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        newsItem.innerHTML = `
            <span>${news.title} (${news.type})</span>
            <button onclick="deleteNews(${index})">Delete</button>
        `;
        newsList.appendChild(newsItem);
    });

    localStorage.setItem('newsData', JSON.stringify(newsData)); // Save to localStorage
}

document.getElementById('news-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const type = document.getElementById('news-type').value;
    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;
    const imageInput = document.getElementById('news-image');

    const newNews = { type, title, content };

    if (type === 'image' || type === 'text-image') {
        const imageFile = imageInput.files[0];
        if (imageFile) {
            newNews.image = URL.createObjectURL(imageFile);
        }
    }

    newsData.push(newNews);
    renderNewsList();
    document.getElementById('news-form').reset();
});

function deleteNews(index) {
    newsData.splice(index, 1);
    renderNewsList();
}

// Initial render
document.addEventListener('DOMContentLoaded', renderNewsList);

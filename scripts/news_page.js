// Retrieve the news data from localStorage or use default
let newsData = JSON.parse(localStorage.getItem('newsData')) || [
    { type: 'text', title: 'Welcome to the Club!', content: 'We are excited to start a new journey with you all.' },
    { type: 'image', title: 'Club Event', content: 'images/event1.jpg' }, // Image only news
    { type: 'text-image', title: 'Upcoming Meeting', content: 'Don’t forget to join us for the meeting!', image: 'images/meeting.jpg' }
];

// Function to load news and display them as cards in a vertical list
function loadNews() {
    const container = document.getElementById('news-container');
    container.innerHTML = ''; // Clear existing content

    newsData.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');

        if (news.type === 'text') {
            newsCard.innerHTML = `
                <h2>${news.title}</h2>
                <p>${news.content}</p>
            `;
        } else if (news.type === 'image') {
            newsCard.innerHTML = `
                <h2>${news.title}</h2>
                <img src="${news.content}" alt="${news.title}">
            `;
        } else if (news.type === 'text-image') {
            newsCard.innerHTML = `
                <h2>${news.title}</h2>
                <p>${news.content}</p>
                <img src="${news.image}" alt="${news.title}">
            `;
        }

        container.appendChild(newsCard);
    });
}

// Load the news when the page loads
document.addEventListener('DOMContentLoaded', loadNews);

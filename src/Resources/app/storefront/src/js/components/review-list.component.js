import { createXhr } from '../services/http.service';

export default class ReviewListComponent {
    constructor(container) {
        this.container = container;
    }

    load(listUrl) {
        const xhttp = createXhr('GET', listUrl);

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                try {
                    const data = JSON.parse(xhttp.responseText);
                    if (!data?.success || !Array.isArray(data.reviews)) return;
                    this.render(data.reviews);
                } catch (err) {
                    console.error('Fehler beim Parsen der Reviews:', err, xhttp.responseText);
                }
            }
        };

        xhttp.send();
    }

    render(reviews) {
        this.container.innerHTML = '<ul class="reviews-list"></ul>';
        const reviewsList = this.container.querySelector('.reviews-list');

        if (!reviews || reviews.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'Noch keine Bewertungen.';
            reviewsList.appendChild(li);
            return;
        }

        reviews.forEach(review => {
            const li = document.createElement('li');
            li.className = 'review-item';

            const starsDiv = document.createElement('div');
            starsDiv.className = 'review-stars';
            for (let i = 1; i <= 5; i++) {
                starsDiv.appendChild(document.createTextNode(
                    i <= (review.stars || 0) ? '★' : '☆'
                ));
            }
            li.appendChild(starsDiv);

            const p = document.createElement('p');
            p.textContent = review.comment || '';
            li.appendChild(p);

            reviewsList.appendChild(li);
            reviewsList.appendChild(document.createElement('hr'));
        });
    }
}

import { config } from './config.js'

const dogs_list = document.getElementById('dogs_list');

window.addEventListener('load', () => {
  fetch(config.urls.dogs(), config.params)
    .then((resp) => resp.json())
    .then(({ dogs: { data: dogs } }) => {
      const cardMarkup = dogs.map(({ attributes: { name, description, life }, id }) => {
        const lifeMin = life?.min ?? 'N/A';
        const lifeMax = life?.max ?? 'N/A';
        const dogDescription = description ?? 'No description available.';

        return `
          <article class="card">
            <header class="card__header">
              <h2>${name}</h2>
            </header>
            <div class="card__body">
              <p class="card__meta">Life expectancy: ${lifeMin} - ${lifeMax} years</p>
            </div>
            <footer class="card__footer">
              <a href="/dogs/?id=${id}">Details</a>
            </footer>
          </article>
        `;
      }).join('');

      dogs_list.innerHTML = cardMarkup;
    })
    .catch((error) => {
      console.error('Error:', error);
      dogs_list.innerHTML = '<p class="card-message">Error loading Dogs list.</p>';
    });
});

import { config } from '../config.js'

const dog_detail = document.getElementById('dog_detail');

window.addEventListener('load', () => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');

  if (!id) {
    dog_detail.innerHTML = '<p class="card-message">ID not found.</p>';
    return;
  }

  fetch(config.urls.dog(id), config.params)
    .then((resp) => resp.json())
    .then((payload) => {
      const dog = payload?.dog?.data?.attributes;
      console.log('Dog details:', dog);
      if (dog) {
        const lifeMin = dog.life?.min ?? 'N/A';
        const lifeMax = dog.life?.max ?? 'N/A';
        const description = dog.description ?? 'No description available.';
        dog_detail.innerHTML = `
          <article class="card card--featured">
            <header class="card__header">
              <p class="card__eyebrow">Breed details</p>
              <h2>${dog.name}</h2>
            </header>
            <div class="card__body">
              <p>${description}</p>
              <p class="card__meta">Life expectancy: ${lifeMin} - ${lifeMax} years</p>
            </div>
            <footer class="card__footer">
              <a href="/">Back to list</a>
            </footer>
          </article>
        `;
      } else {
        dog_detail.innerHTML = '<p class="card-message">Dog not found.</p>';
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      dog_detail.innerHTML = '<p class="card-message">Error loading dog details.</p>';
    });
});

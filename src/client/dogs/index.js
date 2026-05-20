import { config } from '../config.js'

const dog_detail = document.getElementById('dog_detail');

window.addEventListener('load', () => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');

  if (!id) {
    dog_detail.innerHTML = '<p>ID not found.</p>';
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
      <h2>${dog.name}</h2>
      <p>Description: ${description}</p>
      <p>Life Expectancy: ${lifeMin} - ${lifeMax} years</p>
    `;
      } else {
        dog_detail.innerHTML = '<p>Dog not found.</p>';
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      dog_detail.innerHTML = '<p>Error loading dog details.</p>';
    });
});

import { config } from '../config.js'

const dog_detail = document.getElementById('dog_detail');

window.addEventListener('load', () => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');

  if (!id) {
    dog_detail.innerHTML = '<p>Id do cão não informado.</p>';
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
        const description = dog.description ?? 'Sem descricao.';
        dog_detail.innerHTML = `
      <h2>${dog.name}</h2>
      <p>Descricao: ${description}</p>
      <p>Expectativa de vida: ${lifeMin} - ${lifeMax} anos</p>
    `;
      } else {
        dog_detail.innerHTML = '<p>Cão não encontrado.</p>';
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      dog_detail.innerHTML = '<p>Erro ao carregar detalhes do cão.</p>';
    });
});

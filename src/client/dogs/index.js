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
    .then((dog) => {
      console.log('Dog details:', dog);
      if (dog) {
        dog_detail.innerHTML = `
      <h2>${dog.name}</h2>
      <p>Raça: ${dog.breed}</p>
      <p>Idade: ${dog.age} anos</p>
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

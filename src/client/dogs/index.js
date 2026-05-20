import { id, urls, params } from '../config.js'

const dog_detail = document.getElementById('dog_detail');

window.addEventListener('load', () => {
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

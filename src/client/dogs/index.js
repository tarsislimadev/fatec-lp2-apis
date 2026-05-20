const dog_detail = document.getElementById('dog_detail');

const id = new URLSearchParams(window.location.search).get('id');
const url = `http://localhost:5000/api/v1/dogs/${id}`;
const params = { method: 'POST', headers: { 'Content-Type': 'application/json' } };

window.addEventListener('load', () => {
  fetch(url, params)
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

const dogs_list = document.getElementById('dogs_list');

const url = 'http://localhost:5000/api/v1/dogs';
const headers = { 'Content-Type': 'application/json' };

window.addEventListener('load', () => {
  fetch(url, { method: 'POST', headers, })
    .then(resp => resp.json())
    .then(({ dogs: { data: dogs } }) => {
      const dogList = document.createElement('ul');
      dogs.map(({ attributes: { name, description, life }, id }) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `Name: ${name}, Description: ${description}, Life Min: ${life.min}, Life Max: ${life.max}. <a href="/dogs/?id=${id}">Detalhes</a>`;
        dogList.appendChild(listItem);
      });
      dogs_list.appendChild(dogList);
    })
    .catch((error) => {
      console.error('Error:', error);
      dogs_list.innerHTML = '<p>Erro ao carregar a lista de cães.</p>';
    });
});

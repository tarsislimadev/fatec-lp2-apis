const load_button = document.getElementById('load_button');

const dogs_list = document.getElementById('dogs_list');

const url = 'http://localhost:5000/api/v1/dogs';
const headers = { 'Content-Type': 'application/json' };

load_button.addEventListener('click', () => {
  fetch(url, { method: 'POST', headers, })
    .then(response => response.json())
    .then(data => {
      console.log('Response from server:', data);
      const dogs = data.dogs.data; // Acessa a lista de cães
      const dogList = document.createElement('ul');
      dogs.forEach(dog => {
        const listItem = document.createElement('li');
        listItem.textContent = dog.name; // Exibe o nome do cão
        dogList.appendChild(listItem);
      });
      dogs_list.appendChild(dogList);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

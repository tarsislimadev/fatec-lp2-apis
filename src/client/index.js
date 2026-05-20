import { config } from './config.js'

const dogs_list = document.getElementById('dogs_list');

window.addEventListener('load', () => {
  fetch(config.urls.dogs(), config.params)
    .then((resp) => resp.json())
    .then(({ dogs: { data: dogs } }) => {
      const dogList = document.createElement('ul');
      dogs.map(({ attributes: { name, description, life }, id }) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `Name: ${name}, Description: ${description}, Life Min: ${life.min}, Life Max: ${life.max}. <a href="/dogs/?id=${id}">Details</a>`;
        dogList.appendChild(listItem);
      });
      dogs_list.appendChild(dogList);
    })
    .catch((error) => {
      console.error('Error:', error);
      dogs_list.innerHTML = '<p>Error loading Dogs list.</p>';
    });
});

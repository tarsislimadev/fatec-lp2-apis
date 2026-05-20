const dog_detail = document.getElementById('dog_detail');

window.addEventListener('load', async () => {
  const response = await fetch('/api/dogs');
  const dogs = await response.json();

  const id = new URLSearchParams(window.location.search).get('id');
  const dog = dogs.find(d => d.id === id);

  if (dog) {
    dog_detail.innerHTML = `
      <h2>${dog.name}</h2>
      <p>Raça: ${dog.breed}</p>
      <p>Idade: ${dog.age} anos</p>
    `;
  } else {
    dog_detail.innerHTML = '<p>Cão não encontrado.</p>';
  }
});

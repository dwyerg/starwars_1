let nameH1;
let filmsDiv;
let planetDiv;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  charactersU1 = document.querySelector('#characters>ul');
  filmsUl = document.querySelector('#films>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getPlanet(id)
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id)
    planet.characters = await fetchCharacters(id)
    planet.films = await fetchFilms(id)
  }
  catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);

}
async function fetchPlanet(id) {
  let planetUrl = `${baseUrl}/planets/${id}`;
  return await fetch(planetUrl)
    .then(res => res.json())
}

async function fetchCharacters(id) {
  const url = `${baseUrl}/planets/${id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
}

async function fetchFilms(id) {
  const url = `${baseUrl}/planets/${id}/films`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}
const renderPlanet = planet => {
  document.title = `SWAPI - ${planet.name}`;  // Just to make the browser tab say their name
  nameH1.textContent = planet?.name;
  const charLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  console.log(charLis);
  var test=charLis.join("");
  console.log(test);
  charactersU1.innerHTML = test;
  const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)

  filmsUl.innerHTML = filmsLis.join("");
}
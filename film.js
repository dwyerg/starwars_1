const baseUrl = `https://swapi2.azurewebsites.net/api`;

addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  homeworldSpan = document.querySelector('span#homeworld');
  charactersUl = document.querySelector('#characters>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilms(id)
});

async function getFilms(id) {
    let film;
    try {
      film = await fetchFilm(id)
      film.homeworld = await fetchHomeworld(film)
      film.characters = await fetchCharacter(film)
    }
    catch (ex) {
      console.error(`Error reading film ${id} data.`, ex.message);
    }
    renderFilm(film);
  
  }
  async function fetchFilm(id) {
    let filmUrl = `${baseUrl}/films/${id}`;
    return await fetch(filmUrl)
      .then(res => res.json())
  }

  async function fetchHomeworld(film) {
    const url = `${baseUrl}/films/${film?.id}/planets`;
  
    try {
      let planets = await fetch(url)
        .then(res => res.json());
      return planets;
    } catch (error) {
      console.error('Error fetching homeworld.', error);
      planets = "No planets found."
      return planets;
    }
  }
  
  async function fetchCharacter(film) {
    const url = `${baseUrl}/films/${film?.id}/characters`;
    const characters = await fetch(url)
      .then(res => res.json())
    return characters;
  }

  const renderFilm = film => {
    // document.title = `SWAPI - ${character?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = film?.title;
    homeworldSpan.innerHTML = `<a href="/planet.html?id=${film?.homeworld.id}">${film?.homeworld.name}</a>`;
    const characterLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    charactersUl.innerHTML = characterLis.join("");
  }
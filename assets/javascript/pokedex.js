// pokedex api obj
const pokedex = {
    api: 'https://pokeapi.co/api/v2/pokemon/',
    offset: 0,
    limit: 10,
    // get list
    getPokemons: async function()
    {
        const response = await fetch(`${this.api}?offset=${this.offset}&limit=${this.limit}`);
        const data = await response.json();
        return data.results;
    },
    // get details data
    getPokemonDetails: async function(url)
    {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    },
    // get more list
    getMorePokemons: async function() {
        this.offset += this.limit;
        const response = await fetch(`${this.api}?offset=${this.offset}&limit=${this.limit}`);
        const data = await response.json();
        return data.results;
    },
    // put data into html structure
    renderPokemons: async function(pokemons)
    {
        pokemons.forEach(async (pokemon) =>
        {
            const details = await pokedex.getPokemonDetails(pokemon.url);
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `<div class="card-body d-flex flex-column justify-content-between"><h1 class="card-title fw-light fs-3">${details.name} <small class="fs-6 float-end">#${details.id}</small></h1><img src="${details.sprites.other.dream_world.front_default}" alt="${details.name}" class="card-img-top my-2" /><div class="p-1 d-flex justify-content-between align-items-center"><section id="badges">${details.abilities.map(ability => `<span class="badge bg-purple text-purple">${ability.ability.name}</span>`).join(' ')}</section><nav><a data-action="detail" data-url="${pokemon.url}" href="#detail" class="btn btn-sm btn-yellow">Detail</a></nav></div></div>`;
            document.querySelector('.grid').appendChild(card);
        });
    }
};
// call first load
pokedex.getPokemons()
.then(pokemons => {
    pokedex.renderPokemons(pokemons);
})
.then(() => {
    // button to load more from list
    const getMore = document.getElementById('getMore');
    getMore.onclick = e => {
        e.preventDefault();
        // execute load more on button click
        pokedex.getMorePokemons()
        .then(pokemons => {
            pokedex.renderPokemons(pokemons);
        });
    }
});

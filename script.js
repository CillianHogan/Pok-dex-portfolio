const pokemonList = document.querySelector("#pokemonList");

let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }


    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <p class="pokemon-id-back">#${pokeId}</p>
                    <div class="pokemon-image">
                        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
                    </div>
                    <div class="pokemon-info">
                        <div class="name-holder">
                            <p class="pokemon-id">#${pokeId}</p> 
                            <h2 class="pokemon-name">${poke.name}</h2>
                        </div>
                        <div class="pokemon-types">
                            ${tipos}
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">${poke.height}m</p>
                            <p class="stat">${poke.weight}kg</p>
                        </div>
                    </div>
                    `;
pokemonList.append(div);
}

/* 
<div class="pokemon">
                    <p class="pokemon-id-back">#025</p>
                    <div class="pokemon-image">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu">
                    </div>
                    <div class="pokemon-info">
                        <div class="name-holder">
                            <p class="pokemon-id">#025</p> 
                            <h2 class="pokemon-name">Pikachu</h2>
                        </div>
                        <div class="pokemon-types">
                            <p class="electric type">ELECTRIC</p>
                            <p class="steel type">STEEL</p>
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">4m</p>
                            <p class="stat">2.5kg</p>
                        </div>
                    </div>
                </div>
*/
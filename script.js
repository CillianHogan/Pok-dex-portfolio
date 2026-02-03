const pokemonList = document.querySelector("#pokemonList");
const botonesHeader = document.querySelectorAll(".type-filter");
const promesas = [];

let URL = "https://pokeapi.co/api/v2/pokemon/";
let allPokemon = [];

for (let i = 1; i <= 151; i++) {
    promesas.push(fetch(URL + i).then((response) => response.json()));
}

Promise.all(promesas).then(pokemon => {
    allPokemon = pokemon;
    pokemonList.innerHTML = "";
    allPokemon.forEach(p => mostrarPokemon(p));
})

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

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    pokemonList.innerHTML = "";

    allPokemon.forEach(data => {
        if(botonId === "seeAll") {
            mostrarPokemon(data);
        } else {
            const tipos = data.types.map(type => type.type.name);
            if(tipos.some(tipo => tipo.includes(botonId))) {
                mostrarPokemon(data);
            }
        }
            
});
}));
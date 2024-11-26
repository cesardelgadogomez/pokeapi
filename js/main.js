const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const URL = "https://pokeapi.co/api/v2/pokemon/";
let pokemonData = []; // Variable global para almacenar los Pokémon cargados

// Función para cargar todos los Pokémon y almacenarlos
async function cargarPokemon() {
  const solicitudes = [];
  for (let i = 1; i <= 386; i++) {
    solicitudes.push(fetch(URL + i).then(response => response.json()));
  }

  const resultados = await Promise.all(solicitudes);
  pokemonData = resultados.sort((a, b) => a.id - b.id); // Guardar y ordenar por ID
  mostrarTodosLosPokemon(); // Mostrar todos los Pokémon al inicio
}

// Función para mostrar todos los Pokémon
function mostrarTodosLosPokemon() {
  listaPokemon.innerHTML = ""; // Limpiar la lista
  pokemonData.forEach(mostrarPokemon); // Mostrar todos los Pokémon
}

// Función para mostrar un Pokémon
function mostrarPokemon(poke) {
  let tipos = poke.types.map(type => `<p class="${type.type.name} tipo">${type.type.name}</p>`).join('');
  let pokeId = poke.id.toString().padStart(3, '0'); // Formato del ID

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
    <p class="pokemon-id-back">#${pokeId}</p>
    <div class="pokemon-imagen">
      <img src="${poke.sprites.other["home"].front_default}" alt="${poke.name}">
    </div>
    <div class="pokemon-info">
      <div class="nombre-contenedor">
        <p class="pokemon-id">#${pokeId}</p>
        <h2 class="pokemon-nombre">${poke.name}</h2>
      </div>
      <div class="pokemon-tipos">
        ${tipos}
      </div>
      <div class="pokemon-stats">
        <p class="stat">${poke.height * 10} cms</p>
        <p class="stat">${poke.weight / 10} kgs</p>
      </div>
    </div>
  `;
  listaPokemon.appendChild(div);
}

// Función para filtrar los Pokémon por tipo
function filtrarPokemonPorTipo(tipo) {
  listaPokemon.innerHTML = ""; // Limpiar la lista
  const filtrados = pokemonData.filter(poke =>
    poke.types.some(type => type.type.name === tipo)
  );
  filtrados.forEach(mostrarPokemon); // Mostrar los Pokémon filtrados
}

// Configurar eventos de los botones
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
  const botonId = event.currentTarget.id;

  if (botonId === "ver-todos") {
    mostrarTodosLosPokemon(); // Mostrar todos los Pokémon si se selecciona "ver-todos"
  } else {
    filtrarPokemonPorTipo(botonId); // Filtrar Pokémon por tipo
  }
}));

// Iniciar la carga de Pokémon
cargarPokemon();


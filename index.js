//import fetch from "node-fetch";

let imgPokemon = document.getElementById("imgPokemon");
let txtNombre = document.getElementById("txtNombre");
let txtTipo = document.getElementById("txtTipo");
let txtPeso = document.getElementById("txtPeso");
let txtAltura = document.getElementById("txtAltura");
let buscar = document.getElementById("num");
buscar.value = 1;

function mostrarPokemon(imagen, nombre, tipos, peso, altura) {
  imgPokemon.setAttribute("src", imagen);
  txtNombre.innerHTML = nombre;
  txtTipo.innerHTML = tipos;
  txtPeso.innerHTML = peso + " kg.";
  txtAltura.innerHTML = altura + " m.";
}

async function verPokemon() {
  fetch(`https://pokeapi.co/api/v2/pokemon/${buscar.value.toLowerCase()}/`)
    .then((response) => response.json())
    .then((pokemon) => {
      const imagen = pokemon.sprites.front_default;
      const nombre = pokemon.name;
      const altura = pokemon.height / 10;
      const peso = pokemon.weight / 10;
      const listaTipos = pokemon.types;
      const tipos = [];

      listaTipos.forEach((tip) => {
        tipos.push(tip.type.name);
      });
      // console.log("Nombre del Pokemon: " + nombre);
      // console.log("Foto: " + imagen);
      // console.log("Tipo: " + tipos);
      // console.log("Altura: " + peso + " m.");
      // console.log("Peso: " + altura + " kg.");

      mostrarPokemon(imagen, nombre, tipos, peso, altura);
    })
    .catch((err) => renderNotFound());

  const renderNotFound = () => {
    if (buscar.value == 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Pokemon no ingresado",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Pokemon no encontrado",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
}

// verPokemon(1);

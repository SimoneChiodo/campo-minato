// Prendo gli elementi dalla pagina
const grid = document.getElementById("grid");
const counter = document.getElementById("counter");

// Creo le variabili necessarie
const array = [];
let num = 0;

// Genero i numero fino a 49
for(let i = 0; i < 49; i++)
  array.push(i+1);

// Inserisco le celle in HTML
array.map(col => { grid.innerHTML += `<div class="col"> 
    <button class="btn btn-success rounded-0" onclick="addClick()"> ${col} </button>
  </col>`; });

// Funzione che aumenta il contatore
function addClick() {
  counter.innerText = `Contatore: ${++num}`;
}
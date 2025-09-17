// Prendo gli elementi dalla pagina
const grid = document.getElementById("grid"); // Griglia del campo minato

// Creo le variabili necessarie
const array = []; // Array rappresentativo della griglia
let difficulty = 1; // 1: facile; 2: medio; 3: difficile
let cellsNumber; // Numero delle celle presenti nella griglia

// Inizializzo i dati
getCellsNumber();

// Genero le posizioni delle bombe
let bombs = new Set();
while(bombs.size < 16)
  bombs.add(randomNumber(0, cellsNumber));

console.table(bombs);


// Inserisco le celle in HTML
for(let i = 0; i < cellsNumber; i++) {
  grid.innerHTML += `<div class="col"> 
      <button id="cell-${i+1}" class="btn btn-success rounded-0" onclick="cellClick(${i+1})">  </button>
    </col>`;
}

function cellClick(index) {
  if(bombs.has(index))
    console.log("EXPLODED!");
}

// Funzione che inizializza il numero di celle e le mostra correttamente in pagina
function getCellsNumber() {
  switch(difficulty){
    case(1):
      cellsNumber = 100;
      grid.style.gridTemplateColumns = "repeat(10, 50px)";
      break;
    case(2):
      cellsNumber = 81;
      grid.style.gridTemplateColumns = "repeat(9, 50px)";
      break;
    case(3):
      cellsNumber = 49;
      grid.style.gridTemplateColumns = "repeat(7, 50px)";
      break;

    default:
      cellsNumber = 100;
      grid.style.gridTemplateColumns = "repeat(7, 50px)";
  }
}

/**
 * Function to generare a random number between a min and a max (included).
 * @param {number} min - Min number to generate
 * @param {number} max - Max number to generate
 * @returns {number} - Random number
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
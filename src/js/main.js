// Prendo gli elementi dalla pagina
const grid = document.getElementById("grid"); // Griglia del campo minato

// Creo le variabili necessarie
const array = []; // Array rappresentativo della griglia
let difficulty = 1; // 1: facile; 2: medio; 3: difficile

// Genero le posizioni delle bombe
let bombs = new Set();
while(bombs.size < 16)
  bombs.add(randomNumber(0, getCellsNumbers()));
// bombs.forEach(bomb => console.table(bomb))
console.table(bombs);

// Genero le celle della griglia
for(let i = 0; i < getCellsNumbers(); i++) {
  array.push(i+1);

}

// Inserisco le celle in HTML
for(let i = 0; i < getCellsNumbers(); i++) {
  grid.innerHTML += `<div class="col"> 
      <button id="cell-${i+1}" class="btn btn-success rounded-0" onclick="cellClick(${i+1})">  </button>
    </col>`;
}

function cellClick(index) {
  if(bombs.has(index))
    console.log("EXPLODED!");
}

// Funzione che prende la lunghezza della griglia
function getCellsNumbers() {
  switch(difficulty){
    case(1):
      return 100;
    case(2):
      return 81;
    case(3):
      return 49;

    default:
      return -1;
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
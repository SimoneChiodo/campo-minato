// Prendo gli elementi dalla pagina
const grid = document.getElementById("grid"); // Griglia del campo minato
const scoreText = document.getElementById("scoreText"); // Punteggio a schermo
const resultText = document.getElementById("resultText"); // Risultato della partita

// Creo le variabili necessarie
const array = []; // Array rappresentativo della griglia
let difficulty = 1; // 1: facile; 2: medio; 3: difficile
let cellsNumber; // Numero delle celle presenti nella griglia
let gameWin = null;
let clickedCells = new Set();

// Inizializzo i dati
getCellsNumber();

// Genero le posizioni delle bombe
let bombs = new Set();
while(bombs.size < 16)
  bombs.add(randomNumber(1, cellsNumber));

console.table(bombs);


// Inserisco le celle in HTML
for(let i = 0; i < cellsNumber; i++) {
  grid.innerHTML += `<div class="col"> 
      <button id="cell-${i+1}" class="btn btn-success rounded-0" onclick="cellClick(${i+1})">  </button>
    </col>`;
}

// Funzione chiamata a ogni clic di una cella
function cellClick(index) {
  // Se è stata cliccata una bomba
  if(bombs.has(index)) {
    // Rivelo le bombe
    bombs.forEach(bomb => {
      const cell = document.getElementById(`cell-${bomb}`);
      cell.innerText = "B";
    });
    // Informo che si ha perso
    gameWin = false;
    resultText.innerText = "Hai perso!";
  } else if(gameWin !== false) {
    // Se il giocatore ha vinto
    if(clickedCells.size === (cellsNumber - 16)){
      gameWin = true;
      resultText.innerText = "Hai vinto!";
    }

    // Aggiungi la cella alle caselle cliccate
    clickedCells.add(index);
    scoreText.innerText = `Punteggio: ${clickedCells.size}`;
  }
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
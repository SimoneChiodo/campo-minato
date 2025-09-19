/* TODO:
  - registrare il tempo impiegato
  - salvare il tempo
*/

// Prendo gli elementi dalla pagina
const form = document.getElementById("difficultyForm"); // Griglia del campo minato
const grid = document.getElementById("grid"); // Griglia del campo minato
const scoreText = document.getElementById("scoreText"); // Punteggio a schermo
const resultText = document.getElementById("resultText"); // Risultato della partita

// Creo le variabili necessarie
const array = []; // Array rappresentativo della griglia
let cellsNumber; // Numero delle celle presenti nella griglia
let gameWin = null;
let clickedCells = new Set();

// Quando finisce la partita il pulsante reset, ricarica la pagina, senza aprire la modal
document.getElementById("reload-button").addEventListener("click", () => {
  if(gameWin !== null) // Se la partità è finita
    location.reload(); // Ricarico la pagina
})

// Quando inizia la partita
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Prendo la difficoltà
  let difficulty = form.querySelector("input[name='difficultyRadio']:checked").id;  

  // Inizializzo i dati
  getCellsNumber(difficulty);

  // Genero le posizioni delle bombe
  let bombs = new Set();
  while(bombs.size < 16)
    bombs.add(randomNumber(1, cellsNumber));

  console.table(bombs);


  // Inserisco le celle in HTML
  for(let i = 0; i < cellsNumber; i++) {
    grid.innerHTML += `<div class="col"> 
        <button id="cell-${i+1}" class="btn btn-success rounded-0 fs-5 cell">  </button>
      </col>`;
  }

  const cells = document.getElementsByClassName("cell"); // Prendo tutte le celle in pagina
  // A ogni cella aggiungo gli eventi al click
  for (const cell of cells) { 
    cell.addEventListener("mousedown", e => {
      if (e.button == 0) { // Click sinistro del mouse
        const index = parseInt(cell.id.split("-")[1]); // Prendo l'indice dall'id e lo trasformo da stringa a numero
        cellClick(index, bombs);
      } else if (e.button == 2 && gameWin === null && (cell.innerText === "" || cell.innerText === "🚩")) { // Click destro del mouse, se la casella non è già stata selezionata
        cell.addEventListener("contextmenu", e => e.preventDefault());
        cell.innerText = cell.innerText === "" ?  "🚩" : "";
      }
    });
  }

  document.getElementById("scoreText").classList.remove("d-none"); // Mostro il punteggio
  document.getElementById("helpButtons").classList.remove("d-none"); // Mostro i pulsanti reset e info
  document.getElementById("difficultyForm").classList.add("d-none"); // Nascondo il form
});


// Funzione chiamata a ogni clic di una cella
function cellClick(index, bombs) {
  // Prendo la cella selezionata
  const cell = document.getElementById(`cell-${index}`); 
  
  if(cell.innerText === "🚩") // Se questa casella è stata segnalata, allora non faccio nulla
    return;

  // Se è stata cliccata una bomba
  if(bombs.has(index) && gameWin === null) {
    // Rivelo le bombe
    bombs.forEach(bomb => {
      const cell = document.getElementById(`cell-${bomb}`); // Cella con la bomba
      cell.innerText !== "🚩" && (cell.innerText = "💣"); // Non sovrascrivo il testo se era stata segnalata
    });
    // Informo che si ha perso
    gameWin = false;
    resultText.innerText = "Hai perso!";
  } else if(gameWin === null) {
    cell.innerText = revealCell(index, bombs); // Mostro la cella

    // Aggiungi la cella alle caselle cliccate
    clickedCells.add(index);
    scoreText.innerText = `Punteggio: ${clickedCells.size}`;

    // Se il giocatore ha vinto    
    if(clickedCells.size === (cellsNumber - 16)) {
      gameWin = true;
      resultText.innerText = "Hai vinto!";
    }
  }
}

// Funzione che restituisce il numero delle bombe vicino alla casella
function revealCell(index, bombs) {
  let nearBombsCounter = 0;
  let cellsPerLine = Math.sqrt(cellsNumber); // Radice quadrata del numero di celle totali (risultato: celle per linea)
  let column = Math.floor((index/10) * 10) % 10; // Prendo la prima cifra decimale dell'indice diviso 10 (risultato: numero della colonna della cella)
  column === 0 && (column = 10); // Se è nella decima colonna

  // Controllo riga attuale
  bombs.has(index-1) && column !== 1 && nearBombsCounter++;
  bombs.has(index) && nearBombsCounter++;
  bombs.has(index+1) && column !== cellsPerLine && nearBombsCounter++;

  if(index < (cellsNumber-cellsPerLine)) { // Se non è nell'ultima riga
    let nextLine = index + cellsPerLine; // Controllo riga successiva
    bombs.has(nextLine-1) && column !== 1 && nearBombsCounter++;
    bombs.has(nextLine) && nearBombsCounter++;
    bombs.has(nextLine+1) && column !== cellsPerLine && nearBombsCounter++;
  }
  if(index > cellsPerLine) { // Se non è nella prima riga
    let previousLine = index - cellsPerLine; // Controllo riga precedente
    bombs.has(previousLine-1) && column !== 1 && nearBombsCounter++;
    bombs.has(previousLine) && nearBombsCounter++;
    bombs.has(previousLine+1) && column !== cellsPerLine && nearBombsCounter++;
  }

  return nearBombsCounter;
}

// Funzione che inizializza il numero di celle e le mostra correttamente in pagina
function getCellsNumber(difficulty) {
  switch(difficulty){
    case("easy"):
      cellsNumber = 100;
      grid.style.gridTemplateColumns = "repeat(10, 50px)";
      break;
    case("medium"):
      cellsNumber = 81;
      grid.style.gridTemplateColumns = "repeat(9, 50px)";
      break;
    case("hard"):
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
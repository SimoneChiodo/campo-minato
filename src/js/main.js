// Prendo gli elementi dalla pagina
const form = document.getElementById("difficultyForm"); // Griglia del campo minato
const grid = document.getElementById("grid"); // Griglia del campo minato
const scoreText = document.getElementById("scoreText"); // Punteggio a schermo
const resultText = document.getElementById("resultText"); // Risultato della partita
const timeText = document.getElementById("timeText"); // Risultato della partita
const scoreTable = document.getElementById("scoreTable"); // Tabella con i punteggi
const scoreLines = document.getElementById("scoreLines"); // Tabella con i punteggi

// Creo le variabili necessarie
const array = []; // Array rappresentativo della griglia
let cellsNumber; // Numero delle celle presenti nella griglia
let difficulty; // Difficoltà scelta (easy, medium, hard)
let gameWin = null; // Contiene null se la partita non è finita, true se si ha vinto e false se si ha perso
let clickedCells = new Set(); // Il numero delle celle cliccate
let flagsCounter = 0; // Il numero delle bandiere piantate dall'utente
let isStarted = false; // Controlla se la partita è iniziata


// Quando finisce la partita il pulsante reset, ricarica la pagina, senza aprire la modal
document.getElementById("reload-button").addEventListener("click", () => {
  if(gameWin !== null) // Se la partità è finita
    location.reload(); // Ricarico la pagina
})

// Quando inizia la partita
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Prendo la difficoltà
  difficulty = form.querySelector("input[name='difficultyRadio']:checked").id;  

  // Inizializzo i dati
  getCellsNumber(difficulty);

  // Genero le posizioni delle bombe
  let bombs = new Set();
  while(bombs.size < 16)
    bombs.add(randomNumber(1, cellsNumber));

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
        cellClick(cell, index, bombs);
      } else if (e.button == 2 && gameWin === null && (cell.innerText === "" || cell.innerText === "🚩")) { // Click destro del mouse, se la casella non è già stata selezionata
        cell.addEventListener("contextmenu", e => e.preventDefault()); // Evito il menu del click destro

        if(cell.innerText === "") { // Se la casella è vuota: metto la bandiera
          cell.innerText = "🚩";
          document.getElementById("remaining-bomb").innerText = "Bombe rimaste: " + (bombs.size - ++flagsCounter);
        } else { // Se c'è una bandiera: la rimuovo
          cell.innerText = "";
          document.getElementById("remaining-bomb").innerText = "Bombe rimaste: " + (bombs.size - --flagsCounter);
        }
      }
    });
  }

  document.getElementById("game-container").classList.remove("d-none"); // Mostro il punteggio e la griglia
  document.getElementById("helpButtons").classList.remove("d-none"); // Mostro i pulsanti reset e info
  document.getElementById("difficultyForm").classList.add("d-none"); // Nascondo il form
});


// Funzione chiamata a ogni clic di una cella
function cellClick(cell, index, bombs) {  
  // Se questa casella è stata segnalata o la partita è finita, allora non faccio nulla
  if(cell.innerText === "🚩" || gameWin !== null) 
    return;

  // Faccio partire il cronometro
  if(isStarted === false) {
    isStarted = true;
    start();
  }

  // Se è stata cliccata una bomba
  if(bombs.has(index)) {
    // Rivelo le bombe
    bombs.forEach(bomb => {
      const cell = document.getElementById(`cell-${bomb}`); // Cella con la bomba
      cell.innerText !== "🚩" && (cell.innerText = "💣"); // Non sovrascrivo il testo se era stata segnalata
    });
    // Informo che si ha perso
    gameWin = false;
    stop(); // Fermo il timer
    resultText.innerText = "Hai perso!";
    resultText.classList.add("loose-text");
    document.getElementById("remaining-bomb").innerText = ""; // Nascondo il numero di bombe rimaste
    saveScore(); // Salvo il punteggio
    showScore(); // Mostro i punteggi
  } else {
    cell.innerText = revealCell(index, bombs); // Mostro la cella

    // Aggiungi la cella alle caselle cliccate
    clickedCells.add(index);
    scoreText.innerText = `Punteggio: ${clickedCells.size}`;

    // Se il giocatore ha vinto    
    if(clickedCells.size === (cellsNumber - 16)) {
      gameWin = true;
      resultText.innerText = "Hai vinto!";
      resultText.classList.add("win-text");
      stop(); // Fermo il timer
      document.getElementById("remaining-bomb").innerText = ""; // Nascondo il numero di bombe rimaste
      saveScore(); // Salvo il punteggio
      showScore(); // Mostro i punteggi
    }
  }
}

// Funzione che restituisce il numero delle bombe vicino alla casella
function revealCell(index, bombs) {
  let nearBombsCounter = 0;
  let cellsPerLine = Math.sqrt(cellsNumber); // Radice quadrata del numero di celle totali (risultato: celle per linea)
  let column = Math.floor(index) % cellsPerLine; // Prendo la prima cifra decimale dell'indice diviso il numero di celle per linea (risultato: numero della colonna della cella)
  if(column === 0) { // Se è nell'ultima colonna
    cellsPerLine === 10 ? (column = 10) : 
      cellsPerLine === 9 ? (column = 9) : (column = 7);
  }

  // Controllo riga attuale
  bombs.has(index-1) && column !== 1 && nearBombsCounter++;
  bombs.has(index) && nearBombsCounter++;
  bombs.has(index+1) && column !== cellsPerLine && nearBombsCounter++;

  if(index <= (cellsNumber-cellsPerLine)) { // Se non è nell'ultima riga
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

// Funzione che mostra i punteggi
let scores = JSON.parse(localStorage.getItem("scores")) || []; // Recupero i punteggi precedenti
function showScore() {
  scoreTable.classList.remove("d-none"); // Mostro la tabella
  scoreLines.innerHTML = ""; // Resetto la tabella
  const filteredScore = scores.filter(score => score.difficulty === difficulty); // Prendo solo i punteggi della difficoltà selezionata
  filteredScore.map(actualScore => {
    scoreLines.innerHTML += `
    <tr>
      <th scope="row">${actualScore.date}</th>
      <td>${actualScore.score}</td>
      <td>${actualScore.time}</td>
      <td>
        <button class="btn btn-danger fa-sm" onClick="deleteScore('${actualScore.date}')">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
    `;
  });

  if(filteredScore.length === 0) // Se la tebella rimane vuota
    scoreLines.innerHTML += `
    <tr>
      <th scope="row"><i>none</i></th>
      <td><i>none</i></td>
      <td><i>none</i></td>
      <td><i>none</i></td>
    </tr>
    `;
}

// Funzione che salva il punteggio
function saveScore() {
  // Creo il nuovo punteggio
  scores.push({
    date: new Date().toLocaleString(),
    score: clickedCells.size,
    time: formatCount(),
    difficulty: difficulty
  });
  // Salvo in memoria il nuovo punteggio
  localStorage.setItem("scores", JSON.stringify(scores)); 
}

// Funzione che elimina un punteggio
function deleteScore(date) {
  localStorage.setItem("scores", JSON.stringify(scores.filter(score => (score.date !== date)))); 
  scores = JSON.parse(localStorage.getItem("scores")); // Aggiorno anche l'array in memoria
  showScore();
}

// Funzione che fa partire il cronometro
let seconds = -1;
let minutes = 0;
let timeout;
function start() {
  seconds++;
  timeText.textContent = formatCount(); // Aggiorno il testo
  timeout = setTimeout(start, 1000); // Avvio il timer
}

// Funzione che ferma il cronometro
function stop() {
  clearInterval(timeout);
}

// Funzione che mostra il testo del cronometro formattato
function formatCount() {
  let output = "";
  if(seconds === 60) { // Aggiungo un minuto
    minutes++;
    seconds = 0;
  }

  minutes < 10 && (output += "0"); // Formatto i minuti
  output += minutes + " : "; // Mostro i minuti
  seconds < 10 && (output += "0"); // Formatto i secondi
  output += seconds; // Mostri i secondi

  return output;
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
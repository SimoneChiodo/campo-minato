// Prendo gli elementi dalla pagina
const formGenerateNumbers = document.getElementById("formGenerateNumbers");
const formSearchNumbers = document.getElementById("formSearchNumbers");
const numbersContainer = document.getElementById("numbersContainer");
const numbersSearchAnswer = document.getElementById("numbersSearchAnswer");

// Creo le variabili necessarie
const array = new Set();

// Funzione che genera i numeri in pagina
formGenerateNumbers.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevengo il ricaricarsi della pagina
  
  // Genero i numeri
  while(array.size < e.target.inputNumbers.value)
    array.add(randomNumber(0, 100));

  // Mostro i numeri in pagina
  numbersContainer.innerHTML = "<h2 class='mb-3'>I numeri generati sono: </h2>"; 
  array.forEach(n => { numbersContainer.innerHTML += `<div class="col"> 
      ${n}
    </div>`; });
  numbersContainer.classList.remove("d-none");
  formSearchNumbers.classList.remove("d-none");
});

formSearchNumbers.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevengo il ricaricarsi della pagina
  
  // Converto il numero da stringa a numero
  const number = parseInt(e.target.numberSearch.value);

  // Cerco il numero
  array.has(number) ? numbersSearchAnswer.innerText = "Numero trovato!" : numbersSearchAnswer.innerText = "Numero NON trovato";
});

/**
 * Function to generare a random number between a min and a max (included).
 * @param {number} min - Min number to generate
 * @param {number} max - Max number to generate
 * @returns {number} - Random number
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
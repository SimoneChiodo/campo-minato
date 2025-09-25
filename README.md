# Progetto JavaScript: Campo Minato

## 📖 Descrizione
Il progetto riproduce il celebre gioco **Campo Minato**, con l’obiettivo di esercitarmi nella **logica in JavaScript**, nella **manipolazione del DOM** e nella gestione degli **eventi interattivi**.  
Prima della realizzazione del gioco completo, sono stati sviluppati **due esercizi propedeutici**, pensati per consolidare le competenze di base necessarie.


## 🌍 Funzionalità principali
- **Griglia di gioco dinamica**: generazione di una griglia 7x7 (49 celle) nella versione base.  
- **Clic sulle celle**: l’utente può scoprire le celle e accumulare punteggio.  
- **Numeri bombe confinanti**: una volta cliccato su una cella, verrà rivelato il numero delle bombe confinanti con essa.  
- **Gestione bombe**: 16 bombe posizionate casualmente, senza duplicati.  
- **Difficoltà di gioco**: Il gioco contiene 3 difficoltà differenti (ognuna con 16 bombe):
  - **Easy**: griglia 10x10 (100 celle);  
  - **Medium**: griglia 9x9 (81 celle);  
  - **Hard**: griglia 7x7 (49 celle).  
- **Classifica**: per ogni partita, verrà contato il tempo impiegato e il punteggio, questi dati verranno salvati in memoria sfruttando l'oggetto `localStorage`.  
- **Game Over**: la partita termina quando l’utente colpisce una bomba o raggiunge il punteggio massimo. 

## 🛠️ Tecnologie utilizzate
- **JavaScript**: per la logica del gioco, la gestione degli eventi e la manipolazione dinamica del DOM.  
- **HTML**: per la struttura della griglia e degli elementi interattivi.  
- **CSS**: per lo stile delle celle e per il feedback visivo durante il gioco.  

<br>

# 🏋️‍♀️ Progetti propedeutici
Prima di sviluppare il gioco completo, sono stati creati due esercizi mirati:

1. **Manipolazione DOM Base**  
   - Obiettivo: generare dinamicamente una griglia HTML con numeri progressivi.  
   - Ogni elemento della griglia è reso cliccabile e viene aggiornato un contatore.  
   - Scopo: esercitarsi nella manipolazione del DOM e nella gestione degli eventi.  

2. **Generazione Array Random**  
   - Obiettivo: creare un array di numeri casuali non ripetuti.  
   - Inclusa una funzione per verificare la presenza di un valore nell’array.  
   - Scopo: consolidare logica su array, funzioni e gestione di valori unici.  

Questi due esercizi hanno lo scopo di preparare le basi logiche e tecniche per lo sviluppo di Campo Minato, garantendo padronanza sugli strumenti fondamentali prima di affrontare la complessità del gioco.  

import Ship from "./ship.js";
import Board from "./board.js";
import Player from "./player.js";
import AI from "./ai.js";

// Naam krijgen van form
// const player = new Player("Kaas"); 
// const computer = new Player("The Computer");

// let mode = 'preparation';
// let current = player;

// const board = new Board();

const board = new Board();
const ai = new AI(board);

printArray(ai.generateProbabilityMap());

function printArray (array) {
    for (let i = 0; i < array.length; i++) {
        let string = '';
        for (let j = 0; j < array[i].length; j++) {
            string += `(${array[i][j] < 10 ? array[i][j].toString() + ' ' : array[i][j].toString()})`;
        }
        console.log(string);
    }
}

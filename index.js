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

board.tiles[4][4].attacked = true;
board.tiles[5][5].attacked = true;

console.log(ai.getHighestProbabilityLocations());



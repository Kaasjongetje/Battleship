import Ship from "./ship.js";
import Board from "./board.js";
import Player from "./player.js";
import AI from "./ai.js";

// Naam krijgen van form
const player = new Player("Kaas"); 
const computer = new Player("The Computer");

let mode = 'preparation';
let current = player;


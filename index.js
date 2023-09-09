import Ship from "./ship.js";
import Board from "./board.js";
import Player from "./player.js";
import AI, { printArray } from "./ai.js";
import { loadPage, getForm, getPreparation } from "./dom.js";
import { validateInput } from "./script.js";

let player = new Player('Kaasjongetje');// let player;
const computer = new Player('The Computer');

loadPage(getPreparation());// loadPage(getForm());

export function initializePlayer (name) {
    player = new Player(name);
    loadPage(getPreparation());
}














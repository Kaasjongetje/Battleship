import Ship from "./ship.js";
import Board from "./board.js";
import Player from "./player.js";
import AI from "./ai.js";
import { loadPage, getForm, getPreparation } from "./dom.js";
import { validateInput } from "./script.js";

let player;
const computer = new Player('The Computer');

loadPage(getForm());

export function initializePlayer (name) {
    player = new Player(name);
    loadPage(getPreparation());
}














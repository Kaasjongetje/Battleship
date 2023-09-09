import Ship from "./ship.js";
import Board from "./board.js";
import Player from "./player.js";
import AI, { printArray } from "./ai.js";
import { loadPage, getForm, getPreparation } from "./dom.js";
import { validateInput } from "./script.js";

let player;
const computer = new Player('The Computer');

player = new Player('Kaasjongetje'); // loadPage(getForm());
loadPage(getPreparation());
player.board.place(player.board.ships[0], [0, 0]);
player.board.place(player.board.ships[1], [1, 0]);
player.board.place(player.board.ships[2], [2, 0]);
player.board.place(player.board.ships[3], [3, 0]);
player.board.place(player.board.ships[4], [4, 0]);

export function initializePlayer (name) {
    player = new Player(name);
    loadPage(getPreparation());
    player.board.place(player.board.ships[0], [0, 0]);
    player.board.place(player.board.ships[1], [1, 0]);
    player.board.place(player.board.ships[2], [2, 0]);
    player.board.place(player.board.ships[3], [3, 0]);
    player.board.place(player.board.ships[4], [4, 0]);
}














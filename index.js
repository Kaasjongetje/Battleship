import Ship from "./ship.js";
import Board from "./board.js";
import Player from "./player.js";
import AI, { printArray } from "./ai.js";
import { getForm, loadPage, getPreparation } from "./dom.js";

export let player;
const computer = new Player('The Computer');

// loadPage(getForm());

initializePreparation('Kaasjongetje');

export function initializePreparation (playerName) {
    player = new Player(playerName);
    player.board.place(player.board.ships[0], [0, 0]);
    player.board.place(player.board.ships[1], [1, 0]);
    player.board.place(player.board.ships[2], [2, 0]);
    player.board.place(player.board.ships[3], [3, 0]);
    player.board.place(player.board.ships[4], [4, 0]);
    loadPage(getPreparation());
}

export function setSize (element, size, direction) {
    element.style.width = direction === 'horizontal' ? `${size}0%` : `10%`;
    element.style.height = direction === 'vertical' ? `${size}0%` : `10%`;
}

export function setPosition (element, location) {
    element.style.top = `${location[0] * 10}%`;
    element.style.left = `${location[1] * 10}%`;
}
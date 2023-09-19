import Ship from "./ship.js";
import Board from "./board.js";
import Player from "./player.js";
import AI, { printArray } from "./ai.js";
import { getForm, loadPage, getPreparation } from "./dom.js";

export let player;
export const computer = new Player('The Computer');

export let ai;

loadPage(getForm());

export function setSize (element, size, direction) {
    element.style.width = direction === 'horizontal' ? `${size}0%` : `10%`;
    element.style.height = direction === 'vertical' ? `${size}0%` : `10%`;
}

export function setPosition (element, location) {
    element.style.top = `${location[0] * 10}%`;
    element.style.left = `${location[1] * 10}%`;
}

export function setPlayer (newPlayer) {
    player = newPlayer;
}

export function setAI (newAI) {
    ai = newAI;
}
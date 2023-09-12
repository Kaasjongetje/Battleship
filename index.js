import Ship from "./ship.js";
import Board from "./board.js";
import Player from "./player.js";
import AI, { printArray } from "./ai.js";
import { loadPage, } from "./dom.js";

export let player;
const computer = new Player('The Computer');

let currentDraggedShip = null;
let draggedShipTile = null;

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

export function validateInput() {
    const input = document.getElementById('name');
    const errorMessage = document.getElementById('name-error');
    if (input.validity.valid) {
        if (input.classList.contains('error')) {
            errorMessage.textContent = '';
            input.classList.remove('error');
        }   
    } else {
        // Min length is 1
        if (input.value.length < 1) {
            if (!input.classList.contains('error')) {
                errorMessage.textContent = 'You need at least 1 character';
                input.classList.add('error');
            }
        }
    }
}

export function validateForm (e) {
    e.preventDefault();

    validateInput();

    const form = document.getElementById('name-form');
    if (!form.checkValidity()) return;

    const name = document.getElementById('name').value;
    initializePlayer(name);
}
















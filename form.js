import { 
    setPlayer,
    setAI,
    player,
 } from "./index.js";
 import { 
    loadPage,
    getPreparation, 
} from "./dom.js";
import Player from "./player.js";
import AI from "./ai.js";

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
    initializePreparation(name);
}

export function initializePreparation (playerName) {
    setPlayer(new Player(playerName));
    setAI(new AI(player.board));

    player.board.place(player.board.ships[0], [0, 0]);
    player.board.place(player.board.ships[1], [1, 0]);
    player.board.place(player.board.ships[2], [2, 0]);
    player.board.place(player.board.ships[3], [3, 0]);
    player.board.place(player.board.ships[4], [4, 0]);
    
    loadPage(getPreparation());
}
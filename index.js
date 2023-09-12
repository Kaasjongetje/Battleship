import Ship from "./ship.js";
import Board from "./board.js";
import Player from "./player.js";
import AI, { printArray } from "./ai.js";
import { getForm, loadPage, getPreparation } from "./dom.js";

export let player;
const computer = new Player('The Computer');

player = new Player('Kaasjongetje');// loadPage(getForm());

loadPage(getPreparation());

export function initializePlayer (name) {
    player = new Player(name);
    loadPage(getPreparation());
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

export function onTileEnter() {

}

export function onTileLeave() {
    
}

export function onShipClick() {
    
}

export function setSize(element, size, direction) {
    element.style.right = direction === 'horizontal' ? `calc(-${size - 1}00% - ${size - 1}px)` : '0';
    element.style.bottom = direction === 'vertical' ? `calc(-${size - 1}00% - ${size - 1}px)` : '0';  
}

export function initializeShips(map, ships, initializeShip) {
    initializeShip(map[0][0], ships[0]); 
    initializeShip(map[1][0], ships[1]); 
    initializeShip(map[2][0], ships[2]); 
    initializeShip(map[3][0], ships[3]); 
    initializeShip(map[4][0], ships[4]); 
}
















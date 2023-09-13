import Ship from "./ship.js";
import Board from "./board.js";
import Player from "./player.js";
import AI, { printArray } from "./ai.js";
import { getForm, loadPage, getPreparation } from "./dom.js";

export let player;
const computer = new Player('The Computer');

let selectedShip = null;

player = new Player('Kaasjongetje');// loadPage(getForm());

loadPage(getPreparation()); // Deze twee regels moeten weg uiteindelijk
initializeShips(player.board.ships, (row, cell, ship) => player.board.place(ship, [row, cell]));

export function initializePlayer (name) {
    player = new Player(name);
    loadPage(getPreparation());
    initializeShips(player.board.ships, (row, cell, ship) => player.board.place(ship, [row, cell]));
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

export function selectShip(ship, shipElement, canPlaceIndicator) {
    const selectedShipElement = document.querySelector('.ship.selected');
    if (selectedShipElement !== null) selectedShipElement.classList.remove('selected');

    selectedShip = ship;
    shipElement.classList.add('selected');

    setSize(canPlaceIndicator, ship.size, ship.direction);

    console.log(canPlaceIndicator);
}

export function onRotatorEnter() {
    console.log('test');
}

export function onRotatorLeave() {
    
}


export function setSize(element, size, direction) {
    element.style.right = direction === 'horizontal' ? `calc(-${size - 1}00% - ${size - 1}px)` : '0';
    element.style.bottom = direction === 'vertical' ? `calc(-${size - 1}00% - ${size - 1}px)` : '0';  
}

export function initializeShips(ships, initializeShip) {
    initializeShip(0, 0, ships[0]); 
    initializeShip(1, 0, ships[1]); 
    initializeShip(2, 0, ships[2]); 
    initializeShip(3, 0, ships[3]); 
    initializeShip(4, 0, ships[4]); 
}
















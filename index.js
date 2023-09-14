import Ship from "./ship.js";
import Board from "./board.js";
import Player from "./player.js";
import AI, { printArray } from "./ai.js";
import { getForm, loadPage, getPreparation } from "./dom.js";

export let player;
const computer = new Player('The Computer');

let draggedShip = null;

player = new Player('Kaasjongetje');// loadPage(getForm());

loadPage(getPreparation()); // Deze regels moeten weg uiteindelijk
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

export function setSize (element, size, direction, multiplier) {
    element.style.width = direction === 'horizontal' ? `${size * multiplier}%` : `${multiplier}%`;
    element.style.height = direction === 'vertical' ? `${size * multiplier}%` : `${multiplier}%`;
}

export function initializeShips (ships, initializeShip) {
    initializeShip(0, 0, ships[0]);
    initializeShip(1, 0, ships[1]);
    initializeShip(2, 0, ships[2]);
    initializeShip(3, 0, ships[3]);
    initializeShip(4, 0, ships[4]);
}

export function setPosition (element, row, cell) {
    element.style.top = `${row}0%`;
    element.style.left = `${cell}0%`;
}

export function onShipDragStart (ship, canPlaceIndicator) {
    draggedShip = ship;
    setSize(canPlaceIndicator, ship.size, ship.direction, 10);
    console.log(draggedShip);
}

export function onShipDragEnter (canPlaceIndicator, row, cell) {
    if (player.board.canPlace(draggedShip, [row, cell])) {
        if (canPlaceIndicator.classList.contains('invalid'))
            canPlaceIndicator.classList.remove('invalid');
        if (!canPlaceIndicator.classList.contains('valid'))
            canPlaceIndicator.classList.add('valid');
    } else {
        if (canPlaceIndicator.classList.contains('valid'))
            canPlaceIndicator.classList.remove('valid');
        if (!canPlaceIndicator.classList.contains('invalid'))
            canPlaceIndicator.classList.add('invalid');
    }

    setPosition(canPlaceIndicator, row, cell);
}

export function onShipDrop (shipContainer, row, cell) {
    setPosition(shipContainer, row, cell);
    shipContainer.style.transform = 'translate(0px, 0px)';
    shipContainer.setAttribute('data-x', '0');
    shipContainer.setAttribute('data-y', '0');
}

export function onShipDrag (e) {
  const target = e.target

  const x = (parseFloat(target.getAttribute('data-x')) || 0) + e.dx
  const y = (parseFloat(target.getAttribute('data-y')) || 0) + e.dy

  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

















import { initializePlayer, player } from "./index.js";

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

export function onShipDragEnter (tileElement, canPlaceIndicator, ship, row, cell) {
    tileElement.appendChild(canPlaceIndicator);

    if (player.board.canPlace(ship, [row, cell])) {
        canPlaceIndicator.style.backgroundColor = 'green';
    } else {
        canPlaceIndicator.style.backgroundColor = 'red';
    }
}
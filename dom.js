import { validateInput, validateForm, onShipDragEnter } from "./script.js";
import Ship from "./ship.js";
import Board from "./board.js";
import { player } from "./index.js";

let tileElements;
let currentDraggedShip;

export function loadPage (element) {
    removeChildNodes(document.body);
    document.body.appendChild(element);
}

export function getForm() {
    const form = document.createElement("form");
    form.setAttribute("novalidate", "");
    form.setAttribute("id", "name-form");

    const label = document.createElement("label");
    label.setAttribute("for", "name");
    label.textContent = "Name";
    form.appendChild(label);

    const inputWrapper = document.createElement("div");
    inputWrapper.className = "input-wrapper";
    form.appendChild(inputWrapper);

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "name");
    input.setAttribute("minlength", "1");
    input.setAttribute("maxlength", "15");
    input.setAttribute("required", "required");
    inputWrapper.appendChild(input);

    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.setAttribute("id", "name-error");
    inputWrapper.appendChild(errorMessage);

    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "Continue";
    form.appendChild(submitButton);

    input.addEventListener('input', () => validateInput(input, errorMessage));
    form.addEventListener('submit', validateForm);

    return form;
}

export function getPreparation() {
    const preparationDiv = document.createElement('div');
    preparationDiv.classList.add('preparation');

    const boardDiv = document.createElement('div');
    boardDiv.classList.add('board');

    const canPlaceIndicator = document.createElement('div');
    canPlaceIndicator.classList.add('can-place-indicator');

    tileElements = Board.createMap((row, cell) => {
        const tileDiv = document.createElement('div');
        tileDiv.classList.add('tile');

        interact(tileDiv).dropzone({
            // accept: '.draggable-ship',
            ondragenter: (e) => onShipDragEnter(e.target, canPlaceIndicator, currentDraggedShip, row, cell),

        });

        boardDiv.appendChild(tileDiv);

        return tileDiv;
    });
    tileElements[0][0].appendChild(canPlaceIndicator);
    preparationDiv.appendChild(boardDiv);

    const shipElements = [];
    for (const ship of player.board.ships) {
        const shipElement = createShipElement(ship.size);

        interact(shipElement).draggable({
            inertia: true,
            listeners: {
                start: () => {
                    currentDraggedShip = ship;
                    canPlaceIndicator.style.right = shipElement.style.right
                },
                move: onShipDrag,
                end: () => {
                    currentDraggedShip = null;
                    canPlaceIndicator.style.right = '100%';
                },
            }
        });

        shipElements.push(shipElement);
    }
    tileElements[0][0].appendChild(shipElements[0]);
    tileElements[1][0].appendChild(shipElements[1]);
    tileElements[2][0].appendChild(shipElements[2]);
    tileElements[3][0].appendChild(shipElements[3]);
    tileElements[4][0].appendChild(shipElements[4]);

    return preparationDiv;
}

function createShipElement (size) {
    const shipDiv = document.createElement('div');
    shipDiv.classList.add('ship');
    shipDiv.style.right = `calc(-${size - 1}00% - ${size - 1}px)`;
    return shipDiv;
}

function removeChildNodes (element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function onShipDrag (e) {
    const target = e.target
    
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + e.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + e.dy;
  
    target.style.transform = `translate(${x}px, ${y}px)`;

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

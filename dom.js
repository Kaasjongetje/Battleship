import {
    validateInput, 
    validateForm,
    player,
    setSize,
    initializeShips,
    setPosition,
    onShipDrag,
    onShipDrop,
    onShipDragStart,
    displayIndicator,
    onShipDragLeave,
    draggedShip,
    onRotatorEnter
} from "./index.js";
import Board from "./board.js";
import Ship from "./ship.js";

export function loadPage (element) {
    removeChildNodes(document.body);
    document.body.appendChild(element);
}

export function getPreparation() {
    const preparationElement = createElement('preparation');

    const boardElement = createElement('board');

    const canPlaceIndicator = createElement('can-place-indicator');
    boardElement.appendChild(canPlaceIndicator);

    const shipContainers = [];
    for (const ship of player.board.ships) {
        const shipContainer = createElement('ship-container');
        interact(shipContainer).draggable({
            modifiers: [
                interact.modifiers.restrictRect({
                  restriction: 'parent',
                  endOnly: true
                })
              ],
            listeners: {
                start: () => onShipDragStart(ship, canPlaceIndicator, boardElement),
                move: onShipDrag,
            }
        });

        const shipWrapper = createElement('ship-wrapper');
        setSize(shipWrapper, ship.size, ship.direction, 100);

        const shipElement = createElement('ship');

        shipWrapper.appendChild(shipElement);

        const rotator = createElement('rotator');
        rotator.addEventListener('mouseenter', () => onRotatorEnter(ship));

        shipContainer.appendChild(rotator);

        shipContainer.appendChild(shipWrapper);

        boardElement.appendChild(shipContainer);
        shipContainers.push(shipContainer);
    }

    initializeShips(shipContainers, (row, cell, shipContainer) => setPosition(shipContainer, row, cell));

    let even = 'light';
    let odd ='dark';
    let cellCounter = 0;
    Board.createMap((row, cell) => {
        if (cellCounter === Board.size) {
            [even, odd] = [odd, even];
            cellCounter = 0;
        }

        const tileElement = createElement(cell % 2 === 0 ? even : odd);

        interact(tileElement).dropzone({
            ondragenter: () => displayIndicator(draggedShip, row, cell),
            ondrop: (e) => onShipDrop(e.relatedTarget, row, cell, canPlaceIndicator),
            ondragleave: () => onShipDragLeave(canPlaceIndicator),
        });

        boardElement.appendChild(tileElement);
        cellCounter++;
    });

    preparationElement.appendChild(boardElement);

    return preparationElement;
}

function createElement(classname) {
    const element = document.createElement('div');
    element.classList.add(classname);
    return element;
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

function removeChildNodes (element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

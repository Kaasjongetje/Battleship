import {
    player,
    setSize,
    setPosition,
} from "./index.js";
import {
    validateInput,
    validateForm,
} from "./form.js";
import Board from "./board.js";
import Ship from "./ship.js";
import {
    onShipDrag,
    onShipDragStart,
    onTileEnter,
    onTileDrop,
    onTileLeave,
    onRotatorEnter,
    onRotatorClick,
    onRotatorLeave,
} from "./preparation.js";

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
                  endOnly: false,
                })
              ],
            listeners: {
                start: (e) => onShipDragStart(e, ship),
                move: (e) => onShipDrag(e),
            }
        });

        setPosition(shipContainer, ship.location);
        setSize(shipContainer, ship.size, ship.direction);

        const shipElement = createElement('ship');

        shipContainer.appendChild(shipElement);

        const rotator = createElement('rotator');
        rotator.addEventListener('mouseenter', () => onRotatorEnter(ship, rotator, shipContainer));
        rotator.addEventListener('click', () => onRotatorClick(ship, shipContainer));
        rotator.addEventListener('mouseleave', () => onRotatorLeave(ship, rotator, shipContainer));

        shipContainer.appendChild(rotator);

        boardElement.appendChild(shipContainer);
        shipContainers.push(shipContainer);
    }

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
            ondragenter: () => onTileEnter([row, cell]),
            ondrop: (e) => onTileDrop(e.relatedTarget, [row, cell]),
            ondragleave: () => onTileLeave(),
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

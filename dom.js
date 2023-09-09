import { validateForm } from "./script.js";
import { validateInput } from "./script.js";
import Ship from "./ship.js";
import Board from "./board.js";

let tileElements;

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

    tileElements = Board.createMap((row, cell) => {
        const tileDiv = document.createElement('div');
        tileDiv.classList.add('tile');

        boardDiv.appendChild(tileDiv);

        return tileDiv;
    });
    preparationDiv.appendChild(boardDiv);

    const shipElements = [];
    for (const shipName in Ship.SHIPS) {
        const size = Ship.SHIPS[shipName];
        const shipElement = createShipElement(size, true);
        shipElements.push(shipElement);
    }
    tileElements[0][0].appendChild(shipElements[0]);
    tileElements[1][0].appendChild(shipElements[1]);
    tileElements[2][0].appendChild(shipElements[2]);
    tileElements[3][0].appendChild(shipElements[3]);
    tileElements[4][0].appendChild(shipElements[4]);

    return preparationDiv;
}

function createShipElement (size, draggable) {
    const shipDiv = document.createElement('div');
    shipDiv.classList.add('ship');
    if (draggable) shipDiv.classList.add('draggable');
    shipDiv.style.right = `calc(-${size - 1}00% - ${size - 1}px)`;
    return shipDiv;
}

function removeChildNodes (element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

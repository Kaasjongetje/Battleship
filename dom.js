import {
    validateInput, 
    validateForm,
    onTileEnter,
    onTileLeave,
    player,
    selectShip, 
    setSize,
    initializeShips,
    onRotatorEnter,
    onRotatorLeave
} from "./index.js";
import Board from "./board.js";

export function loadPage (element) {
    removeChildNodes(document.body);
    document.body.appendChild(element);
}

export function getPreparation() {
    const preparationElement = document.createElement('div');
    preparationElement.classList.add('preparation');

    const boardElement = document.createElement('div');
    boardElement.classList.add('board');

    const canPlaceIndicator = document.createElement('div');
    canPlaceIndicator.classList.add('can-place-indicator');

    const tileElements = Board.createMap(() => {
        const tileElement = document.createElement('div');
        tileElement.classList.add('tile');

        tileElement.addEventListener('mouseenter', () => onTileEnter());
        tileElement.addEventListener('mouseleave', () => onTileLeave());

        boardElement.appendChild(tileElement);

        return tileElement;
    });

    const shipContainers = [];
    for (const ship of player.board.ships) {
        const shipContainer = document.createElement('div');
        shipContainer.classList.add('ship-container');

        const shipWrapper = document.createElement('div');
        shipWrapper.classList.add('ship-wrapper');

        setSize(shipWrapper, ship.size, ship.direction);

        const shipElement = document.createElement('div');
        shipElement.classList.add('ship');

        shipElement.addEventListener('click', () => selectShip(ship, shipElement));

        shipWrapper.appendChild(shipElement);

        const rotatorElement = document.createElement('div');
        rotatorElement.classList.add('rotator');

        rotatorElement.addEventListener('mouseenter', () => onRotatorEnter());
        rotatorElement.addEventListener('mouseleave', () => onRotatorLeave());

        shipContainer.appendChild(shipWrapper);
        shipContainer.append(rotatorElement);
        
        shipContainers.push(shipContainer);
    }

    initializeShips(shipContainers, (row, cell, shipContainer) => tileElements[row][cell].appendChild(shipContainer));
    
    preparationElement.appendChild(boardElement);

    return preparationElement;
}

function createBoardElement() {
    

    return board;
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

import { validateForm } from "./script.js";
import { validateInput } from "./script.js";
import Ship from "./ship.js";

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

    for (let i = 0; i < 100; i++) {
        const tileDiv = document.createElement('div');
        tileDiv.classList.add('tile');
        boardDiv.appendChild(tileDiv);
    }
    preparationDiv.appendChild(boardDiv);

    const shipContainerDiv = document.createElement('div');
    shipContainerDiv.classList.add('ship-container');

    for (const shipType in Ship.SHIPS) {
        const shipDiv = document.createElement('div');
        shipDiv.classList.add('ship', shipType.toLowerCase());
        shipDiv.setAttribute('draggable', 'true');
        shipContainerDiv.appendChild(shipDiv);
    }
    preparationDiv.appendChild(shipContainerDiv);

    return preparationDiv;
}

function removeChildNodes (element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

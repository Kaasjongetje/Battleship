import {
    player,
    computer,
    setSize,
} from "./index.js";
import { createElement } from "./dom.js";
import { setPosition } from "./index.js";

let currentPlayer;

export function setCurrentPlayer (inputPlayer) {
    currentPlayer = inputPlayer;
}

function getOpponent (inputPlayer) {
    return inputPlayer === player ? computer : player;
}

function getBoard (inputPlayer) {
    const boardElements = [...document.querySelectorAll('.board')];
    return inputPlayer === player ? boardElements[0] : boardElements[1];
}

function playTurn (location) {
    const opponent = getOpponent(currentPlayer);
    
    opponent.board.attack(location);
    const ship = opponent.board.getTile(location).ship;

    displayAttack(opponent, location, ship !== null);

    if (ship === null) {
        // currentPlayer = opponent;
        // if (opponent === computer) {
        //     playTurn();
        // }
        return;
    }

    if (ship.isSunk()) {
        displayShip(opponent, ship);
    }


}

function displayAttack (attackedPlayer, location, hit) {
    const attackIndicator = createElement('attack-indicator');
    attackIndicator.classList.add(hit ? 'hit' : 'miss');

    setPosition(attackIndicator, location);

    getBoard(attackedPlayer).appendChild(attackIndicator);
}

function displayShip (attackedPlayer, ship)  {
    const shipContainer = createElement('ship-container');
    const shipElement = createElement('ship');
    shipContainer.appendChild(shipElement);
    
    setSize(shipContainer, ship.size, ship.direction);
    setPosition(shipContainer, ship.location);

    getBoard(attackedPlayer).appendChild(shipContainer);
}

export function displayMessage (message) {
    const messageElement = document.querySelector('.message');
    messageElement.textContent = message;
}

export function onTileClick (location) {
    playTurn(location);
   
}

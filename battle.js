import {
    player,
    computer,
    setSize,
} from "./index.js";
import { createElement, getPreparation, loadPage } from "./dom.js";
import { 
    setPosition,
    ai,
 } from "./index.js";
import Board from "./board.js";
import { initializePreparation } from "./form.js";

let currentPlayer;
let gameOver = false;

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

function playTurn (inputPlayer, location) {
    const opponent = getOpponent(inputPlayer);
    
    opponent.board.attack(location);
    const ship = opponent.board.getTile(location).ship;

    displayAttack(opponent, location, ship !== null);

    if (ship === null) {
        currentPlayer = opponent;
        displayMessage(`It's ${opponent.name}'s turn`);

        if (opponent === computer) playComputerTurn();
        
        return;
    }

    if (ship.isSunk()) {
        if (inputPlayer === player) displayShip(opponent, ship);

        if (opponent.board.allShipsSunk()) {
            gameOver = true;
            displayMessage(`${inputPlayer.name} won the game`);
            displayPlayAgain();
            console.log(ai.attacks);
            return;
        }
    }

    displayMessage(`${inputPlayer.name} hit a ship, he/she can shoot another time`);

    if (inputPlayer === computer) playComputerTurn();
}

function playComputerTurn() {
    const messageElement = document.querySelector('.message'); 

    const addDot = () => messageElement.textContent += '.';

    addDot();
    setTimeout(addDot, 200);
    setTimeout(addDot, 400);
    setTimeout(() => playTurn(computer, ai.getBestMove()), 600);
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

function displayPlayAgain() {
    document.querySelector('.play-again-btn').style.display = 'block';
}

export function displayMessage (message) {
    const messageElement = document.querySelector('.message');
    messageElement.textContent = message;
}

export function onTileClick (location) {
    if (gameOver) return;
    if (currentPlayer === computer) return;
    if (!computer.board.canAttack(location)) return;

    playTurn(player, location);
}

export function onPlayAgainClick() {
    player.board = new Board();
    computer.board = new Board();
    initializePreparation(player.name);
    gameOver = false;
}

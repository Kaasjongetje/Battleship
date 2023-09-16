import {
  player,
  setPosition,
  setSize,
} from "./index.js";
import Ship from "./ship.js";

let draggedShip = null;
let previousLocation = null;

function getIndicator() {
  return document.querySelector('.can-place-indicator');
}

function displayIndicator() {
  getIndicator().style.visibility = 'visible';
}

function hideIndicator() {
  getIndicator().style.visibility = 'hidden';
}

function setValidity (ship, location) {
  const canPlaceIndicator = getIndicator();

  if (player.board.canPlace(ship, location)) {
    canPlaceIndicator.classList.toggle('valid', true);
    canPlaceIndicator.classList.toggle('invalid', false);
  } else {
    canPlaceIndicator.classList.toggle('invalid', true);
    canPlaceIndicator.classList.toggle('valid', false);
  }
}

function getRotatedClone (ship) {
  const rotatedClone = new Ship(ship.size, ship.direction);
  rotatedClone.rotate();
  return rotatedClone;
}

export function onTileEnter (location) {
  displayIndicator();
  setValidity(draggedShip, location);
  setPosition(getIndicator(), location);
}

export function onTileDrop (shipContainer, location) {
  shipContainer.setAttribute('data-x', 0);
  shipContainer.setAttribute('data-y', 0);
  shipContainer.style.transform = 'translate(0px, 0px)';

  hideIndicator();

  if (player.board.canPlace(draggedShip, location)) {
    player.board.place(draggedShip, location);
    setPosition(shipContainer, location);
  } else {
    player.board.place(draggedShip, previousLocation);
    setPosition(shipContainer, previousLocation);
  }

  draggedShip = null;
  previousLocation = null;
}

export function onTileLeave () {
  hideIndicator();
}

export function onRotatorEnter (ship, rotator) {
  if (draggedShip !== null) return;
  rotator.classList.add('hover');

  const rotatedClone = getRotatedClone(ship);

  previousLocation = ship.location;
  player.board.remove(ship);

  setSize(getIndicator(), rotatedClone.size, rotatedClone.direction);
  displayIndicator();
  setValidity(rotatedClone, previousLocation);
  setPosition(getIndicator(), previousLocation);
}

export function onRotatorClick (ship, shipContainer) {
  const rotatedClone = getRotatedClone(ship);

  if (!player.board.canPlace(rotatedClone, previousLocation)) return;

  ship.rotate();
  setSize(shipContainer, ship.size, ship.direction);
  
  const rotatedBackClone = getRotatedClone(rotatedClone);
  setSize(getIndicator(), rotatedBackClone.size, rotatedBackClone.direction);
}

export function onRotatorLeave (ship, rotator) {
  if (draggedShip !== null) return;
  
  hideIndicator();

  player.board.place(ship, previousLocation);

  previousLocation = null;

  rotator.classList.remove('hover');
}

export function onShipDrag (e) {
    const target = e.target;
  
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + e.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + e.dy;
  
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

export function onShipDragStart (ship) {
  draggedShip = ship;
  previousLocation = ship.location;

  player.board.remove(ship);
  setSize(getIndicator(), ship.size, ship.direction);
}
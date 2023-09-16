import {
  player,
  setPosition,
  setSize,
} from "./index.js";

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

export function onTileEnter (location) {
  displayIndicator();
  setValidity(draggedShip, location);
  setPosition(getIndicator(), location);
}

export function onTileDrop (shipElement, location) {
  shipElement.setAttribute('data-x', 0);
  shipElement.setAttribute('data-y', 0);
  shipElement.style.transform = 'translate(0px, 0px)';

  hideIndicator();

  if (player.board.canPlace(draggedShip, location)) {
    player.board.place(draggedShip, location);
    setPosition(shipElement, location);
  } else {
    player.board.place(draggedShip, previousLocation);
    setPosition(shipElement, previousLocation);
  }

  draggedShip = null;
  previousLocation = null;
}

export function onTileLeave () {
  hideIndicator();
}

export function onRotatorEnter (ship) {
  if (draggedShip !== null) return;
  console.log('rotenter')
}

export function onRotatorClick (ship) {
  console.log('rotclick')
}

export function onRotatorLeave (ship) {
  if (draggedShip !== null) return;
  console.log('rotleave')
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
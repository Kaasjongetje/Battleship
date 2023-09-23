export default class Tile {
    constructor() {
        this.ship = null;
        this.attacked = false;
    }

    isOccupied() {
        return this.ship !== null;
    }

    isObstacle() {
        return this.attacked && this.ship === null || this.attacked && this.ship.isSunk();
    }
}
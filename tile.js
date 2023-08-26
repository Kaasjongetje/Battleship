export default class Tile {
    constructor() {
        this.ship = null;
        this.visited = false;
    }

    isOccupied() {
        return this.ship !== null;
    }
}
import Tile from "./tile.js";
import Ship from "./ship.js";

export default class Board {
    static size = 10;

    constructor() {
        this.tiles = [];
        for (let i = 0; i < Board.size; i++) {
            this.tiles[i] = [];
            for (let j = 0; j < Board.size; j++) {
                this.tiles[i][j] = new Tile();
            }
        }
    }

    canPlace (ship, location) {
        return this.isSuitableLocation(ship, location, (tile) => !tile.isOccupied());
    }

    isSuitableLocation (ship, location, isDesirable) {
        const locations = ship.getLocations(location);
        for (const location of locations) {
            if (!Board.isValidLocation(location)) return false;
            const tile = this.tiles[location[0]][location[1]];
            if (!isDesirable(tile)) return false;
        }
        return true;
    }

    static isValidLocation (location) {
        return 0 <= location[0] && location[0] < Board.size && 0 <= location[1] && location[1] < Board.size;
    }

}

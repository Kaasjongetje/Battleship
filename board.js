import Tile from "./tile.js";
import Ship from "./ship.js";

export default class Board {
    static size = 10;

    print() {
        this.tiles.forEach((row) => {
            let rowString = '';
            row.forEach((tile) => {
                rowString += tile.attacked ? 'X' : '-';
            });
            console.log(rowString);
        });
    }

    constructor() {
        this.tiles = [];
        for (let i = 0; i < Board.size; i++) {
            this.tiles[i] = [];
            for (let j = 0; j < Board.size; j++) {
                this.tiles[i][j] = new Tile();
            }
        }
        this.ships = [];
    }

    allShipsSunk() {
        
    }

    attack (location) {
        this.tiles[location[0]][location[1]].attacked = true;
    }

    canAttack (location) {
        return !this.tiles[location[0]][location[1]].attacked;
    }

    remove (ship) {
        const locations = ship.getLocations(ship.location);

        locations.forEach((location) => {
            const tile = this.tiles[location[0]][location[1]];
            tile.ship = null;
        });

        ship.location = null;
    }

    place (ship, location) {
        const locations = ship.getLocations(location);

        locations.forEach((location) => {
            const tile = this.tiles[location[0]][location[1]];
            tile.ship = ship;
        });

        ship.location = location;
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

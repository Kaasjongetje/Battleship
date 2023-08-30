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
        this.initializeTiles();
        this.initializeShips();
    }

    getShip (location) {
        return this.getTile(location).ship;
    }

    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }

    attack (location) {
        const tile = this.getTile(location);
        tile.attacked = true;
        if (tile.ship !== null) tile.ship.hit();
    }

    canAttack (location) {
        return !this.getTile(location).attacked;
    }

    remove (ship) {
        const locations = ship.getLocations(ship.location);

        locations.forEach((location) => {
            const tile = this.getTile(location);
            tile.ship = null;
        });

        ship.location = null;
    }

    place (ship, location) {
        const locations = ship.getLocations(location);

        locations.forEach((location) => {
            const tile = this.getTile(location);
            tile.ship = ship;
        });

        ship.location = location;
    }

    canPlace (ship, location) {
        return this.isSuitableLocation(ship.getLocations(location), (tile) => !tile.isOccupied());
    }

    isSuitableLocation (locations, isDesirable) {
        for (const location of locations) {
            if (!Board.isValidLocation(location)) return false;
            const tile = this.getTile(location);
            if (!isDesirable(tile)) return false;
        }
        return true;
    }

    static isValidLocation (location) {
        return 0 <= location[0] && location[0] < Board.size && 0 <= location[1] && location[1] < Board.size;
    }

    getTile (location) {
        return this.tiles[location[0]][location[1]];
    }

    initializeTiles() {
        this.tiles = [];
        for (let i = 0; i < Board.size; i++) {
            this.tiles[i] = [];
            for (let j = 0; j < Board.size; j++) {
                this.tiles[i][j] = new Tile();
            }
        }
    }

    initializeShips() {
        this.ships = [];
        for (const shipName in Ship.SHIPS) {
            const shipLength = Ship.SHIPS[shipName];
            this.ships.push(new Ship(shipLength, 'horizontal', shipName));
        }
    }

}

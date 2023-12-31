import Tile from "./tile.js";
import Ship from "./ship.js";

export default class Board {
    static size = 10;

    print() {
        this.tiles.forEach((row) => {
            let rowString = '';
            row.forEach((tile) => {
                rowString += tile.ship !== null ? tile.ship.size : '-';
            });
            console.log(rowString);
        });
    }

    constructor() {
        this.tiles = Board.createMap(() => new Tile());
        this.ships = Ship.createShips();
    }
    
    static forEachTile (map, from, to, callback) {
        for (let row = from[0]; row <= to[0]; row++) {
            for (let cell = from[1]; cell <= to[1]; cell++) {
                callback(map[row][cell], row, cell);
            }
        }
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
        return Board.isValidLocation(location) && !this.getTile(location).attacked;
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
        return ship.getLocations(location).every((location) => {
            if (!Board.isValidLocation(location)) return false;
            return !this.getTile(location).isOccupied();
        });
    }

    static isValidLocation (location) {
        return 0 <= location[0] && location[0] < Board.size && 0 <= location[1] && location[1] < Board.size;
    }

    getTile (location) {
        return this.tiles[location[0]][location[1]];
    }

    static createMap (value) {
        const map = [];
        for (let row = 0; row < Board.size; row++) {
            map[row] = [];
            for (let cell = 0; cell < Board.size; cell++) {
                map[row][cell] = value(row, cell);
            }
        }
        return map;
    }

    static getRandomLocation(from = [0, 0], to = [9, 9]) {
        const minX = from[0];
        const maxX = to[0];
        const minY = from[1];
        const maxY = to[1];
    
        const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    
        return [randomX, randomY];
    }

    static getAdjacentLocations (location) {
        const adjacentLocations = [];

        for (const direction in Ship.DIRECTIONS) {
            const neighbouringLocation = Board.getNeighbouringLocation(location, Ship.DIRECTIONS[direction]);
            const oppositeNeighbouringLocation = Board.getNeighbouringLocation(location, Ship.getOppositeDirection(direction));

            adjacentLocations.push(neighbouringLocation);
            adjacentLocations.push(oppositeNeighbouringLocation);
        }

        return adjacentLocations;
    }
    
    static getNeighbouringLocation (location, direction) {
        const neighbouringRow = location[0] + direction[0];
        const neighbouringCell = location[1] + direction[1];
        return [neighbouringRow, neighbouringCell];
    }

    static containsLocation (array, inputLocation) {
        return array.some((location) => Board.isSameLocation(location, inputLocation));
    }

    static isSameLocation(locationA, locationB) {
        return locationA[0] === locationB[0] && locationA[1] === locationB[1];
    }

    placeRandomly (allowTouching) {
        this.ships.forEach((ship) => {
            if (ship.location !== null) this.remove(ship);
        });

        this.ships.forEach((ship) => {
            ship.setRandomDirection();

            let randomLocation;
            let desirableLocation = false;

            while (!desirableLocation) {
                randomLocation = Board.getRandomLocation([0, 0], ship.getMaxLocation());

                desirableLocation = this.canPlace(ship, randomLocation);

                if (!desirableLocation || allowTouching) continue;

                desirableLocation = ship.getAdjacentLocations(randomLocation).every((location) => {
                    if (!Board.isValidLocation(location)) return true;
                    return this.getTile(location).ship === null;
                });

            }

            this.place(ship, randomLocation);
        });
    }

}

import Tile from "./tile.js";
import Ship from "./ship.js";

export default class Board {
    static size = 10;

    print() {
        this.tiles.forEach((row) => {
            let rowString = '';
            row.forEach((tile) => {
                rowString += tile.ship !== null ? 'X' : '-';
            });
            console.log(rowString);
        });
    }

    constructor() {
        this.tiles = Board.createMap(() => new Tile());
        this.ships = Ship.createShips();
    }
    
    static forEachTile (map, callback, from = [0, 0], to = [9, 9]) {
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
        if (ship.location === null) return;

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

    placeRandomly (disallowTouch) {
        this.ships.forEach((ship) => this.remove(ship)); //this.remove om korter te maken

        this.ships.forEach((ship) => {
            ship.setRandomDirection();

            const from = [0, 0];
            const toRow = ship.direction === 'horizontal' ? Board.size - 1 : Board.size - ship.size;
            const toCell = ship.direction === 'horizontal' ? Board.size - ship.size : Board.size - 1;
            const to = [toRow, toCell];

            let randomLocation;
            do {
                randomLocation = Board.getRandomLocation(from, to);
            } while (!this.canPlace(ship, randomLocation));


            this.place(ship, randomLocation);
        });
    }

}

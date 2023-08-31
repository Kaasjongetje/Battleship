import Board from "./board.js";
import Ship from "./ship.js";

export default class AI {
    constructor (board) {
        this.board = board;
    }

    getRemainingShipSizes() {
        const sizes = [];
        this.board.ships.forEach((ship) => {
            if (ship.isSunk()) return;
            if (!sizes.includes(ship.size)) sizes.push(ship.size);
        });
        return sizes;
    }

    getPotentialShips() {
        const ships = [];
        for (const size of this.getRemainingShipSizes()) {
            ships.push(new Ship(size, 'horizontal'));
            ships.push(new Ship(size, 'vertical'));
        }
        return ships;
    }

    generateProbabilityMap() {
        for (const size of this.getRemainingShipSizes()) {
            for (const direction of Object.keys(Ship.DIRECTIONS)) {
                const ship = new Ship(size, direction);
                
                for (let i = 0; i <= Board.size - 1; i++) {
                    for (let j = 0; j <= Board.size - ship.size; j++) {
                        const locations = ship.getLocations([i, j]);

                        if (locations.every((location) => !this.board.getTile(location).attacked)) {
                            
                        }
                    }
                }
            }
        }

    }


}
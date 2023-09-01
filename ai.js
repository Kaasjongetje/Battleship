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
        const probabilityMap = Board.createMap(() => 0);
        for (const ship of this.getPotentialShips()) {
            const rowStart = ship.direction === 'horizontal' ? 0 : ship.size - 1;
            const maxRow = ship.direction === 'horizontal' ? Board.size - 1 : Board.size - ship.size;
            const maxCell = ship.direction === 'horizontal' ? Board.size - ship.size : Board.size - 1;

            for (let row = rowStart; row <= maxRow; row++) {
                for (let cell = 0; cell <= maxCell; cell++) {
                    const area = ship.getLocations([row, cell]);
                    if (this.board.isSuitableArea(area, (tile) => !tile.attacked)) {
                        area.forEach((location) => probabilityMap[location[0]][location[1]] += 1);
                    }
                }
            }
        }
        return probabilityMap;
    }

}
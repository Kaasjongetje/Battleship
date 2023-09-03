import Board from "./board.js";
import Ship from "./ship.js";

export default class AI {
    constructor (board) {
        this.board = board;
        this.foundShipLocations = [];
        this.targetLocation = null;
        this.targetDirection = null;
        this.latestTargetLocation = null;
        this.updateProbabilityMap();
    }

    play() {
        if (this.foundShipParts.length <= 0) {
            const locationToAttack = this.getRandomItem(this.probabilityMap);
            this.board.attack(locationToAttack);
            if (this.board.getTile(locationToAttack).ship !== null) {
                this.foundShipParts.push(locationToAttack);
            }
        } else {
            this.getNextTarget();
        }
    }

    getNextTarget() {
        if (this.targetLocation === null) {
            this.targetLocation = this.foundShipLocations[0];
            this.chooseDirection();
        }

        let nextTargetLocation = this.goForwards();

        while (!this.board.canAttack(nextTargetLocation)) {
            this.chooseDirection();
            nextTargetLocation = this.goForwards();
        }

        this.board.attack(nextTargetLocation);
        this.latestTargetLocation = nextTargetLocation;





    }

    getHighestProbabilityLocations() {
        this.updateProbabilityMap();
        let highestChance = 0;
        let highestProbabilityLocations = [];
        for (let i = 0; i < Board.size; i++) {
            for (let j = 0; j < Board.size; j++) {
                if (this.probabilityMap[i][j] < highestChance) continue;

                if (this.probabilityMap[i][j] > highestChance) {
                    highestChance = probabilityMap[i][j];
                    highestProbabilityLocations = [];
                }

                highestProbabilityLocations.push([i, j]);
            }
        }
        return highestProbabilityLocations;
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

    updateProbabilityMap() {
        const probabilityMap = Board.createMap(() => 0);
        for (const ship of this.getPotentialShips()) {
            const minRow = ship.direction === 'horizontal' ? 0 : ship.size - 1;
            const maxRow = Board.size - 1;
            const maxCell = ship.direction === 'horizontal' ? Board.size - ship.size : Board.size - 1;

            for (let row = minRow; row <= maxRow; row++) {
                for (let cell = 0; cell <= maxCell; cell++) {
                    const area = ship.getLocations([row, cell]);
                    if (this.board.isSuitableArea(area, (tile) => !tile.attacked)) {
                        area.forEach((location) => probabilityMap[location[0]][location[1]] += 1);
                    }
                }
            }
        }
        this.probabilityMap = probabilityMap;
    }

}

function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

function printArray (array) {
    for (let i = 0; i < array.length; i++) {
        let string = '';
        for (let j = 0; j < array[i].length; j++) {
            string += `(${array[i][j] < 10 ? array[i][j].toString() + ' ' : array[i][j].toString()})`;
        }
        console.log(string);
    }
}
import Board from "./board.js";
import Ship from "./ship.js";

export default class AI {
    constructor (board) {
        this.board = board;
        this.probabilityMap = null;
        this.shipLocations = [];
        this.latestLocation = null;
        this.attacks = 0;
    }

    getBestMove() {
        let latestShip;

        if (this.latestLocation === null) {
            latestShip = null;
        } else {
            latestShip = this.board.getTile(this.latestLocation).ship;
        }

        if (latestShip != null) {
            this.shipLocations.push(this.latestLocation);

            if (latestShip.isSunk()) {
                const area = latestShip.getLocations(latestShip.location);

                this.shipLocations = this.shipLocations.filter(shipLocation => !Board.containsLocation(area, shipLocation));
            }
        } 

        if (this.inHuntMode()) {
            this.updateProbabilityMap();
        } else {
            this.updateTargetMap();
        }
        
        const highestProbabilityLocations = this.getHighestProbabilityLocations();
        const locationToAttack = randomItemOf(highestProbabilityLocations);

        this.latestLocation = locationToAttack;

        this.attacks++;
        return locationToAttack;
    }

    inHuntMode() {
        return this.shipLocations.length === 0;
    }

    // Deze functie controleren
    updateTargetMap() {
        const targetMap = Board.createMap(() => 0);
        const potentialShips = this.getPotentialShips();

        const targetLocations = this.getTargetLocations();

        for (const shipLocation of this.shipLocations) {
            for (const ship of potentialShips) {
                let currentLocation = shipLocation;
                for (let i = 0; i < ship.size; i++) {
                    const area = ship.getLocations(currentLocation);

                    if (area.every((location) => Board.isValidLocation(location) && !this.board.getTile(location).isObstacle())) {
                        area.forEach((location) => {
                            if (Board.containsLocation(targetLocations, location)) {
                                targetMap[location[0]][location[1]]++;
                            }
                        });
                    }
                    // if (!area.some((location) => !Board.isValidLocation(location) || this.board.getTile(location).isObstacle())) {
                    //     area.forEach((location) => {
                    //         if (Board.containsLocation(targetLocations, location)) {
                    //             targetMap[location[0]][location[1]]++;
                    //         }
                    //     });
                    // }

                    const neighbouringLocation = Board.getNeighbouringLocation(currentLocation, Ship.getOppositeDirection(ship.direction));
                    if (!Board.isValidLocation(neighbouringLocation)) break;
                    currentLocation = neighbouringLocation;
                }   
            }
        }

        this.probabilityMap = targetMap;
    }

    getTargetLocations() {
        const targetLocations = [];

        this.shipLocations.forEach((shipLocation) => {
            Board.getAdjacentLocations(shipLocation).forEach((adjacentLocation) => {
                if (!Board.isValidLocation(adjacentLocation)) return;
                if (this.board.getTile(adjacentLocation).attacked) return;
                if (Board.containsLocation(targetLocations, shipLocation)) return;

                targetLocations.push(adjacentLocation);
            });
        });

        return targetLocations;
    }
    
    getHighestProbabilityLocations() {
        let highestChance = 0;
        let highestProbabilityLocations = [];

        Board.forEachTile(this.probabilityMap, [0, 0], [9, 9], (chance, row, cell) => {
            if (chance < highestChance) return;

            if (chance > highestChance) {
                highestChance = chance;
                highestProbabilityLocations = [];
            }

            highestProbabilityLocations.push([row, cell]);
        });
        
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
            Board.forEachTile(probabilityMap, [0, 0], ship.getMaxLocation(), (tile, row, cell) => {
                const area = ship.getLocations([row, cell]);

                if (area.some((location) => this.board.getTile(location).attacked)) return;

                area.forEach((location) => probabilityMap[location[0]][location[1]]++);
            });
        }

        this.probabilityMap = probabilityMap;
    }

}

function randomItemOf (array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

export function printArray (array) {
    for (let i = 0; i < array.length; i++) {
        let string = '';
        for (let j = 0; j < array[i].length; j++) {
            string += `(${array[i][j] < 10 ? array[i][j].toString() + ' ' : array[i][j].toString()})`;
        }
        console.log(string);
    }
}
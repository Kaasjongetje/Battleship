export default class Ship {
    constructor (size, direction, name) {
        this.size = size;
        this.direction = direction;
        this.name = name;
        this.location = null;
        this.hits = 0;
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        return this.hits >= this.size;
    }

    getLocations (location) {
        const [rowIncrement, columnIncrement] = Ship.DIRECTIONS[this.direction];

        let row = location[0];
        let column = location[1];
 
        const locations = [];
 
        for (let i = 0; i < this.size; i++) {
         locations.push([row, column]);
         row += rowIncrement;
         column += columnIncrement;
        }
 
        return locations;
     }

     getAdjacentLocations (location) {
        const adjacentLocations = [];
        let offset;

        if (this.direction === 'horizontal') {
            offset = [0, 1]; // Offset voor horizontaal
        } else {
            offset = [1, 0]; // Offset voor verticaal
        }

        for (let i = -1; i <= this.size; i++) {
            adjacentLocations.push([location[0] + i * offset[0], location[1] + i * offset[1]]);
            adjacentLocations.push([location[0] + i * offset[0] - offset[1], location[1] + i * offset[1] + offset[0]]);
            adjacentLocations.push([location[0] + i * offset[0] + offset[1], location[1] + i * offset[1] - offset[0]]);
        }

        return adjacentLocations;
        // const adjacentLocations = [];

        // if (this.direction === 'horizontal') {
        //     adjacentLocations.push([location[0], location[1] - 1]);
        //     adjacentLocations.push([location[0], location[1] + this.size]);
        //     for (let i = location[1]; i < location[1] + this.size; i++) {
        //         adjacentLocations.push([location[0] - 1, i]);
        //         adjacentLocations.push([location[0] + 1, i]);
        //     }
        // } else {
        //     adjacentLocations.push([location[0] - 1, location[1]]);
        //     adjacentLocations.push([location[0] + this.size, location[1]]);
        //     for (let i = location[0]; i < location[0] + this.size; i++) {
        //         adjacentLocations.push([i, location[1] - 1]);
        //         adjacentLocations.push([i, location[1] + 1]);
        //     }
        // }

        // return adjacentLocations;
     }

     rotate() {
        this.direction === 'horizontal' ? this.direction = 'vertical' : this.direction = 'horizontal';
     }

     initializeShips() {
        this.ships = [];
        
    }

    setRandomDirection() {
        const directions = Object.keys(Ship.DIRECTIONS);
        const randomIndex = Math.floor(Math.random() * directions.length);
        this.direction = directions[randomIndex];
    }

    static createShips() {
        const ships = [];
        for (const shipName in Ship.SHIPS) {
            const shipLength = Ship.SHIPS[shipName];
            ships.push(new Ship(shipLength, 'horizontal', shipName));
        }
        return ships;
    }

    static DIRECTIONS = {
        'horizontal': [0, 1],
        'vertical': [1, 0]
    }

    static SHIPS = {
        'Destroyer': 2,
        'Submarine': 3,
        'Cruiser': 3,
        'Battleship': 4,
        'Carrier': 5
    }

}
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
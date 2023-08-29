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

    static DIRECTIONS = {
        'horizontal': [0, 1],
        'vertical': [-1, 0]
    }

    static SHIPS = {
        'Destroyer': 2,
        'Submarine': 3,
        'Cruiser': 3,
        'Battleship': 4,
        'Carrier': 5
    }

}
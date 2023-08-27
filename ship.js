export default class Ship {
    constructor (size, direction) {
        this.size = size;
        this.direction = direction;
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

    static DIRECTIONS = {
        'horizontal': [0, 1],
        'vertical': [-1, 0]
    }

}
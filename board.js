import Tile from "./tile.js";

export default class Board {
    static size = 10;

    constructor() {
        this.tiles = [];
        for (let i = 0; i < Board.size; i++) {
            this.tiles[i] = [];
            for (let j = 0; j < Board.size; j++) {
                this.tiles[i][j] = new Tile();
            }
        }
    }

    canPlace (ship, location) {

    }
}

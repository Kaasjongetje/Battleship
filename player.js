import Board from "./board.js";

class Player {
    constructor (name) {
        this.name = name;
        this.board = new Board();
    }
}
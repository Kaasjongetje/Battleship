import Board from "./board.js";

export default class Player {
    constructor (name) {
        this.name = name;
        this.board = new Board();
    }
}
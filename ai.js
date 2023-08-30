import Board from "./board.js";

export default class AI {
    constructor (board) {
        this.board = board;
    }

    getRemainingShipSizes() {
        
    }

    generateProbabilityMap() {
        // Kijken welke schepen nog op het bord zijn
        const ships = [];

        const probabilityArray = [];

        for (const ship of ships) {
            for (let i = 0; i < Board.size; i++) {
                for (let j = 0; j < Board.size - ship.size; j++) {
                    const locations = ship.getLocations([i, j]);
                    if (this.board.isSuitableLocation(locations, (tile) => !tile.attacked)) {
                        
                    }
                }
            }
        }
        // Voor elk schip daarvan kijken op welke manieren
        // het horizontaal past
        // Voor elk schip kijken verticaal

    }


}
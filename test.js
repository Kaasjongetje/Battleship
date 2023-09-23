import Ship from "./ship.js";
import Board from "./board.js";
import AI, { printArray } from "./ai.js";
import Tile from "./tile.js";

const board = new Board();
const ai = new AI(board);

board.ships[0].hits = 999;
board.ships[1].hits = 999;
board.ships[2].hits = 999;
board.ships[3].hits = 999;

const ship = new Ship(3, 'vertical');

board.tiles[3][5].ship = ship;
board.tiles[3][5].attacked = true;
ai.shipLocations.push([3, 5]);

board.tiles[5][4].attacked = true;
board.tiles[6][5].attacked = true;
board.tiles[3][3].attacked = true;

ai.updateTargetMap();
printArray(ai.probabilityMap);


// board.ships[0].hits = 999;
// board.ships[1].hits = 999;
// board.ships[2].hits = 999;
// board.ships[3].hits = 999;

// board.tiles[1][1].attacked = true;
// board.tiles[2][1].attacked = true;

// ai.shipLocations.push([1, 1]);
// ai.shipLocations.push([2, 1]);


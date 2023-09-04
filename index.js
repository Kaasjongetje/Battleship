import Ship from "./ship.js";
import Board from "./board.js";
import Player from "./player.js";
import AI from "./ai.js";
import { getForm } from "./dom.js";


loadPage(getForm());










function loadPage (element) {
    removeChildNodes(document.body);
    document.body.appendChild(element);
}

function removeChildNodes (element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
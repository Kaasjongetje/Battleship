# Code Structure

1. Classes

- Ship: The Ship class stores the size of the ship, the direction and the location that it's placed on. The location can also be null, for example if you start dragging a ship, it's location will be set to null. When you'll drop it, the location will be set to the place where you dropped it.
getLocations (location) is an import function (method) inside the ship class. It returns the locations that the ship would be on if it would be placed on the location you pass into the function.
- Tile: Each gameboard is made out of a 10 x 10 area of tiles. The Tile class stores information about what ship has been placed on that tile (null if no ship) and whether it has been attacked or not.
- Board: The Board class stores an array[] of Ships and a two dimensional array[][] of Tiles. It has functionality to place and remove ships, check if all ships are sunk and much more.

2. DOM & Events

dom.js is the file that has all the functions to load in the different parts of the website. The loadPage (element) function removes all the elements that are on the body element and adds the element passed into the function to the body.

The website has 3 parts: the part where you can enter your name, the part where you can place your ships and the part where you can play the game. All these parts have their own function that returns one element that contains all the elements that part needs: getForm(), getPreparation() and getBattle().

The functions in dom.js also add the event handlers (and arguments that these event handlers need) to all the elements. These handlers are imported from form.js, preparation.js and battle.js.

3. Dragging and Dropping

The drag and drop was the hardest part about the project. After failing multiple times, I managed to use the library Interact.js to make this functionality. 

# TODO

1. Ai verbeteren
2. Filestructuur en Webpack toevoegen
3. Documentatie voor Github maken
4. Live preview voor Github maken
5. Design












# AI

Maken:
- canBeShip
- getLocationForwards

- changeDirection // kiest een (optimale) richting
- getLocationForwards
- canAttack(location) // kijkt of je verder kunt in die richting
- canBeShip(location) // kijkt of er een kans aanwezig is
- attack(location)
- isDeadEnd
- isShipPart
- isTargetShip

!!! Als het niet mogelijk is een schip te plaatsen in een richting dan kies die richting niet
Zoek vanuit eerste deel in schipdelen als dat kan
    Kies de een richting die niet kans 0 heeft
        Ga in die richting
            Doodgelopen?
                Kies richting

            Deel van schip gevonden?
                Aantal stappen in richting meer dan grootste schip?
                    Kies richting

                Sla het deel op in schipdelen
            
            Heel schip gevonden?
                Schip uit schipdelen

                Ander schip?
                    Kies richting

                Schip van eerste deel?
                    Stop

Beste richting kiezen
1. Is er een van de 4 locaties rondom het schip bekend dat daar ook een schip ligt? Is dat schip gezonken of nog niet?
2. Heeft het zin om de probability map te updaten?
3. Als je weet welke schipgroottes er nog zijn, heeft dat invloed?
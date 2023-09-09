# TODO



2 canplaceindicator op het bord plaatst

4 Zodra je een schip dragt dan moet de canplaceindicator de grootte van dat schip aannemen

5 Zorg ervoor dat de canplaceindicator in de tile wordt geplaatst waarover gedragt wordt

6 Zorg ervoor dat de kleur van de cpi wordt aangepast afhankelijk van of het kan of niet













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




2. AI

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





3. DOM
- Bedenk het design voor Form, Preparation, het echte spel en het einde, alleen HTML en CSS
- Bedenk hoe JS die dingen kan genereren en welke informatie die functies daarvoor nodig hebben

4. Game Loop
- Game loop zonder de user interface / Bedenken hoe de user functies zoals canPlace, place etc. gaat uitvoeren
- De todo nog verder uitbreiden

# Game Loop

1. Krijg de naam van de speler
2. Laat de speler zijn boten plaatsen
3. Laat de speler en computer om de beurt aanvallen
4. Laat een Play Again button zien als iemand gewonnen heeft
5. Zodra je op de Play Again button klikt ga je terug naar stap 2

# Functies

- rotate:  scrollen op het schip -> wheel
- canPlace:  als je hovert over een vakje -> dragover
- place:  als je loslaat op een vakje -> dragend
- remove:  als je een schip wegdragt van een vakje -> dragstart
- attack:  als je klikt op een vakje -> click

# Variables

- een variable die bijhoudt of je in de voorbereidingsfase zit of in de speelfase
- een variable die bijhoudt wiens beurt het is

# Pseudocode voor een beurt

1. Controleer of de plek waar een speler wilt aanvallen goed is
2. Val die plek aan
3. Kijk of het een schip was
4. Kijk of dat schip nu gezonken is
5. Kijk of het spel daardoor gewonnen is
6. Als de speler er niet door wint dan laat hem nog eens spelen




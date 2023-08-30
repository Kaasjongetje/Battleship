# TODO

- isSuitableLocation aanpassen en canPlace
- ship sizes functie voor ai
- bereken functie voor ai
- functie die array met hoogste kans vakjes returnt

[2] Schip vind algoritme voor AI

2. AI
- Algoritmes verzinnen
- Kans berekenen bij plek waar een nog niet gezonken schip is
- !! Als je een schip hebt gevonden, hoe bereken je dan welke van de omliggende tiles de grootste kans heeft op het schip
- Tile met grootste kans
- Schepen aanvallen totdat het schip gezonken is

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




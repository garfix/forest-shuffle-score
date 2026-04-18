The code voor de mobiele web app (alleen in het nederlands) [Forest Shuffle Score](https://patrickvanbergen.com/forest-shuffle-score/) die helpt bij het berekenen van de score in Forest Shuffle.

## Opmerkingen

- De score kan worden bijgehouden voor het basisspel, en eventueel de varianten Woodland Edge (bosrand), Alpine, en Exploration
- Standaard begint het spel met de gebruikers Patrick en Katja. Je kunt deze aanpassen bij het begin van een nieuw spel.

## Startpagina

Hiermee start de app op. Druk op Start.

![Home page](docs/img/home.png)

## Gebruikers-overzicht

In het gebruikersoverzicht zie je de actieve gebruikers, met het aantal kaarten dat ze hebben ingevoerd, en hun totale score.

Ook kun je hier een nieuw spel beginnen en naar het score-overzicht.

![Gebruikers](docs/img/users.png)

## Nieuw spel

Op deze pagina stel je in met welke personen je speelt en welke varianten je gebruikt. Je hoeft deze alleen in te stellen als ze veranderen.

NB: als je op de knop "Nieuw spel" drukt worden de ingevoerde waarden van het vorige spel verwijderd om een nieuw spel te kunnen beginnen. Als je dat niet wil kun je terug met de knop "Terug".

![Nieuw spel](docs/img/game.png)

## Categorie-pagina

Dit is een overzicht van alle kaarten per speler van elke categorie. De grot-kaarten vormen hier een eigen categorie.

![Categorie-pagina](docs/img/category.png)

Klik op bewerk om de kaart aantallen voor een categorie in te vullen.

## Soorten-pagina

Op de soorten-pagina voer je voor een gebruiker in hoeveel kaarten van elk type hij of zij heeft. Elke pagina bevat alle soorten van een categorie en binnen elke soort zijn de kaarttypen gesorteerd op alfabet, voor de zoekbaarheid.

Druk meermaals op `+1` of `-1` om het juiste aantal kaarten te krijgen. Het getal in het midden (oranje) toont het aantal kaarten en het getal rechts (donkergroen) de score voor dit type kaart.

De score is gebaseerd op de gegevens die het programma tot nu toe heeft van de gebruiker, en wordt **steeds opnieuw bijgewerkt** als er nieuwe aantallen bijkomen. De eik krijgt bijvoorbeeld nog geen punten bij het invoeren van het aantal kaarten van de eik, maar pas als de gebruiker 8 verschillende typen boom heeft, krijgt de eik punten.

Iedere kaart heeft een eigen score-berekening en allemaal worden ze steeds opnieuw berekend bij iedere wijziging aan de aantallen.

![Soort-pagina](docs/img/sort.png)

Sommige kaarten hebben een subvraag nodig om de score te kunnen berekenen. In dit voorbeeld zie je de Bosmier, die als subvraag wil weten hoeveel kaarten er onder een boom liggen.

![Bosmier](docs/img/subvraag.png)

Andere kaarten vragen om het aantal kaarten van een boom-kleur. Nadat je het aantal kaarten van Ree hebt opgegeven, kruis je aan welke kleur de reeën hebben en daarna vul je per boom-kleur het aantal kaarten in. Er zijn enkele varianten op dit principe.

![Ree subvraag](docs/img/ree.png)

## Grot-pagina

Op deze pagina wordt het aantal grot-kaarten ingevoerd, alsook de soort grotkaart (als er met de Exploration uitbreiding gespeeld wordt).

![Grot-pagina](docs/img/grot.png)

## Score overzicht

Hier zie je de scores per categorie, voor alle gebruikers.

![Score overzicht](docs/img/score.png)

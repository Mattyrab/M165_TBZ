# KN-M-02: Datenmodellierung für MongoDB

## Konzeptionelles Datenmodell

![database concept](M165_Concept.drawio.svg)

## Logisches Modell für MongoDB

![datebase logical model](logical_schematic.drawio.svg)

## Anwendung des Schemas in MongoDB

```sql
use <Datenbankname>;

db.createCollection(Artist)
db.createCollection(Genre)
```
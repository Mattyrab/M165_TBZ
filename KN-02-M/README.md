# KN-M-02: Datenmodellierung für MongoDB

## Konzeptionelles Datenmodell

![database concept](M165_Concept.drawio.svg)

## Logisches Modell für MongoDB

![datebase logical model](M165.drawio.svg)

## Anwendung des Schemas in MongoDB

```sql
use <Datenbankname>;

db.createCollection(Artist)
db.createCollection(Album)
db.createCollection(Song)
db.createCollection(SongGenre)
db.createCollection(Genre)
```
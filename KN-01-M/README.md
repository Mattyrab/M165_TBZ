# KN-01-M

## Installation

MongoDB Applikation
![MongoDB App](<Screenshot 2025-02-28 140525.png>)  

Der Parameter `authSource=admin` in der MongoDB-Verbindungszeichenfolge gibt an, welche Datenbank MongoDB für die Authentifizierung der Benutzeranmeldeinformationen verwenden soll.  
In MongoDB werden die Benutzeranmeldeinformationen (Benutzername und Passwort) in einer bestimmten Datenbank gespeichert, aber diese Anmeldeinformationen können für den Zugriff auf andere Datenbanken verwendet werden.  

mongodb.conf
![alt text](<Screenshot 2025-02-28 141342.png>)

Der `sed` Befehl ersetzt ein string mit eine andere und speichert der Datei.

## Erste Schritte GUI 

JSON Dokument erstellen
![json document insert](<Screenshot 2025-02-28 145543.png>)

Geburtsdatum Feld aktualisiert
![update json birthdate](<Screenshot 2025-02-28 151745.png>)

Ich hatte solle der Geburtsdatum so schreiben, wie im exportierte JSON Datei:  
```json
"birthday": {
    "$date": "1996-10-02T22:00:00.000Z"
  }
```

## Erste Schritte Shell

MongoDB Befehle im Appliktion
![mongodb commands app](<Screenshot 2025-02-28 154044.png>)

MongoDB Befehle in CLI
![mongodb commands cli](<Screenshot 2025-02-28 154457.png>)

Befehle 1 und 2 zeigen alle Databanken.  
Befehl 3 wechselt der Kontext zu der "rabe" Datenbank.
Befehl 4 und 5 zeigt alle "Collections". "Collections" sind Gruppen von MongoDB-Dokumenten, ähnlich den Tabellen in relationalen Datenbanken.
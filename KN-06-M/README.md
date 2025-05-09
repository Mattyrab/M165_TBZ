# KN-M-06: JSON Schema und Collection Validierung

## Validierung hinterlegen und testen

Befehle zum Hinzufügen der Rolle, die den Recht auf die Validierung gewährt.
```js
db.getSiblingDB("admin").grantRolesToUser(
  "admin", 
  [{ role: "dbAdmin", db: "rabe" }]
)
```

![successful validation via GUI](<Screenshot 2025-05-09 085953-1.png>)


Diese Script würde verwendet, um die Validierung und Dokumente zu erstellen.

[Validation Script](script.js)

Aufgrund von Probleme, die nicht existieren sollen ([Siehe dies](https://www.mongodb.com/docs/manual/core/schema-validation/specify-json-schema/json-schema-tips/#validation-for-null-field-values)), würde der Validierungen von ArtistID und AlbumID auf der Song Dokument raus gelassen

Die Video unten zeigt, wie ich ein Dokument einfügen kann mit gültige Validierung.
<video controls src="Screen Recording 2025-05-09 091654-1.mp4" title="Title"></video>
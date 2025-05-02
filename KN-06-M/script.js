db.createCollection("artist", {
	validator: {
		$jsonSchema: {
			"bsonType": "object",
			"required": ["name", "artistName", "age"],
			"properties": {
					"_id": {
					"bsonType": "objectId"
					},
					"name": {
					"bsonType": "string",
					"minLength": 2,
					"maxLength": 50
					},
					"artistName": {
					"bsonType": "string",
					"minLength": 2,
					"maxLength": 50
					},
					"age": {
					"bsonType": "int"
					}
			}
		}
	},
	validationLevel: "strict",
	validationAction: "error"
});

db.createCollection("album", {
	validator: {
		$jsonSchema: {
			"bsonType": "object",
			"required": ["name", "releaseDate"],
			"properties": {
					"_id": {
					"bsonType": "objectId"
					},
					"name": {
					"bsonType": "string",
					"minLength": 2,
					"maxLength": 50
					},
					"releaseDate": {
					"bsonType": "date"
					},
					"artistId": {
					"bsonType": "objectId"
					}
			}
		}
	},
	validationLevel: "strict",
	validationAction: "error"
});

db.createCollection("song", {
	validator: {
		$jsonSchema: {
			"bsonType": "object",
			"required": ["name", "releaseDate", "length", "genreId"],
			"properties": {
					"_id": {
					"bsonType": "objectId"
					},
					"name": {
					"bsonType": "string",
					"minLength": 2,
					"maxLength": 50
					},
					"length": {
					"bsonType": "int"
					},
					"releaseDate": {
					"bsonType": "date"
					},
					"genreId": {
					"bsonType": "objectId"
					},
					"artistId": {
					"bsonType": "objectId"
					},
					"albumId": {
					"bsonType": "objectId"
					}
			}
		}
	},
	validationLevel: "strict",
	validationAction: "error"
});

db.createCollection("genre", {
	validator: {
		$jsonSchema: {
			"bsonType": "object",
			"required": ["name", "description"],
			"properties": {
					"_id": {
					"bsonType": "objectId"
					},
					"name": {
					"bsonType": "string",
					"minLength": 2,
					"maxLength": 50
					},
					"description": {
					"bsonType": "string",
					"maxLength": 200
					}
			}
		}
	},
	validationLevel: "strict",
	validationAction: "error"
});
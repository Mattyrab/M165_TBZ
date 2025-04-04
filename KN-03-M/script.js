db = db.getSiblingDB("rabe");

// Drop if it exists
db.artist.drop();
db.genre.drop();

// Insert stuff

printjson("Before inserting collections and data");
printjson(db.getCollectionNames());

db.createCollection("artist");
db.createCollection("genre");

const song1Id = new ObjectId(); 
const song2Id = new ObjectId();
const song3Id = new ObjectId();

const albumId = new ObjectId();

const artistId = new ObjectId();

const genre1Id = new ObjectId();
const genre2Id = new ObjectId();
const genre3Id = new ObjectId();
const genre4Id = new ObjectId();
const genre5Id = new ObjectId();

db.artist.insertOne( 
    {
        _id: artistId,
        name: 'John Song',
        artistName: 'Johnny Sings',
        age: 31,
        album:
        {
            _id: albumId,
            name: 'Johnnys First Hits',
            releaseDate: new ISODate("2011-01-15T17:30:00Z"),
            song: [ 
            {
                _id: song1Id,
                name: 'Flyers gone By',
                releaseDate: new ISODate("2010-05-12T20:00:00Z"),
                length: 264,
                genreId: genre1Id
            },
            {
                _id: song2Id,
                name: 'Sky High',
                releaseDate: new ISODate("2010-07-30T16:45:00Z"),
                length: 316,
                genreId: genre2Id
            }
            ]
        },
        song:
        {
            _id: song3Id,
            name: 'Danger Low',
            releaseDate: new ISODate("2010-03-27T15:38:42Z"),
            length: 235,
            genreId: genre2Id
        }
    }
);

db.genre.insertMany( [
    {
        _id: genre1Id,
        name: 'Rock and Roll',
        description: 'lorum ipsum action'
    },
    {
        _id: genre2Id,
        name: 'Metal',
        description: 'lorum ipsum action'
    },
    {
        _id: genre3Id,
        name: 'Jazz',
        description: 'lorum ipsum funky'
    },
    {
        _id: genre4Id,
        name: 'Country',
        description: 'lorum ipsum country roads'
    },
    {
        _id: genre5Id,
        name: 'Pop',
        description: 'lorum ipsum funky'
    }
]);

// Find stuff

printjson(db.artist.find( { 'song.name': "Sky High"  } ));

var search_date = new ISODate("2010-04-01T00:00:00Z");
printjson(db.artist.find( { $or: [ { releaseDate: { $lt: search_date }  }, { genreId: genre2Id } ] } ));
printjson(db.genre.find( { $and: [ { name: { $exists: true }, $where: "this.name.length > 5" }, { description: { $regex: "action" } } ]  } ));

// Replace stuff

printjson("-----------------------------------------------------");




const first_replace_result = db.artist.replaceOne( { name: "John Song" }, {
    _id: artistId,
    name: 'Joe Beton',
    artistName: 'Concrete Jo',
    age: 27,
    album:
    {
        _id: albumId,
        name: 'Hard Hitters',
        releaseDate: new ISODate("2011-01-15T17:30:00Z"),
        song: [ 
        {
            _id: song1Id,
            name: 'Flyers Begone',
            releaseDate: new ISODate("2010-05-12T20:00:00Z"),
            length: 264,
            genreId: genre1Id
        },
        {
            _id: song2Id,
            name: 'Sky Heights',
            releaseDate: new ISODate("2010-07-30T16:45:00Z"),
            length: 316,
            genreId: genre2Id
        }
        ]
    },
    song:
    {
        _id: song3Id,
        name: 'Danger Level',
        releaseDate: new ISODate("2010-03-27T15:38:42Z"),
        length: 235,
        genreId: genre2Id
    }
} );

printjson(first_replace_result);

printjson(db.artist.updateOne( { _id: song3Id }, { $set: { name: "Danger Town" } } ));
printjson(db.artist.updateMany( { $or: [ { releaseDate: { $lt: search_date }  }, { genreId: genre1Id } ] }, { $set: { gernreId: genre3Id } } ));

// Delete stuff

printjson("After inserting collections and data");
printjson(db.getCollectionNames());

printjson("Artist Collection:");
printjson(db.artist.find());

printjson("Genre Collection:");
printjson(db.genre.find());

db.artist.album.song.deleteOne( { _id: song2Id } );

db.genre.deleteMany( { "_id" : { $eq: [ genre4Id, genre5Id ] } } )

printjson("Artist Collection:");
printjson(db.artist.find());

printjson("Genre Collection:");
printjson(db.genre.find());

printjson("After dropping collections");

// db.artist.drop();
// db.genre.drop();

printjson(db.getCollectionNames());

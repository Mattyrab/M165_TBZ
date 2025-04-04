db = db.getSiblingDB("rabe");

// Drop if it exists
db.artist.drop();
db.genre.drop();
db.song.drop();
db.album.drop();

// Insert stuff

db.createCollection("artist");
db.createCollection("song");
db.createCollection("album");
db.createCollection("genre");

const song1Id = new ObjectId(); 
const song2Id = new ObjectId();
const song3Id = new ObjectId();
const song4Id = new ObjectId();
const song5Id = new ObjectId();

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
    }
);

db.album.insertOne(
    {
    _id: albumId,
    name: 'Johnnys First Hits',
    releaseDate: new ISODate("2011-01-15T17:30:00Z"),
    artistId: artistId
    }
);
    
db.song.insertMany( [
    {
        _id: song1Id,
        name: 'Flyers gone By',
        releaseDate: new ISODate("2010-05-12T20:00:00Z"),
        length: 264,
        genreId: genre1Id,
        albumId: albumId,
        artistId: null
    },
    {
        _id: song2Id,
        name: 'Sky High',
        releaseDate: new ISODate("2010-07-30T16:45:00Z"),
        length: 316,
        genreId: genre2Id,
        albumId: albumId,
        artistId: null
    },
    {
        _id: song3Id,
        name: 'Danger Low',
        releaseDate: new ISODate("2010-03-27T15:38:42Z"),
        length: 235,
        genreId: genre2Id,
        albumId: null,
        artistId: artistId
    }, 
    {
        _id: song4Id,
        name: 'Im Clueless',
        releaseDate: new ISODate("2010-09-02T18:33:17Z"),
        length: 291,
        genreId: genre4Id,
        albumId: null,
        artistId: artistId
    }, 
    {
        _id: song5Id,
        name: 'No Idea',
        releaseDate: new ISODate("2009-12-30T21:55:45Z"),
        length: 333,
        genreId: [genre1Id, genre2Id],
        albumId: null,
        artistId: artistId
    }
]);

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


printjson(db.genre.aggregate([ { $match: { description: "lorum ipsum action" } } ]));


printjson("-------1-------");


printjson(db.genre.aggregate([ { $match: { description: "lorum ipsum action" } }, { $group: { _id: null, count: { $sum: 1 } } } ]));

printjson("-------2-------");

printjson(db.song.aggregate([
    { $match: { genreId: genre2Id } },
    { $project: { 
        _id: 0, 
        name: 1, 
        length: 1, 
        releaseDate: 1
      } 
    },
    { $sort: { releaseDate: 1 } }
  ]));

printjson("-------3-------");

printjson(db.song.aggregate( [
    {
      $lookup:
        {
          from: "genre",
          localField: "name",
          foreignField: "name",
          as: "song genres"
        }
   } ]));

   
printjson("-------4-------");

printjson(db.song.aggregate( [ { $unwind : "$genreID" } ] ));
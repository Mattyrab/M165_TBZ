db = connect( 'mongodb://localhost/rabe' );
db.artist.insertMany( [
    {
        name: 'Bob Marley',
        artistName: 'High Marvin',
        age: 46
    },
    {
        name: 'Elvis Presly',
        artistName: 'Elvis the Pelvis',
        age: 57
    },
    {
        name: 'John Song',
        artistName: 'Johnny Sings',
        age: 31
    }
]);
db.getSiblingDB("rabe").runCommand( {
    createUser: "firstUser",
    pwd: "WelcomeUser1",
    roles: [
             "read"
           ]
} );

db.getSiblingDB("admin").runCommand( {
    createUser: "secondUser",
    pwd: "Welcomeuser2",
    roles: [
            { role: "readWrite", db: "rabe"},
             "readWrite"
           ]
} );

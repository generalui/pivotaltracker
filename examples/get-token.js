/**
    To run from command line:

    node get-token username password

    https://www.pivotaltracker.com/help/api/rest/v5#Me
*/
var tracker  = require("../index.js"),
    username = process.argv[2],
    password = process.argv[3],

tracker.getToken(username, password, function(err, token) {

    if(err){
        console.error("Could not retrieve token");
        console.log(err);
    }
    else {
        console.log("Token: ", token);
    }
});

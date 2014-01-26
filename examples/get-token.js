/**
    To run from command line:

    node get-token username password
*/
var tracker  = require("../index.js"),
    username = process.argv[2] || '{fake_token}',
    password = process.argv[3] || '{fake_password}';

tracker.getToken(username, password, function(err, token) {

    if(err){
        console.error("Could not retrieve token");
        console.log(err);
    }
    else {
        console.log("Token: ", token);
    }
});

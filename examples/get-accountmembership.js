/**
    To run from command line:

    node get-accountmmebership username password accountId personId

    https://www.pivotaltracker.com/help/api/rest/v5#Account_Memberships
*/
var tracker  = require("../index.js"),
    username = process.argv[2],
    password = process.argv[3],
    accountId = process.argv[4],
    personId = process.argv[5];

tracker.getToken(username, password, function(err, token) {

    if(err){
        console.error("Could not retrieve token");
        console.log(err);
    }
    else {
        var client = new tracker.Client({trackerToken:token});
        
        if (personId) {
        
            client.account(accountId).membership(personId).all(function(error, membership) {
            
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(membership);
                }
            });
        }
        else {
        
            client.account(accountId).memberships.all(function(error, memberships) {
            
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(memberships);
                }
            });
        }
    }
});
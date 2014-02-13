/**
    To run from command line:

    node get-account username password accountId

    https://www.pivotaltracker.com/help/api/rest/v5#Accounts
*/
var tracker  = require("../index.js"),
    username = process.argv[2],
    password = process.argv[3],
    accountId = process.argv[4];

tracker.getToken(username, password, function(err, token) {

    if(err){
        console.error("Could not retrieve token");
        console.log(err);
    }
    else {
    
        var client = new tracker.Client({trackerToken:token});
        
        if (accountId) {  
                  
            client.account(accountId).get(function(error, account) {
            
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(account);
                }
            });
        }
        else {
                  
            client.accounts.all(function(error, accounts) {
            
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(accounts);
                }
            });
        }
    }
});
/**
    To run from command line:

    node search-project username password projectId searchTerm

    https://www.pivotaltracker.com/help/api/rest/v5#Search
*/
var tracker  = require("../index.js"),
    username = process.argv[2],
    password = process.argv[3],
    projectId = process.argv[4],
    searchTerm = process.argv[5];

tracker.getToken(username, password, function(err, token) {

    if(err) {
        console.error("Could not retrieve token");
        console.log(err);
    }
    else {
        var client = new tracker.Client({trackerToken:token});
        
        client.project(projectId).search(searchTerm, function(error, results) {

            if (error) {
                console.log(error);
            }
            else {
                console.log(results);
            }
        });
    }
});
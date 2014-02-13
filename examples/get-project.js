/**
    To run from command line:

    node get-project username password projectId

    https://www.pivotaltracker.com/help/api/rest/v5#Project
 */
var tracker  = require("../index.js"),
    username = process.argv[2],
    password = process.argv[3],
    projectId = process.argv[4];

tracker.getToken(username, password, function(err, token) {

    if (err) {
        console.log(err);
    }
    else {
        var client = new tracker.Client({trackerToken:token});
        
        client.project(projectId).get(function(error, project) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(project);
            }
        });
    }
});
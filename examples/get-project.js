/**
    To run from command line:

    node get-project username password projectId
*/
var tracker  = require("../index.js"),
    username = process.argv[2] || 'fake_user',
    password = process.argv[3] || 'fake_password',
    projectId = process.argv[4] || 12345;

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
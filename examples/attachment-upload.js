/**
    To run from command line:

    node atttachment-upload username password projectId

    https://www.pivotaltracker.com/help/api/rest/v5#File_Attachments
*/
var tracker  = require("../index.js"),
    username = process.argv[2],
    password = process.argv[3],
    projectId = process.argv[4],
    filepath = process.argv[5];

tracker.getToken(username, password, function(err, token) {

    if (err) {
        console.error("Could not retrieve token");
        console.log(err);
    }
    else {
        var client = new tracker.Client({trackerToken:token});
        
        client.project(projectId).uploads.create(filepath, function(error, attachment) {
        
            if (error) {
                console.log(error);
            }
            else {
                console.log(attachment);
            }
        });
    }
});
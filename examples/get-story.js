/**
    To run from command line:

    node get-story username password projectId storyId
*/
var tracker  = require("../index.js"),
    username = process.argv[2] || 'fake_user',
    password = process.argv[3] || 'fake_password',
    projectId = process.argv[4] || 12345
    storyId = process.argv[5] || 67890;
    var util = require('util')

tracker.getToken(username, password, function(err, token) {

    if(err){
        console.error("Could not retrieve token");
        console.log(err);
    }
    else {
        var client = new tracker.Client({trackerToken:token});
        
        client.project(projectId).story(storyId).get(function(error, story) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(story);
            }
        });
    }
});
/**
 To run from command line:

 node create-comment username password storyId

 https://www.pivotaltracker.com/help/api/rest/v5#Comment
 */
var tracker  = require("../index.js"),
    username = process.argv[2],
    password = process.argv[3],
    projectId = process.argv[4],
    storyId = process.argv[5];

var COMMENT_PERSON_ID = process.argv[6] || 123;

tracker.getToken(username, password, function(err, token) {

    if(err){
        console.error("Could not retrieve token");
        console.log(err);
    }
    else {
        var client = new tracker.Client({trackerToken:token});

        var comment = {
            personId: COMMENT_PERSON_ID,
            text: 'testing, 1-2-3...'
        };
        
        client.project(projectId).story(storyId).comments.create(comment, function(error, comment) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(comment);
            }
        });
    }
});
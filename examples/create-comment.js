
var tracker  = require("../index.js"),
    username = process.argv[2],
    password = process.argv[3],
    projectId = process.argv[4],
    storyId = process.argv[5];

tracker.getToken(username, password, function(err, token) {

    if(err){
        console.error("Could not retrieve token");
        console.log(err);
    }
    else {
        var client = new tracker.Client({trackerToken:token});

        var comment = {
            personId: 703101,
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
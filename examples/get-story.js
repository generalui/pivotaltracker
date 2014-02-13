/**
    To run from command line:

    node get-story username password projectId storyId

    https://www.pivotaltracker.com/help/api/rest/v5#Story
*/
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

        if (storyId) {

            client.project(projectId).story(storyId).get(function(error, story) {

                if (error) {
                    console.log(error);
                }
                else {
                    console.log(story);
                }
            });
        }
        else {

            client.project(projectId).stories.all(function(error, stories) {

                if (error) {
                    console.log(error);
                }
                else {
                    console.log(stories);
                }
            });
        }
    }
});
/**
    To run from command line:

    node create-story username password projectId

    https://www.pivotaltracker.com/help/api/rest/v5#Story
 */
var tracker  = require("../index.js"),
    username = process.argv[2],
    password = process.argv[3],
    projectId = process.argv[4];

var REQUESTED_BY_ID = 123;
var OWNER_ID = 456;

tracker.getToken(username, password, function(err, token) {

    if(err){
        console.error("Could not retrieve token");
        console.log(err);
    }
    else {
        var client = new tracker.Client({trackerToken:token});

        var data = {
            name: 'hay guyz, this is a test',
            description: 'super cool description',
            storyType: 'feature',
            currentState: 'started',
            estimate: 2,
            requestedById: REQUESTED_BY_ID,
            comments: [{
                personId: REQUESTED_BY_ID,
                text: 'whoa, auto new story comment!'
            }],
            tasks: [{
                description: 'wow, auto new story task!!'
            }],
            ownerIds: [OWNER_ID]
        };

        client.project(projectId).stories.create(data, function(error, story) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(story);
            }
        });
    }
});

var tracker  = require("../index.js"),
    username = process.argv[2],
    password = process.argv[3],
    projectId = process.argv[4];

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
            requestedById: 703101,
            //ownedById: 703101,
            comments: [{
                personId: 703101,
                text: 'whoa, auto new story comment!'
            }],
            tasks: [{
                description: 'wow, auto new story task!!'
            }],
            ownerIds: [703101]
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
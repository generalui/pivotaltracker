/**
 To run from command line:

 node create-epic username password epicId

 https://www.pivotaltracker.com/help/api/rest/v5#Epic
 */
var tracker  = require("../index.js"),
    username = process.argv[2],
    password = process.argv[3],
    projectId = process.argv[4];

var COMMENT_PERSON_ID = process.argv[5] || 123;

tracker.getToken(username, password, function(err, token) {

    if(err){
        console.error("Could not retrieve token");
        console.log(err);
    }
    else {
        var client = new tracker.Client({trackerToken:token});

        var data = {
            name: 'hay guyz, this is an epic test',
            description: 'super cool epic description',
            comments: [{
                personId: COMMENT_PERSON_ID,
                text: 'whoa, auto new epic comment!'
            }]
        };

        client.project(projectId).epics.create(data, function(error, epic) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(epic);
            }
        });
    }
});
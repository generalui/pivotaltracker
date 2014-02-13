/**
    To run from command line:

    node get-task username password projectId

    https://www.pivotaltracker.com/help/api/rest/v5#Story_Tasks
*/
var tracker  = require("../index.js"),
    username = process.argv[2],
    password = process.argv[3],
    projectId = process.argv[4],
    storyId = process.argv[5],
    taskId = process.argv[6];

tracker.getToken(username, password, function(err, token) {

    if(err) {

        console.error("Could not retrieve token");
        console.log(err);
    }
    else {
        var client = new tracker.Client({ trackerToken:token });

        if (taskId) {

            client.project(projectId).story(storyId).get(function(error, task) {

                if (error) {
                    console.log(error);
                }
                else {
                    console.log(task);
                }
            });
        }
        else {

            client.project(projectId).story(storyId).all(function(error, tasks) {

                if (error) {
                    console.log(error);
                }
                else {
                    console.log(tasks);
                }
            });
        }
    }
});
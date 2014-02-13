/**
    To run from command line:

    node get-projectmembership username password project [personId]

    https://www.pivotaltracker.com/help/api/rest/v5#Project_Memberships
 */
var tracker  = require("../index.js"),
    username = process.argv[2],
    password = process.argv[3],
    projectId = process.argv[4],
    membershipId = process.argv[5];

tracker.getToken(username, password, function(err, token) {

    if(err){
        console.error("Could not retrieve token");
        console.log(err);
    }
    else {
        var client = new tracker.Client({trackerToken:token});

        if (membershipId) {

            client.project(projectId).membership(membershipId).get(function(error, membership) {

                if (error) {
                    console.log(error);
                }
                else {
                    console.log(membership);
                }
            });
        }
        else {

            client.project(projectId).memberships.all(function(error, memberships) {

                if (error) {
                    console.log(error);
                }
                else {
                    console.log(memberships);
                }
            });
        }
    }
});
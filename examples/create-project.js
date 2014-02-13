/**
 To run from command line:

 node create-project username password

 https://www.pivotaltracker.com/help/api/rest/v5#Project
 */
var tracker  = require("../index.js"),
    username = process.argv[2],
    password = process.argv[3];

tracker.getToken(username, password, function(err, token) {

    if(err){
        console.error("Could not retrieve token");
        console.log(err);
    }
    else {
        var client = new tracker.Client({trackerToken:token});

        var data = {
            name: 'testy-test 17',
            atomEnabled: true,
            enablePlannedMode: true,
            weekStartDay: 'Wednesday',
            profileContent: 'wowzas--profile content',
            description: 'oh yeahs...the description',
            pointScale: '2,4,6,8,20',
            initialVelocity: 500,
            enableTasks: false,
            startDate: '2014-01-01',
            bugsAndChoresAreEstimatable: true,
            timeZone: {
                offset: '-08:00'
            },
            public: false,
            enableIncomingEmails: false,
            numberOfDoneIterationsToShow: 50,
            iterationLength: 2,
            velocityAveragedOver: 2
        };

        client.projects.create(data, function(error, project) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(project);
            }
        });
    }
});
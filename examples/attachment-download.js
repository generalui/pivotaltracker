/**
 To run from command line:

 node atttachment-download username password attachmentId

 https://www.pivotaltracker.com/help/api/rest/v5#File_Attachments
 */
var tracker  = require("../index.js"),
    username = process.argv[2],
    password = process.argv[3],
    attachmentId = process.argv[4];

tracker.getToken(username, password, function(err, token) {

    if (err) {
        console.error("Could not retrieve token");
        console.log(err);
    }
    else {

        var client = new tracker.Client({trackerToken:token});
        var path = require('path');
        var filepath = path.resolve(__dirname, './test-file.pdf');

        client.attachment(attachmentId).download(filepath, function(error) {

            if (error) {
                console.log(error);
            }
            else {
                console.log('Download complete!');
            }
        });
    }
});

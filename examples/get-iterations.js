/**
    To run from command line:

    node get-iterations username password projectId [iterationId [query]]

    ex. 1. All Iterations
      $ node get-iterations 'user' 'password' 12345

    ex. 2. Single Iteration
      $ node get-iterations 'user' 'password' 12345 3

    ex. 3. Single Iteration with Query (to append query string params to api call)
      $ node get-iterations 'user' 'password' 12345 3 '{"fields":"kind"}'

    https://www.pivotaltracker.com/help/api/rest/v5#Iterations
    https://www.pivotaltracker.com/help/api/rest/v5#projects_project_id_iteration_get
 */
var tracker  = require("../index.js"),
  username = process.argv[2],
  password = process.argv[3],
  projectId = process.argv[4],
  iterationId = process.argv[5],
  query = process.argv[6];

tracker.getToken(username, password, function(err, token) {

  if(err){
    console.error("Could not retrieve token");
    console.log(err);
  }
  else {
    var client = new tracker.Client({trackerToken:token});
    var projectSubQuery = client.project(projectId);

    if (iterationId) {
      if (!query) {
          query = {};
      }
      else if ('string' === typeof(query)) {
          query = JSON.parse(query);
      }

      projectSubQuery.iteration(iterationId).get(query, function(error, iteration) {
        if (error) {
          console.log(error);
        }
        else {
          console.log(iteration);
        }
      });
    }
    else {
      projectSubQuery.iterations.all(function(error, iterations) {
        if (error) {
          console.log(error);
        }
        else {
          console.log(iterations);
        }
      });
    }
  }
});
var nodeunit = require('nodeunit'),
    utils = require('../../lib/resources/utils');

exports.test_search = function(test) {
    test.expect(2);

    var actualPathSegments,
        actualQuery,
        apiCall = function (method, token, pathSegments, query, data, opts, cb) {
            actualPathSegments = pathSegments;
            actualQuery = query;
        };

    utils.tests_.stubApiCall(apiCall);
    utils.api.search("TestToken",
      ["services", "v5", "projects", "101"],
      "fred",
      { },
      function () { });

    test.equal("search", actualPathSegments[actualPathSegments.length - 1], "Path should end in 'search'");
    test.equal("fred", actualQuery.query, "URL query sement should have search string");

    utils.tests_.restoreApiCall();
	test.done();
};

var nodeunit = require('nodeunit'),
    utils = require('./utils'),
    tracker = require('../../lib/tracker'),
    project = require('../../lib/resources/project');

var constructors = {
    "tracker.Client": {
        fn: tracker.Client,
        args: []
    }
};

exports.test_useToken = function(test) {
    test.expect(2);
    
    var origToken = 'mahtokenz';
    var client = new tracker.Client({trackerToken: origToken});
	test.equal(origToken, client.config.trackerToken, 'Constructor should set config.trackerToken to '+origToken);
	
	var newToken = 'new tokenz!';
	client.useToken(newToken);
	test.equal(newToken, client.config.trackerToken, 'useToken(newToken) should set config.trackerToken to '+newToken);
	
	test.done();
};

exports.test_configChain = function(test) {
    test.expect(26);
    
    var origToken = 'mahtokenz';
    var client = new tracker.Client({trackerToken: origToken});
	test.equal(origToken, client.config.trackerToken, 'Constructor should set config.trackerToken to '+origToken);
	
	var newToken = 'new tokenz!';
	client.useToken(newToken);
	test.equal(newToken, client.config.trackerToken, 'useToken(newToken) should set config.trackerToken to '+newToken);
	
	var project = client.project(123);
	var story = project.story(567);
	var task = story.task(456);
	var label = story.label(890);
	var comment = story.comment(122);
	
	test.equal(newToken, project.config.trackerToken, 'client -> project token chaining should set project.config.trackerToken to '+newToken);
	test.equal(newToken, story.config.trackerToken, 'project -> story token chaining should set project.config.trackerToken to '+newToken);
	test.equal(newToken, task.config.trackerToken, 'story -> task token chaining should set project.config.trackerToken to '+newToken);
	test.equal(newToken, label.config.trackerToken, 'story -> label token chaining should set project.config.trackerToken to '+newToken);
	test.equal(newToken, comment.config.trackerToken, 'story -> comment token chaining should set project.config.trackerToken to '+newToken);
	
	var projects = client.projects;
	var stories = projects.stories;
	var tasks = stories.tasks;
	var labels = stories.labels;
	var comments = stories.comments;
	
	test.equal(newToken, projects.config.trackerToken, 'client -> projects token chaining should set project.config.trackerToken to '+newToken);
	test.equal(newToken, stories.config.trackerToken, 'projects -> stories token chaining should set project.config.trackerToken to '+newToken);
	test.equal(newToken, tasks.config.trackerToken, 'stories -> tasks token chaining should set project.config.trackerToken to '+newToken);
	test.equal(newToken, labels.config.trackerToken, 'stories -> labels token chaining should set project.config.trackerToken to '+newToken);
	test.equal(newToken, comments.config.trackerToken, 'stories -> comments token chaining should set project.config.trackerToken to '+newToken);
	
	var newNewToken = 'new NEW token!';
	client.useToken(newNewToken);
	
	test.equal(newNewToken, project.config.trackerToken, 'client -> project token chaining should auto-update token to '+newNewToken);
	test.equal(newNewToken, story.config.trackerToken, 'project -> story token chaining should auto-update token to '+newNewToken);
	test.equal(newNewToken, task.config.trackerToken, 'story -> task token chaining should auto-update token to '+newNewToken);
	test.equal(newNewToken, label.config.trackerToken, 'story -> label token chaining should auto-update token to '+newNewToken);
	test.equal(newNewToken, comment.config.trackerToken, 'story -> comment token chaining should auto-update token to '+newNewToken);
	
	test.equal(newNewToken, projects.config.trackerToken, 'client -> projects token chaining should auto-update token to '+newNewToken);
	test.equal(newNewToken, stories.config.trackerToken, 'projects -> stories token chaining should auto-update token to '+newNewToken);
	test.equal(newNewToken, tasks.config.trackerToken, 'stories -> tasks token chaining should set auto-update token to '+newNewToken);
	test.equal(newNewToken, labels.config.trackerToken, 'stories -> labels token chaining should auto-update token to '+newNewToken);
	test.equal(newNewToken, comments.config.trackerToken, 'stories -> comments token chaining should auto-update token to '+newNewToken);
	
	test.equal(123, client.project(123).story(456).projectId, 'stories -> project identifier should match');
	test.equal(null, client.project(undefined).story(456).projectId, 'stories -> project identifier should match');
	test.equal('projects/123/stories/456', client.project(123).story(456).pathSegments().join('/'), 'stories -> path segments should match');
	test.equal('stories/456', client.project(undefined).story(456).pathSegments().join('/'), 'stories -> path segments should match');

	test.done();
};
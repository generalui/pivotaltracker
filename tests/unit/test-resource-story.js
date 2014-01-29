var nodeunit = require('nodeunit'),
    utils = require('./utils'),
    story = require('../lib/resources/story');

/* Test constructor fns */
var constructors = {
    "story.Story": {
        fn: story.Story,
        args: [
            {
                kind: 'story',
                id: 54322,
                externalId: 32452542424,
                projectId: 77888,
                name: 'flawless',
                description: 'i woke up like dis',
                url: 'http://beyonce.com',
                createdAt: new Date(0),
                updatedAt: new Date(700000),
                storyType: 'secret album',
                currentState: 'released',
                deadline: new Date(),
                estimate: 45000.45,
                acceptedAt: new Date(4040404040404040404040404040),
                deadline: new Date(1),
                plannedIterationNumber: 2014,
                integrationId: 1,
                integration: {wake:'up',flawless:'flawless'},
                requestedById: 2,
                requestedBy: {post:'up',flawless:'flawless'},
                ownedById: 3,
                ownedBy: {ridinround:'indat',flawless:'flawless'},
                labelIds: [0],
                labels: [{}],
                commentIds: [3,4,5,6,7],
                comments: [{},{},{},{},{}],
                ownerIds: [3,4,5,6],
                owners: [{hip:'hop'},{hooray:'ho'},{hey:'ho'},{hey:'ho'}],
                taskIds: [5,4,3,2,1],
                tasks: [{a:1},{b:2},{c:3},{d:4},{f:5}]
            }
        ]
    },
    "story.Service": {
        fn: story.Service,
        args: []
    }
};
for (var key in constructors) {
    if (constructors.hasOwnProperty(key)) {
    	module.exports['test_'+key] = new utils.ConstructorTest(key,constructors[key]);
    }
}

/* Test primitive property setters & getters */
var testData = [
	{
		propertyName: 'kind',
		happyTestValue: 'story'
	},
	{
		propertyName: 'id',
		happyTestValue: 62234234
	},
	{
		propertyName: 'externalId',
		happyTestValue: 24324
	},
	{
		propertyName: 'projectId',
		happyTestValue: 56756765
	},
	{
		propertyName: 'name',
		happyTestValue: 'mah name'
	},
	{
		propertyName: 'description',
		happyTestValue: 'mah desc'
	},
	{
		propertyName: 'url',
		happyTestValue: 'http://hayguyzhay.com'
	},
	{
		propertyName: 'storyType',
		happyTestValue: 'mah type'
	},
	{
		propertyName: 'currentState',
		happyTestValue: 'rejected'
	},
	{
		propertyName: 'plannedIterationNumber',
		happyTestValue: 77
	},
	{
		propertyName: 'estimate',
		happyTestValue: 3
	},
	{
		propertyName: 'integrationId',
		happyTestValue: 5
	},
	{
		propertyName: 'requestedById',
		happyTestValue: 234
	},
	{
		propertyName: 'ownedById',
		happyTestValue: 345
	}
];
for (var i=0;i<testData.length;i++) {
	module.exports['test_'+testData[i].propertyName] = 
		utils.standardPropertyTestFunction(story.Story,testData[i].propertyName,testData[i].happyTestValue);
}

/* Testing Date inputs */
var dateTestProperties = [
	'createdAt',
	'updatedAt',
	'acceptedAt',
	'deadline'
];
var dateObj = new Date();
var dateStr = '2000-01-01 00:00';
for (var i=0; i < dateTestProperties.length; i++) {

	module.exports['test_'+dateTestProperties[i]] = 
		utils.standardDatePropertyTestFunction(story.Story,dateTestProperties[i],dateObj);
		
	module.exports['test_'+dateTestProperties[i]] = 
		utils.standardDatePropertyTestFunction(story.Story,dateTestProperties[i],dateStr);
}

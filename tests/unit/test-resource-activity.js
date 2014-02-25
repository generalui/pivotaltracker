var nodeunit = require('nodeunit'),
    utils = require('./utils'),
    Project = require('../../lib/resources/project').Project,
    Person = require('../../lib/resources/person').Person,
    activity = require('../../lib/resources/activity');

/* Test constructor fns */
var constructors = {
    "activity.Activity": {
        fn: activity.Activity,
        args: [
            {
                kind: 'activity',
                guid: '5-4-3-2-1',
                projectId: 343443,
                project: new Project({
                    name: 'what up tho'
                }),
                projectVersion: 34,
                message: 'hay guyz!',
                highlight: 'hay guyz!',
                occurredAt: new Date(),
                performedById: 3434,
                performedBy: new Person({
                    name: 'hip hop hooray'
                }),
                primaryResources: [{bud:'bud'},{weis:'weis'},{er:'er'}],
                changes: [{gone:'come'}]
            }
        ]
    },
    "activity.Service": {
        fn: activity.Service,
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
		happyTestValue: 'activity'
	},
	{
		propertyName: 'guid',
		happyTestValue: '1-2-3-4-5'
	},
	{
		propertyName: 'projectId',
		happyTestValue: 54321
	},
	{
		propertyName: 'projectVersion',
		happyTestValue: 8
	},
	{
		propertyName: 'highlight',
		happyTestValue: 'Blarbbity blargh'
	},
	{
		propertyName: 'message',
		happyTestValue: 'hay guyz!'
	},
	{
		propertyName: 'performedById',
		happyTestValue: 12345
	}
];
for (var i=0;i<testData.length;i++) {
	module.exports['test_'+testData[i].propertyName] = 
		utils.standardPropertyTestFunction(activity.Activity,testData[i].propertyName,testData[i].happyTestValue);
}

/* Testing Date inputs */
var dateTestProperties = [
	'occurredAt'
];
var dateObj = new Date();
var dateStr = '2000-01-01 00:00';
for (var i=0; i < dateTestProperties.length; i++) {

	module.exports['test_'+dateTestProperties[i]] = 
		utils.standardDatePropertyTestFunction(activity.Activity,dateTestProperties[i],dateObj);
		
	module.exports['test_'+dateTestProperties[i]] = 
		utils.standardDatePropertyTestFunction(activity.Activity,dateTestProperties[i],dateStr);
}

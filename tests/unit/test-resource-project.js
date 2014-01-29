var nodeunit = require('nodeunit'),
    utils = require('./utils'),
    project = require('../lib/resources/project')
    ptutil = require('../lib/resources/utils');

/* Test constructor fns */
var constructors = {
    "project.Project": {
        fn: project.Project,
        args: [
            {
                kind: 'project',
                id: 54322,
                accountId: 32452542424,
                name: 'ACME Development',
                description: 'What\'s up doc?',
                startDate: new Date(2929292),
                createdAt: new Date(7777777),
                updatedAt: new Date(0),
                startTime: new Date(),
                profileContent: 'the what now?',
                initialVelocity: 4000,
                version: 42,
                weekStartDay: 'Friday',
                currentVelocity: 3,
                currentIterationNumber: 7,
                pointScale: '1,2,4,8,16,32',
                iterationLength: 1,
                velocityAveragedOver: 4,
                numberOfDoneIterationsToShow: 800,
                public: false,
                enableTasks: true,
                pointScaleIsCustom: false,
                enableIncomingEmails: true,
                atomEnabled: 0,
                showIterationsStartTime: 1,
                bugsAndChoresAreEstimatable: 0,
                enablePlannedMode: 1,
                hasGoogleDomain: false,
                timeZone: {so:'messy'},
                integrationIds: [33,44,55],
                integrations: [{whats:'is'},{your:'major'},{malfunction:'?'}],
                iterationOverrideNumbers: [88,99],
                iterationOverrides: [{im:'just'},{a:'bill'}],
                membershipIds: [12121,324232],
                memberships: [{golden:'time'},{of:'day'}],
                epicIds: [23223, 323],
                epics: [{dothe:'hokeypokey'},{turnyourself:'around'}],
                storyIds: [775, 3434],
                stories: [{eye:'of'},{the:'tiger'}]
            }
        ]
    },
    "project.Service": {
        fn: project.Service,
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
		happyTestValue: 'project'
	},
	{
		propertyName: 'id',
		happyTestValue: 62234234
	},
	{
		propertyName: 'accountId',
		happyTestValue: 24324
	},
	{
		propertyName: 'name',
		happyTestValue: 'mah name'
	},
	{
		propertyName: 'profileContent',
		happyTestValue: 'mah profile content'
	},
	{
		propertyName: 'description',
		happyTestValue: 'mah description'
	},
	{
		propertyName: 'initialVelocity',
		happyTestValue: 3
	},
	{
		propertyName: 'version',
		happyTestValue: 17
	},
	{
		propertyName: 'weekStartDay',
		happyTestValue: 'mah week start day'
	},
	{
		propertyName: 'currentVelocity',
		happyTestValue: 9000
	},
	{
		propertyName: 'currentIterationNumber',
		happyTestValue: 40
	},
	{
		propertyName: 'iterationLength',
		happyTestValue: 2
	},
	{
		propertyName: 'velocityAveragedOver',
		happyTestValue: 2
	},
	{
		propertyName: 'numberOfDoneIterationsToShow',
		happyTestValue: 10
	},
	{
		propertyName: 'public',
		happyTestValue: false
	},
	{
		propertyName: 'enableTasks',
		happyTestValue: false
	},
	{
		propertyName: 'pointScaleIsCustom',
		happyTestValue: false
	},
	{
		propertyName: 'enableIncomingEmails',
		happyTestValue: false
	},
	{
		propertyName: 'atomEnabled',
		happyTestValue: false
	},
	{
		propertyName: 'showIterationsStartTime',
		happyTestValue: false
	},
	{
		propertyName: 'bugsAndChoresAreEstimatable',
		happyTestValue: false
	},
	{
		propertyName: 'enablePlannedMode',
		happyTestValue: false
	},
	{
		propertyName: 'hasGoogleDomain',
		happyTestValue: false
	}
];
for (var i=0;i<testData.length;i++) {
	module.exports['test_'+testData[i].propertyName] = 
		utils.standardPropertyTestFunction(project.Project,testData[i].propertyName,testData[i].happyTestValue);
}

/* Testing Date inputs */
var dateTestProperties = [
	'createdAt',
	'updatedAt',
	'startTime',
	'startDate'
];
var dateObj = new Date();
var dateStr = '2000-01-01 00:00';
for (var i=0; i < dateTestProperties.length; i++) {

	module.exports['test_'+dateTestProperties[i]] = 
		utils.standardDatePropertyTestFunction(project.Project,dateTestProperties[i],dateObj);
		
	module.exports['test_'+dateTestProperties[i]] = 
		utils.standardDatePropertyTestFunction(project.Project,dateTestProperties[i],dateStr);
}

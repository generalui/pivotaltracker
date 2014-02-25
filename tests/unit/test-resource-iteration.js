var nodeunit = require('nodeunit'),
    utils = require('./utils'),
    iteration = require('../../lib/resources/iteration');
        
/* Test constructor fns */
var constructors = {
    "iteration.Iteration": {
        fn: iteration.Iteration,
        args: [
            {
                kind: 'iteration',
                projectId: 54322,
                teamStrength: 1.0,
                length: 200000,
                planned: false,
                storyIds: [555,777],
                stories: [{once:'upon',a:'time'}],
                start: new Date(0),
                finish: new Date()
            }
        ]
    },
    "iteration.Service": {
        fn: iteration.Service,
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
		happyTestValue: 'iteration'
	},
	{
		propertyName: 'number',
		happyTestValue: 62
	},
	{
		propertyName: 'projectId',
		happyTestValue: 3232323
	},
	{
		propertyName: 'teamStrength',
		happyTestValue: 134
	},
	{
		propertyName: 'length',
		happyTestValue: 3
	},
	{
		propertyName: 'planned',
		happyTestValue: false
	}
];
for (var i=0;i<testData.length;i++) {
	module.exports['test_'+testData[i].propertyName] = 
		utils.standardPropertyTestFunction(iteration.Iteration,testData[i].propertyName,testData[i].happyTestValue);
}

/* Testing Date inputs */
var dateTestProperties = [
	'start',
	'finish'
];
var dateObj = new Date();
var dateStr = '2000-01-01 00:00';
for (var i=0; i < dateTestProperties.length; i++) {

	module.exports['test_'+dateTestProperties[i]] = 
		utils.standardDatePropertyTestFunction(iteration.Iteration,dateTestProperties[i],dateObj);
		
	module.exports['test_'+dateTestProperties[i]] = 
		utils.standardDatePropertyTestFunction(iteration.Iteration,dateTestProperties[i],dateStr);
}

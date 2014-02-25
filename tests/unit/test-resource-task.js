var nodeunit = require('nodeunit'),
    utils = require('./utils'),
    task = require('../../lib/resources/task');

/* Test constructor fns */
var constructors = {
    "task.Task": {
        fn: task.Task,
        args: [
            {
                kind: 'task',
                id: 54322,
                storyId: 32452542424,
                position: 110,
                description: 'publish the module to npm',
                complete: true,
                createdAt: new Date(0),
                updatedAt: new Date(7000)
            }
        ]
    },
    "task.Service": {
        fn: task.Service,
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
		happyTestValue: 'task'
	},
	{
		propertyName: 'id',
		happyTestValue: 62234234
	},
	{
		propertyName: 'storyId',
		happyTestValue: 62234234
	},
	{
		propertyName: 'description',
		happyTestValue: 'wheeeeee!'
	}
];
for (var i=0;i<testData.length;i++) {
	module.exports['test_'+testData[i].propertyName] = 
		utils.standardPropertyTestFunction(task.Task,testData[i].propertyName,testData[i].happyTestValue);
}

/* Testing Date inputs */
var dateTestProperties = [
	'createdAt',
	'updatedAt',
];
var dateObj = new Date();
var dateStr = '2000-01-01 00:00';
for (var i=0; i < dateTestProperties.length; i++) {

	module.exports['test_'+dateTestProperties[i]] = 
		utils.standardDatePropertyTestFunction(task.Task,dateTestProperties[i],dateObj);
		
	module.exports['test_'+dateTestProperties[i]] = 
		utils.standardDatePropertyTestFunction(task.Task,dateTestProperties[i],dateStr);
}

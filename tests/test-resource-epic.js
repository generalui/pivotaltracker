var nodeunit = require('nodeunit'),
    utils = require('./utils'),
    epic = require('../lib/resources/epic');

/* Test constructor fns */
var constructors = {
    "epic.Epic": {
        fn: epic.Epic,
        args: [
            {
                kind: 'epic',
                id: 54322,
                projectId: 32322,
                beforeId: 98978,
                afterId: 54646,
                name: 'the dog',
                url: 'http://thestars.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                labelId: 78768,
                label: {the:'folder'},
                commentIds: [7,6,4],
                comments: [{what:'what'},{the:'the'},{frick:'frick'}]
            }
        ]
    },
    "epic.Service": {
        fn: epic.Service,
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
		happyTestValue: 'epic'
	},
	{
		propertyName: 'id',
		happyTestValue: 67890
	},
	{
		propertyName: 'projectId',
		happyTestValue: 3232323
	},
	{
		propertyName: 'beforeId',
		happyTestValue: 568688768
	},
	{
		propertyName: 'afterId',
		happyTestValue: 54321
	},
	{
		propertyName: 'labelId',
		happyTestValue: 88
	},
	{
		propertyName: 'name',
		happyTestValue: 'Itz mah text!'
	},
	{
		propertyName: 'url',
		happyTestValue: 'http://www.hey.com/yass'
	}
];
for (var i=0;i<testData.length;i++) {
	module.exports['test_'+testData[i].propertyName] = 
		utils.standardPropertyTestFunction(epic.Epic,testData[i].propertyName,testData[i].happyTestValue);
}

/* Testing Date inputs */
var dateTestProperties = [
	'createdAt',
	'updatedAt'
];
var dateObj = new Date();
var dateStr = '2000-01-01 00:00';
for (var i=0; i < dateTestProperties.length; i++) {

	module.exports['test_'+dateTestProperties[i]] = 
		utils.standardDatePropertyTestFunction(epic.Epic,dateTestProperties[i],dateObj);
		
	module.exports['test_'+dateTestProperties[i]] = 
		utils.standardDatePropertyTestFunction(epic.Epic,dateTestProperties[i],dateStr);
}

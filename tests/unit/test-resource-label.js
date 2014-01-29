var nodeunit = require('nodeunit'),
    utils = require('./utils'),
    label = require('../lib/resources/label');

/* Test constructor fns */
var constructors = {
    "label.Label": {
        fn: label.Label,
        args: [
            {
                kind: 'label',
                id: 54322,
                projectId: 32452542424,
                name: 'spongebob',
                createdAt: new Date(0),
                updatedAt: new Date()
            }
        ]
    },
    "label.Service": {
        fn: label.Service,
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
		happyTestValue: 'label'
	},
	{
		propertyName: 'id',
		happyTestValue: 62234234
	},
	{
		propertyName: 'projectId',
		happyTestValue: 24324
	},
	{
		propertyName: 'name',
		happyTestValue: 'hay_guyz_labelzz'
	}
];
for (var i=0;i<testData.length;i++) {
	module.exports['test_'+testData[i].propertyName] = 
		utils.standardPropertyTestFunction(label.Label,testData[i].propertyName,testData[i].happyTestValue);
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
		utils.standardDatePropertyTestFunction(label.Label,dateTestProperties[i],dateObj);
		
	module.exports['test_'+dateTestProperties[i]] = 
		utils.standardDatePropertyTestFunction(label.Label,dateTestProperties[i],dateStr);
}

var nodeunit = require('nodeunit'),
    utils = require('./utils'),
    account = require('../../lib/resources/account');

/* Test constructor fns */
var constructors = {
    "account.Account": {
        fn: account.Account,
        args: [
            {
                kind : 'account',
                id : 54321,
                name : 'ze name',
                plan : 'ze plan',
                overTheLimit : false,
                createdAt : new Date(),
                updatedAt : new Date(),
                projectIds : [1,2],
                projects : [{hey:'ho'},{hey:'ho'}]
            }
        ]
    },
    "account.Service": {
        fn: account.Service,
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
		happyTestValue: 'account'
	},
	{
		propertyName: 'id',
		happyTestValue: 12345
	},
	{
		propertyName: 'plan',
		happyTestValue: 'this is the plan'
	},
	{
		propertyName: 'overTheLimit',
		happyTestValue: false
	}
];
for (var i=0;i<testData.length;i++) {
	module.exports['test_'+testData[i].propertyName] = 
		utils.standardPropertyTestFunction(account.Account,testData[i].propertyName,testData[i].happyTestValue);
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
		utils.standardDatePropertyTestFunction(account.Account,dateTestProperties[i],dateObj);
		
	module.exports['test_'+dateTestProperties[i]] = 
		utils.standardDatePropertyTestFunction(account.Account,dateTestProperties[i],dateStr);
}

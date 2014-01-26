var nodeunit = require('nodeunit'),
    utils = require('./utils'),
    membership = require('../lib/resources/accountmembership');

/* Test constructor fns */
var constructors = {
    "membership.AccountMembership": {
        fn: membership.AccountMembership,
        args: [
            {
                kind: 'account_membership',
                id: 123,
                accountId: 456,
                personId: 789,
                person: {hey:'ho'},
                createdAt: new Date(),
                updatedAt: new Date(),
                owner: true,
                admin: false,
                projectCreator: true,
                timeEnterer: false,
                timekeeper: true
            }
        ]
    },
    "membership.Service": {
        fn: membership.Service,
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
		happyTestValue: 'account_membership'
	},
	{
		propertyName: 'id',
		happyTestValue: 12345
	},
	{
		propertyName: 'accountId',
		happyTestValue: 54321
	},
	{
		propertyName: 'personId',
		happyTestValue: 67890
	},
	{
		propertyName: 'owner',
		happyTestValue: false
	},
	{
		propertyName: 'admin',
		happyTestValue: false
	},
	{
		propertyName: 'projectCreator',
		happyTestValue: false
	},
	{
		propertyName: 'timeEnterer',
		happyTestValue: false
	},
	{
		propertyName: 'timekeeper',
		happyTestValue: false
	}
];
for (var i=0;i<testData.length;i++) {
	module.exports['test_'+testData[i].propertyName] = 
		utils.standardPropertyTestFunction(membership.AccountMembership,testData[i].propertyName,testData[i].happyTestValue);
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
		utils.standardDatePropertyTestFunction(membership.AccountMembership,dateTestProperties[i],dateObj);
		
	module.exports['test_'+dateTestProperties[i]] = 
		utils.standardDatePropertyTestFunction(membership.AccountMembership,dateTestProperties[i],dateStr);
}

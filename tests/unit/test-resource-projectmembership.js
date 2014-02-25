var nodeunit = require('nodeunit'),
    utils = require('./utils'),
    Person = require('../../lib/resources/person').Person,
    membership = require('../../lib/resources/projectmembership');

/* Test constructor fns */
var constructors = {
    "membership.ProjectMembership": {
        fn: membership.ProjectMembership,
        args: [
            {
                kind: 'project_membership',
                id: 54322,
                projectId: 32452542424,
                personId: 2343234,
                person: new Person({
                    name:'aw snap',
                    email: 'me@snap.com'
                }),
                role: 'superhero',
                projectColor: 'fucsia',
                createdAt: new Date(0),
                lastViewedAt: new Date(7000),
                wantsCommentNotificationEmails: false
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
		happyTestValue: 'project_membership'
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
		propertyName: 'personId',
		happyTestValue: 56756765
	},
	{
		propertyName: 'role',
		happyTestValue: 'mah role'
	},
	{
		propertyName: 'projectColor',
		happyTestValue: 'mah colorz'
	},
	{
		propertyName: 'wantsCommentNotificationEmails',
		happyTestValue: false
	}
];
for (var i=0;i<testData.length;i++) {
	module.exports['test_'+testData[i].propertyName] = 
		utils.standardPropertyTestFunction(membership.ProjectMembership,testData[i].propertyName,testData[i].happyTestValue);
}

/* Testing Date inputs */
var dateTestProperties = [
	'createdAt',
	'lastViewedAt'
];
var dateObj = new Date();
var dateStr = '2000-01-01 00:00';
for (var i=0; i < dateTestProperties.length; i++) {

	module.exports['test_'+dateTestProperties[i]] = 
		utils.standardDatePropertyTestFunction(membership.ProjectMembership,dateTestProperties[i],dateObj);
		
	module.exports['test_'+dateTestProperties[i]] = 
		utils.standardDatePropertyTestFunction(membership.ProjectMembership,dateTestProperties[i],dateStr);
}

var nodeunit = require('nodeunit'),
    utils = require('./utils'),
    Person = require('../../lib/resources/person').Person,
    FileAttachment = require('../../lib/resources/fileattachment').FileAttachment,
    comment = require('../../lib/resources/comment');

/* Test constructor fns */
var constructors = {
    "comment.Comment": {
        fn: comment.Comment,
        args: [
            {
                kind: 'comment',
                id: 54322,
                epicId: 343443,
                storyId: 234234,
                createdAt: new Date(),
                updatedAt: new Date(),
                text: 'blurb',
                personId: 234234,
                person: new Person({
                    name:'of interest'
                }),
                commitIdentifier: 'ewewe',
                commitType: 'githubz',
                fileAttachmentIds: [3,2,1],
                fileAttachments: [
                    new FileAttachment({
                        bigUrl: 'zomg'
                    }),
                    new FileAttachment({
                        bigUrl: 'guyz'
                    }),
                    new FileAttachment({
                        bigUrl: 'look'
                    })
                ]
            }
        ]
    },
    "comment.Service": {
        fn: comment.Service,
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
		happyTestValue: 'comment'
	},
	{
		propertyName: 'id',
		happyTestValue: 67890
	},
	{
		propertyName: 'epicId',
		happyTestValue: 3232323
	},
	{
		propertyName: 'storyId',
		happyTestValue: 568688768
	},
	{
		propertyName: 'personId',
		happyTestValue: 88
	},
	{
		propertyName: 'text',
		happyTestValue: 'Itz mah text!'
	},
	{
		propertyName: 'commitIdentifier',
		happyTestValue: 'Blarbbity identifierz'
	},
	{
		propertyName: 'commitType',
		happyTestValue: 'ze type'
	}
];
for (var i=0;i<testData.length;i++) {
	module.exports['test_'+testData[i].propertyName] = 
		utils.standardPropertyTestFunction(comment.Comment,testData[i].propertyName,testData[i].happyTestValue);
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
		utils.standardDatePropertyTestFunction(comment.Comment,dateTestProperties[i],dateObj);
		
	module.exports['test_'+dateTestProperties[i]] = 
		utils.standardDatePropertyTestFunction(comment.Comment,dateTestProperties[i],dateStr);
}

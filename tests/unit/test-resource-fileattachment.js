var nodeunit = require('nodeunit'),
    utils = require('./utils'),
    attach = require('../lib/resources/fileattachment');

/* Test constructor fns */
var constructors = {
    "attach.FileAttachment": {
        fn: attach.FileAttachment,
        args: [
            {
                kind: 'file_attachment',
                id: 54322,
                filename: 'whoopsie.js',
                contentType: 'application/nonsense',
                size: 54646,
                width: 24323,
                height: 34534,
                thumbnailable: false,
                thumbnailUrl: 'http://thumby.com',
                downloadUrl: 'http://downloadthumby.com',
                bigUrl: 'http://bigthumby.com',
                uploaded: true,
                uploaderId: 111,
                uploader: {who:'dat'},
                createdAt: new Date()
            }
        ]
    },
    "attach.Service": {
        fn: attach.Service,
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
		happyTestValue: 'file_attachment'
	},
	{
		propertyName: 'id',
		happyTestValue: 67890
	},
	{
		propertyName: 'size',
		happyTestValue: 3232323
	},
	{
		propertyName: 'width',
		happyTestValue: 568688768
	},
	{
		propertyName: 'height',
		happyTestValue: 54321
	},
	{
		propertyName: 'filename',
		happyTestValue: 'file.js'
	},
	{
		propertyName: 'contentType',
		happyTestValue: 'Itz mah content typez!'
	},
	{
		propertyName: 'thumbnailable',
		happyTestValue: false
	},
	{
		propertyName: 'thumbnailUrl',
		happyTestValue: 'http://www.hey.com/yassthumb'
	},
	{
		propertyName: 'bigUrl',
		happyTestValue: 'http://www.hey.com/yassbig'
	},
	{
		propertyName: 'uploaded',
		happyTestValue: false
	}
];
for (var i=0;i<testData.length;i++) {
	module.exports['test_'+testData[i].propertyName] = 
		utils.standardPropertyTestFunction(attach.FileAttachment,testData[i].propertyName,testData[i].happyTestValue);
}

/* Testing Date inputs */
var dateTestProperties = [
	'createdAt'
];
var dateObj = new Date();
var dateStr = '2000-01-01 00:00';
for (var i=0; i < dateTestProperties.length; i++) {

	module.exports['test_'+dateTestProperties[i]] = 
		utils.standardDatePropertyTestFunction(attach.FileAttachment,dateTestProperties[i],dateObj);
		
	module.exports['test_'+dateTestProperties[i]] = 
		utils.standardDatePropertyTestFunction(attach.FileAttachment,dateTestProperties[i],dateStr);
}

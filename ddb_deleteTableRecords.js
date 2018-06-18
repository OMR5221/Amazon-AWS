// Load the AWS SDK for Node.js:
var AWS = require('aws-sdk');
//Set the region: ex: us-east-1
AWS.config.update({region: 'us-east-1'});

// Create the DynamoDB service object:
ddb = new AWS.DynamoDB({apiVersion: '2012-08-10 '});

// Provide param of tablename to describe from user input:
var params =
{
	TableName: 'TABLE',
	Key: 
	{
		'KEY_NAME': {N: 'VALUE'}
	}
};

// Call DynamoDB to retrieve the selected table desc:
ddb.deleteItem(params, function(err, data)
{
	if (err)
	{
		console.log("Error: ", err);
	} 
	else 
	{
		console.log("Success", data);
	}
});

// Run as: node ddb_deleteTableField.js <TABLE_NAME> <KEY: FIELD_NAME>
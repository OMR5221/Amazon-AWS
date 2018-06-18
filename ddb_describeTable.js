// Load the AWS SDK for Node.js:
var AWS = require('aws-sdk');
//Set the region: ex: us-east-1
AWS.config.update({region: 'us-east-1'});

// Create the DynamoDB service object:
ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

// Provide parametr of tablename to describe from user input:
var params =
{
	TableName: process.argv[2]
};

// Call DynamoDB to retrieve the selected table desc:
ddb.describeTable(params, function(err, data)
{
	if (err)
	{
		console.log("Error", err);
	} 
	else 
	{
		console.log("Success", data.Table.KeySchema);
	}
});

// Run as: node ddb_describetable.js <TABLE_NAME>
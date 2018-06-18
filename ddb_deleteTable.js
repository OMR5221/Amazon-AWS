// Load the AWS SDK for Node.js:
var AWS = require('aws-sdk');
//Set the region: ex: us-east-1
AWS.config.update({region: 'us-east-1'});

// Create the DynamoDB service object:
ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

// Provide param of tablename to describe from user input:
var params =
{
	TableName: process.argv[2]
};

// Call DynamoDB to retrieve the selected table desc:
ddb.deleteTable(params, function(err, data)
{
	if (err & err.code == 'ResourceNotFoundException')
	{
		console.log("Error: Table not found");
	}
	else if (err && err.code == 'ResourceInUseException')
	{
		console.log("Error: Table is in use");
	} 
	else 
	{
		console.log("Success", data);
	}
});

// Run as: node ddb_deletetable.js <TABLE_NAME>
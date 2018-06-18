// Load the AWS SDK for Node.js:
var AWS = require('aws-sdk');
//Set the region: ex: us-east-1
AWS.config.update({region: 'us-east-1'});

// Create the DynamoDB service object:
ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

// Call DynamoDB to retrieve the list of tables:
ddb.listTables({Limit: 10}, function(err, data)
{
	if (err)
	{
		console.log("Error", err);
	} 
	else 
	{
		console.log("Success: Table names are ", data.TableNames);
	}
});
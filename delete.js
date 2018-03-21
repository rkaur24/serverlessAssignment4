'use strict';
const AWS = require('aws-sdk'); 
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

module.exports.delete = (event, context, callback) => {
   event.Records.forEach((record) => {
    const file = record.s3.object.key;
    const opType = record.eventName
    const opTime = record.eventTime
    
    const params = {
      TableName: 'mydropboxrecord',
      Item: {
        id: uuid.v1(),
        fileName: file,
        opType: opType,
        opTime: opTime
      }
    }

    dynamoDb.put(params, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
    });

});
};

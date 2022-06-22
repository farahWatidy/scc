'use strict';
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const sns = new AWS.SNS();

/**
 * LMS Lambda handler
*/

module.exports.hello = async (event) => {
  const params = {
    Message: event.body,
    TopicArn: 'arn:aws:sns:us-east-1:654113363782:cloudTopic'
    };

  await sns.publish(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'SCC API Gateway deployed and successful!',
      input: event,
    })
  }

};


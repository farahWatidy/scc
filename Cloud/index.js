
const AWS = require('aws-sdk');
const express = require('express');
const app = express();
const bodyParser= require('body-parser');


app.use(bodyParser.json()); 
const port = 4000;

console.log(`Orders service listening on port ${port}`);
app.listen(port);

// Configure the region 
AWS.config.update({region: 'us-east-1'});

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const sns = new AWS.SNS();

app.post('/subscribe', (req, res) => { 
    let params = { 
        Protocol: 'SQS',  
        TopicArn: 'arn:aws:sns:us-east-1:654113363782:cloudTopic', 
        Endpoint: 'arn:aws:sqs:us-east-1:654113363782:SccQueue' 
    }; 
   
    sns.subscribe(params, (err, data) => { 
        if (err) { 
            console.log(err); 
        } else {
            console.log(data); 
            res.send(data); 
        } 
    }); 
  });

  app.post('/publish', (req, res) => {     
	console.log("enter here");
 	 console.log(req.body);
	let params = { 
        	Message: JSON.stringify(req.body.message), 
        	TopicArn: 'arn:aws:sns:us-east-1:654113363782:cloudTopic'
        }; 
   
    sns.publish(params, function(err, data) { 
        if (err) console.log(err, err.stack);  
        else console.log(data); 
    }); 
  });
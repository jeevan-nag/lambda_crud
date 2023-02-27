import AWS from 'aws-sdk';
const sns = new AWS.SNS({ apiVersion: '2010-12-01' });
const params = {
//   TargetArn: 'arn:aws:sns:us-east-1:346405632881:serverless:c801b4f1-211c-496f-bf38-dee79db01c14',
// MessageStructure: 'string',
  PhoneNumber: "+918553574582",
  Message: 'Hello, world!'
};
export const sendSMS = async () => {
    sns.publish(params, function(err, data) {
        if (err) {
            console.log('Error publishing message:', err);
        } else {
            console.log('Message published:', data);
        }
    });
}

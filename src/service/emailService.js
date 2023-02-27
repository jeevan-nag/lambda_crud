import AWS from 'aws-sdk';
const ses = new AWS.SES({ apiVersion: '2010-12-01' });

export const sendEmail = async(recipientEmail, message, subject, senderEmail) => {
   try{
    const params = {
        Destination: {
          ToAddresses:[recipientEmail]// Replace with your recipient's email address
        },
        Message: {
          Body: {
            Text: {
              Data: message// Replace with your email message
            }
          },
          Subject: {
            Data:  subject // Replace with your email subject
          }
        },
        Source: senderEmail  // Replace with your sender's email address
      };
      
        ses.sendEmail(params, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Email sent:', data);
          return data;
        }
      });
   } catch(e) {
    throw e;
   }
      
}
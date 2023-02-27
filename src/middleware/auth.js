import jwt from 'jsonwebtoken';
const secretKey = 'Serverless';

export const generateToken = async(email, password) => {
    const token =  jwt.sign({email, password}, secretKey);
    return token;
}

export const verifyToken = async(event, context) => {
    try{
        const authHeader = event.headers["Authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const result = jwt.verify(token, secretKey);
        console.log("verifiedToken-------->", result);
        console.log("principalId------>", result.id);
        console.log("event.methodArn------->", event.methodArn);
        const response = JSON.stringify({
            something: "Invalid token"
          });
        let active = false;
        if(token) 
          active = true;
        const policy = active ? 'Allow' : 'Deny';
        const authResponse = await generatePolicy(result, policy, event.methodArn, response);
        return authResponse;
    } catch(e){
       context.end();
       throw new Error('Invalid Token');
    }
}

// Policy helper function
export const generatePolicy = async (principalId, effect, resource, data) => {
  try{
    const authResponse = {principalId };
    if (effect && resource) {
      const policyDocument = {
          Version: '2012-10-17',
          Statement: [
            {
              Action: 'execute-api:Invoke',
              Effect: effect,
              Resource: resource,
            },
          ],
        }
      authResponse.policyDocument = policyDocument;
    }
    authResponse.context = {
        stringKey: data
        //role: user.role --> "principalId" could be an object that also has role
      };
    console.log('authResponse----------->', authResponse);
    return authResponse;
  } catch(e){
    throw e;
  }
}
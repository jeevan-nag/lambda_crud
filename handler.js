import * as user from './src/controller/user.js'
import * as auth from './src/middleware/auth.js'
export const registration = user.registration;
export const login = user.login;
export const updateUser = user.updateUser;
export const userById = user.userById
export const verifyToken = auth.verifyToken;

export async function hello(event) {
   console.log("------")
   return {
     statusCode: 200,
     body: JSON.stringify(
       {
         message: "Go Serverless v2.0! Your function executed successfully!",
       }
     )
   };
 }

 // export async function registrations(event){
//    console.log("invoked")
//    switch(event.path){
//       case '/registration' :{console.log('inside') registration}
//    }
// }
// exports.registrations = registration;

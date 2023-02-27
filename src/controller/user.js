import { User } from "../models/user.js";
import { response } from "../service/util.js";
import  bcrypt  from 'bcrypt';
import { generateToken, verifyToken } from "../middleware/auth.js";
import { Op } from "sequelize";
const secretKey = 'Serverless';
import {sendEmail} from '../service/emailService.js'
import { sendSMS } from "../service/smsService.js";
export const registration = async (event, context) => {
  try {
    console.log('context--------->', context);
    let { name, email, phone, password } = JSON.parse(event.body);
    console.log("event body", event.body);
    password = await bcrypt.hash(password, 10);
    const user = await User.create({name, email, password, phone, createdAt: new Date()});
    return await response(200, 'Success', user);
  } catch (error) {
    console.log("Error------->", error);
    return await response(400, 'ERROR', error);
  }
}

export const login = async (event) => {
  try {
    const {email, password} = JSON.parse(event.body);
    const user = await User.findOne({email})
    if(!user){
      return response(404, 'ERROR', 'User not found');
    }
    console.log("user------------>", user);

    const verifyPassword = await bcrypt.compare(password, user.password);
    if(!verifyPassword){
      return response(400, 'ERROR', 'Invalid credentials')
    }
    console.log("verifyPassword------->", verifyPassword);
    user.dataValues.token = await generateToken(user.id);
    return response(200, 'Success', user);
  } catch (error) {
    return response(400, 'ERROR', error);
  }
}

export const updateUser = async (event) =>{
  try{
    console.log('inside update user--------->',event.requestContext.authorizer.claims);
    const body =  JSON.parse(event.body);
    const {email=null, phone=null} = body;
    console.log("email--->", email,"    phone----->", phone);
    // const a = await sendSMS();
    // console.log('AWS-email----->', a);
    const user = await User.findOne({where:{[Op.or]:{email,phone}}});
    if(!user){
      return response(404, 'ERROR', 'User not found');
    }
    const passwordUpdate = await User.update(body,{where:{email}});
    if(!passwordUpdate[0]>0)
       return response(400, 'Error', 'No Changes found');
    return response(200, 'Success', 'Successfully Updated User');
    
  } catch(e){
    return response(400, 'ERROR', e);
  }
}

export const getUserById = async (event) =>{
   try {
    console.log('Path Parameters------->', event.pathParameters.id);
    const userId = event.pathParameters.id;
    // const user = await User.findOne({where:{id:userId}});
    const user = await User.findByPk(userId);
    if(!user){
      return response(404, 'ERROR', 'User not found');
    }
    return response(200, 'Success', user);
  } catch (e) {
    return response(400, 'ERROR', e);
  }
}


import jwt, { JwtPayload } from 'jsonwebtoken'
import { token } from 'morgan'



// jwt token generation 
export const generateToken = (userId:string)=>{
    return jwt.sign({userId},process.env.JWT_SECRET_KEY || '',{expiresIn:"1h"})
}


// jwt token verification 
export const verifyToken = (token:string):JwtPayload | null=>{
  try{
  const secret = process.env.JWT_SECRET_KEY 
if(!secret){
  return null
}  
  const decode = jwt.verify(token,secret)as JwtPayload
  return decode
  }catch(err){
    return null
  }
}
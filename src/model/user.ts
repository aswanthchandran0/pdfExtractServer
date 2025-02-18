import mongoose, { Schema } from "mongoose";


interface IUser{
    name:string,
    email:string,
    password:string
} 
 
const userSchema:Schema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String,required:true}
})

export const userModel  =  mongoose.model<IUser>("user",userSchema)
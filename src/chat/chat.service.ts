import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatDto } from 'src/dto/chat.dto';
import { Chat } from 'src/schema/chat.schema';
import mongoose from 'mongoose';
import * as bcrypt from "bcrypt";
//import { v2 as cloudinary } from "cloudinary";
//import streamifier from "streamifier";
import { uploadImageCloudinary } from 'src/cloudinary.config';

@Injectable()
export class ChatService {
  
    constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>){}

        async findAll(){
            return this.chatModel.find();
        }

        async create(createUser: ChatDto){
            const newUser = new this.chatModel(createUser);
            const checkUser = await this.chatModel.find({mail: newUser.mail});

            if(checkUser.length > 0){
                console.log("usuario ya existe");
            }else{
                const salt = bcrypt.genSaltSync(12);
                const hashed = await bcrypt.hash(newUser.password, salt);
    
                const newUserHashed = new this.chatModel({
                    mail: newUser.mail,
                    name: newUser.name,
                    lastname: newUser.lastname,
                    password: hashed,
                    photo: null,
                    groups: []
                })
                
                return newUserHashed.save();
            }
        }

        async getUser(userInfo: string){
            const userInfoRes = JSON.parse(userInfo);
            const {mail, password} = userInfoRes;
            const userExist = await this.chatModel.findOne({mail: mail});
            if(userExist != null){
                let confirmPassword = await bcrypt.compare(password, userExist.password);
                if(confirmPassword > 0){
                    console.log("usuario confirmado");
                }else{
                    console.log("no se encontro la contraseña");
                }
                return userExist;
            }else{
                console.log("usuario no existe");
            }
        }

        async updateUserService(idJson, userInfoUpdateJson){
            const idJsonParse = JSON.parse(idJson);
            const userInfoUpdateParse = JSON.parse(userInfoUpdateJson);
            const {id} = idJsonParse;
            const {name, lastname, filename, password} = userInfoUpdateParse;
            console.log("filename: ", filename);
            const imageUpload = await uploadImageCloudinary(filename);
            console.log("imageUpload: ", imageUpload);
        }

        async createGroupService(createGroupJson){
            const createGroupParse = JSON.parse(createGroupJson);
            //const idObject = new mongoose.Types.ObjectId(createGroupParse.id);

            console.log(createGroupParse.Groups[0].groupName);

                const updateGroups = await this.chatModel.updateOne(
                    {_id: createGroupParse.id},
                    {$addToSet:{
                       groups:{
                            adminId:createGroupParse.id,
                            groupName:createGroupParse.Groups[0].groupName,
                            groupProfile:createGroupParse.Groups[0].groupProfile
                        }
                    }}   
                )
               
                return updateGroups;
        }
        
        async getInUserService(getInUserJson){
            const getInUserParse = JSON.parse(getInUserJson);
            const updateMembers = await this.chatModel.updateOne();
            return updateMembers;
        }
}

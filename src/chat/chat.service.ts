import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatDto, UsersInGroupDto } from 'src/dto/chat.dto';
import { Chat, UsersInGroup } from 'src/schema/chat.schema';
import mongoose from 'mongoose';
import * as bcrypt from "bcrypt";
//import { v2 as cloudinary } from "cloudinary";
//import streamifier from "streamifier";
import { uploadImageCloudinary } from 'src/cloudinary.config';

@Injectable()
export class ChatService {
  
    constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>,
                @InjectModel(UsersInGroup.name) private usersGroupsModel: Model<UsersInGroup>){}

        async findAll(){
            return this.chatModel.find();
        }

        async create(createUser: ChatDto){  //--------------------------------------crear el usuario
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

        async getUser(userInfo: string){  //--------------------------------------obtener el usuario
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

        async updateUserService(mail: string, name: string, lastname: string, filename: File){  //-------------------------actualizar informacion del perfil del usuario  //----------------------------------------------------------- ARREGLAR, NO LLEGAN LOS DATOS POR POSTMAN
            console.log("filename: ", mail , " ", name, " ", lastname, " ", filename);
            const imageUpload = await uploadImageCloudinary(filename);
            console.log("imageUpload: ", imageUpload);
        }


        async createGroupService(createGroupJson){  //--------------------------------------crear un grupo
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

        async deleteGroupService(groupId){ //---------------------------------------------borrar grupo (ver funcionalidad a ver si funciona)
            console.log(groupId.groupId);
            const deleteGroups = await this.chatModel.updateOne(
                {"groups._id": groupId.groupId},
                {
                    $pull:{
                        "groups": {_id: groupId.groupId}
                    }
                }
            )

            return deleteGroups;
        }

        async showGroupsService(userId){   //----------------------------------------- probar esta funcionalidad (deberia traer el documento entero en los que el id del usuario esta dentro de "usersIn")
            const showGroups = await this.chatModel.aggregate([
                {
                    $project: {
                        groups:{
                            $filter:{
                                input: "$groups",
                                as: "$groups",
                                cond:{
                                    $eq: ["$$groups.usersIn.idMember", [userId]]
                                }
                            }
                        }
                }
            }
            ])

            return showGroups;
        }


        async getInUserService(getInUserJson){  //-------------------------------------- meter a un usuario a un grupò
            const getInUserParse = JSON.parse(getInUserJson);
            console.log(getInUserParse);

            const checkMember = await this.chatModel.find({
                groups:{
                    $elemMatch:{
                        _id: getInUserParse.groupId,
                        usersInGroup:{
                            $elemMatch:{
                                idMember: getInUserParse.idMember
                            }
                        }
                    }
                }
            });

            if(checkMember.length > 0){
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            }else{
                const updateMembers = await this.chatModel.updateOne(
                    {"groups._id": getInUserParse.groupId},
                    {
                        $addToSet:{
                            "groups.$[i].usersInGroup": {
                                idMember: getInUserParse.idMember,
                                mailMember: getInUserParse.mailMember,
                                nameMember: getInUserParse.nameMember,
                                lastnameMember: getInUserParse.lastnameMember,
                                memberFilename: getInUserParse.memberFilename
                            }
                        }
                    },
                    {
                        arrayFilters:[
                            {"i._id": getInUserParse.groupId},
                            
                        ]
                    }
                );
                return updateMembers;
            }

        }

        async deleteUserService(deleteUserJson){  //--------------------------------------Borrar usuario de un grupo
            const deleteUserParse = JSON.parse(deleteUserJson);

            const deleteUser = await this.chatModel.updateOne(
                {"groups._id": deleteUserParse.groupId},
                {
                    $pull:{
                        "groups.$[i].usersInGroup": {idMember: deleteUserParse.idMember}
                    }
                   
                },
                {
                    arrayFilters:[
                        {"i._id": deleteUserParse.groupId},
                        {"u._id": deleteUserParse.idMember}
                    ]
                }
            )
            return deleteUser;
        }

        async searchUserService(username){ //---------------------------- buscar usuario por su nombre con regex (%LIKE%)
            const usernameParse = username.name;
            const searchUser = await this.chatModel.find({ "name": { $regex: usernameParse } });    
            return searchUser;
        }


        async sendMessageService(messageBody){ //actualizar mensajes de un grupo
            console.log(messageBody.messageBody);
            const updateGroupMessages = await this.chatModel.updateOne(
                {"groups._id": messageBody.groupId},
                {
                    $addToSet:{
                        "groups.$[i].messages":{
                            usernameMessage: messageBody.usernameMessage,
                            lastnameMessage: messageBody.lastnameMessage,
                            userPhotoMessage: messageBody.userPhotoMessage,
                            messageBody: messageBody.messageBody,
                            messageArchive: messageBody.messageArchive
                        }
                    }
                },
                {
                    arrayFilters:[
                        {"i._id": messageBody.groupId}
                    ]
                }
            )

            return updateGroupMessages;
        }

        async getContactsByName(name){ //--------------------------------------------------------------traer una lista de los usuarios que coincidan con el nomobre ingresado en el buscador

        }

}

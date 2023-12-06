import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';
import { ChatDto } from 'src/dto/chat.dto';
import { Chat, UsersInGroup } from 'src/schema/chat.schema';
import mongoose from 'mongoose';
import * as bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { uploadImageCloudinary } from 'src/cloudinary.config';
import { Contacts } from 'src/schema/messages.schema';

@Injectable()
export class ChatService {
  
    constructor(
        @InjectModel(Chat.name) private chatModel: Model<Chat>,
        @InjectModel(Contacts.name) private contactsModel: Model<Contacts>
    ){}
  

        async findAll(){
            return this.chatModel.find();
        }

        async createUserService(createUser: any){  //--------------------------------------crear el usuario
                const checkUser = await this.chatModel.find({mail: createUser.email});
                
                if(checkUser.length < 0){
                    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
                }else{
                    const salt = bcrypt.genSaltSync(12);
                    const hashed = await bcrypt.hash(createUser.password, salt);
                    const newUserHashed = new this.chatModel({ 
                        mail: createUser.email,
                        password: hashed,
                        username: createUser.username,
                        groups: []
                    })
    
                    return newUserHashed.save();
                }
            
        }

        async getUser(userInfo: any){  //--------------------------------------obtener el usuario
            const userInfoRes = JSON.parse(userInfo);
            const {email, password} = userInfoRes;
            const userExist = await this.chatModel.findOne({mail: email});
            if(userExist != null){
                let confirmPassword = await bcrypt.compare(password, userExist.password);
                if(confirmPassword > 0){
                    console.log("usuario confirmado", userExist);
                    return userExist;
                }else{
                    console.log("no se encontro la contraseña");
                }
            }else{
                console.log("usuario no existe");
            }
        }

        async updateUserService(mail: string, name: string, lastname: string, filename: File){  //-------------------------actualizar informacion del perfil del usuario  //----------------------------------------------------------- ARREGLAR, NO LLEGAN LOS DATOS POR POSTMAN
            const imageUpload = await uploadImageCloudinary(filename);
        }


        async createGroupService(createGroupJson){  //--------------------------------------crear un grupo
            const createGroupParse = JSON.parse(createGroupJson);
            console.log(createGroupParse.id);
                const updateGroups = await this.chatModel.updateOne(
                    {_id: createGroupParse.id},
                    {$addToSet:{
                       groups:{
                            adminId:createGroupParse.id,
                            groupName:createGroupParse.groupName,
                            groupProfile:createGroupParse.groupProfile
                       },
                    }}   
                )
               
                return updateGroups;
        }

        async openGroupChatService(ids){

            const getGroup = await this.chatModel.find(
                {_id: ids.sessionId},
                {
                    groups:{ $elemMatch: {_id: ids.groupId}}
                }
            )
            return getGroup;
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
            const showGroups = await this.chatModel.find({_id: userId.userId});
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
                                //nameMember: getInUserParse.nameMember,
                                //lastnameMember: getInUserParse.lastnameMember,
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

        async addContactService(addContact){
            const findUser = await this.chatModel.find({mail: addContact.mail});   
            const contactId = findUser[0]._id.toString();
        
            await this.chatModel.updateOne(
                {  _id: addContact.userId  },
                {
                    $addToSet:{
                        contacts:{
                            _id: new mongoose.Types.ObjectId(),
                            contactId: contactId,
                            contactUsername: findUser[0].username,
                        }
                    }
                },
                {
                    arrayFilters:[{
                        "i._id": addContact.userId
                    }]
                }

                )

            const newContact = await this.contactsModel.updateOne(
                {  _id: addContact.userId  },
                {
                     $addToSet:{
                        contacts:{
                            contactId: contactId,
                            contactName: findUser[0].username,
                            contactMessages:[]
                        }
                    }
                },

                )
            return newContact; 
        }

        async deleteContactService(ids){  //-------------------------------SEGUIR CON ESTO
            console.log(ids.contactId);
            const idObject = new mongoose.Types.ObjectId(ids.contactId);
            const deleteContact = await this.chatModel.updateOne(
                {_id: ids.sessionId},
                {
                    $pull: {
                        contacts: { contactId: ids.contactId} 
                     }
                    
                }
            )

            return deleteContact;
        }

        async openContactChatService(ids){
            const idsSession = ids.sessionId;
            const idsContact = ids.contactId;
            console.log(ids.contactId);
            const defId = idsSession.concat(idsContact.toString());
            const defIdB = idsContact.concat(idsSession.toString());
            
            const firstCheck = await this.contactsModel.find({conversationId: defId});
            
            if(firstCheck.length > 0){
                console.log(firstCheck);
                return firstCheck;
            }
            
            const secondCheck = await this.contactsModel.find({conversationId: defIdB});
            
            if(secondCheck.length > 0){
                console.log("abcd");
                return secondCheck
            }
            console.log("ssssss");
            const createConversation = new this.contactsModel({
                conversationId: defId,
                contactId: ids.contactId,
                contactMessages:[]
            })

            return createConversation.save();
        }


        async contactMessageService(messageData){ //--------------------------------------------------seguir desde aca para crear las conversaciones mediante encontrar los ids concatenados
            const concatIds = messageData.userA.concat(messageData.userB.toString());
            const concatIdsB = messageData.userB.concat(messageData.userA.toString());
            const firstCheck = await this.contactsModel.find({conversationId: concatIds});

            if(firstCheck.length > 0){
                await this.contactsModel.updateOne(
                    {conversationId: concatIds},
                    {
                        $addToSet:{
                            contactMessages:{
                                text: messageData.text,
                                multimedia: messageData.multimedia
                            }
                        }
                    }
                )

                const getTheLastMsg = await this.contactsModel.find().sort({_id: -1}).limit(1);

                return getTheLastMsg;
            }

            const secondCheck = await this.contactsModel.find({conversationId: concatIdsB});

            if(secondCheck.length > 0){
                const updateConversation = await this.contactsModel.updateOne(
                    {conversationId: concatIdsB},
                    {
                        $addToSet:{
                            contactMessages:{
                               // usernameA: messageData.user,
                               // usernameB: messageData.usernameB,
                                text: messageData.text,
                                multimedia: messageData.multimedia
                            }
                        }
                    }
                )
                
                return updateConversation;
            }

        }

        async getAllConversations(){
            const getAll = await this.contactsModel.find();

            return getAll;
        }

      


        /*async contactMessageService(messageData){  //--------------------------------envia msj al contacto individual
            const userIdA = new mongoose.Types.ObjectId(messageData.userA);
            const userIdB = new mongoose.Types.ObjectId(messageData.userB);

            const getChatUpdate = await this.chatModel.aggregate([
                {
                  "$match": {
                    $and:[{_id: userIdA}, {_id: userIdB}]
                  }
                },
                {
                  "$unwind": "$contacts"
                },
                {
                  "$match": {
                    $and:[{"contacts.contactId": userIdB}, {"contacts.contactId":userIdA }]
                  }
                },
                {
                    $group: {
                        _id: "$_id",
                        contacts:{
                            $push: "$contacts"
                        }
                    }
                }
              ])

            await this.chatModel.updateOne(
               {_id: userIdA},
               {
                $addToSet:{
                    "contacts.$[i].contactMessages":{
                        userA: messageData.userA,
                        usernameA: messageData.usernameA,
                        userB: messageData.userB,
                        usernameB: messageData.usernameB,
                        text: messageData.text,
                        multimedia: messageData.multimedia
                    }
                }
               },
               {
                arrayFilters:[
                    {"i.contactId": userIdB}
                ]
               }
            )


            return getChatUpdate;
        }

        async openContactChatService(ids){ //---------------------------------------- obtiene los msj del contacto individual
           
            const userId = new mongoose.Types.ObjectId(ids.sessionId);
            const contId = new mongoose.Types.ObjectId(ids.contactId);

            const getByUserA = await this.chatModel.aggregate([
                {
                  "$match": {
                    $or:[{_id: userId}, {_id: contId}]
                  }
                },
                {
                  "$unwind": "$contacts"
                },
                {
                  "$match": {
                    $or:[{"contacts.contactId": contId}, {"contacts.contactId":userId }]
                  }
                },
                {
                    $group: {
                        _id: "$_id",
                        contacts:{
                            $push: "$contacts"
                        }
                    }
                }
              ])

            return getByUserA;
        }*/

}

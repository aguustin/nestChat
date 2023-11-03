import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatDto } from 'src/dto/chat.dto';
import { Chat } from 'src/schema/chat.schema';
import * as bcrypt from "bcrypt";
import { json } from 'stream/consumers';

@Injectable()
export class ChatService {
    findOne(mail: string) {
        throw new Error('Method not implemented.');
    }
    find(mail: string) {
        throw new Error('Method not implemented.');
    }
  
    constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>){}

        async findAll(){
            return this.chatModel.find();
        }

        async create(createUser: ChatDto){
            const newUser = new this.chatModel(createUser);
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

        async getUser(mail: string, password: string){
            const m = JSON.stringify(mail);
            const p = JSON.stringify(password);
            console.log(JSON.parse(m), " ", JSON.parse(p));
            const userExist = await this.chatModel.findOne({mail: mail, password: password});
            if(userExist){
                let confirmPassword = await bcrypt.compare(password, userExist[0].password);
                if(confirmPassword){

                }else{
                    console.log("no se encontro la contraseña");
                }
            }else{
                console.log("usuario no existe");
            }
            return userExist;
        }
}

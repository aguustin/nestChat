import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import mongoose from "mongoose";

export type ChatDocument = HydratedDocument<Chat>;

@Schema({
    timestamps: true
})

export class Messages{
    @Prop({
        trim: true
    })
    idMessage: mongoose.Types.ObjectId

    @Prop()
    usernameMessage: String

    @Prop()
    lastnameMessage: String

    @Prop()
    userPhotoMessage: String

    @Prop()
    messageBody: String

    @Prop()
    messageArchive: String

}

export class UsersInGroup{
    @Prop({
        trim: true
    })
    idMember: mongoose.Types.ObjectId

    @Prop()
    mailMember: String

    @Prop()
    nameMember: String

    @Prop()
    lastnameMember: String

    @Prop()
    photoMember: String
}

export class Admins{
    @Prop()
    adminId: String
}

export class Groups{
    @Prop({
        trim: true
    })
    id: mongoose.Types.ObjectId

    @Prop([Admins])
    admins: Admins[]

    @Prop()
    groupName: String

    @Prop()
    groupProfile: String

    @Prop()
    members: Number

    @Prop([UsersInGroup])
    usersInGroup: UsersInGroup

    @Prop([Messages])
    messages: Messages[]

}

export class Chat{
    @Prop({
        trim: true
    })
    mail: String

    @Prop({
        trim: true
    })
    name: String

    @Prop()
    lastname: String

    @Prop()
    photo: String

    @Prop()
    password: String

    @Prop([Groups])
    groups: Groups[]
    
}


export const ChatSchema = SchemaFactory.createForClass(Chat);
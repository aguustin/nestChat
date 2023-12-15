import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, trusted } from "mongoose";
import mongoose from "mongoose";

export type ChatDocument = HydratedDocument<Chat>;

@Schema({
    timestamps: true
})

export class Messages{
    @Prop()
    usernameMessage: String

    @Prop()
    userPhotoMessage: String

    @Prop()
    messageBody: String

    @Prop()
    messageArchive: String
}


@Schema({
    timestamps: true
})

export class UsersInGroup{
    @Prop({
        trim: true
    })
    idMember: mongoose.Types.ObjectId

    @Prop()
    mailMember: String

    @Prop()
    usernameMember: String

    @Prop()
    memberFilename: String
}


@Schema({
    timestamps: true
})

export class Admins{
    @Prop()
    adminId: String
}


@Schema({
    timestamps: true
})

export class Groups{
    @Prop({
        trim: true
    })
    adminId: mongoose.Types.ObjectId

    @Prop([Admins])
    admins: Admins[]

    @Prop()
    groupName: String

    @Prop()
    groupProfile: String

    @Prop()
    members: Number

    @Prop([UsersInGroup])
    usersInGroup: UsersInGroup[]

    @Prop([Messages])
    messages: Messages[]

}

export class Contacts{

    @Prop({
        trim:true
    })
    contactId: String
    
    @Prop({
        trim: true
    })
    contactUsername: String
}


@Schema({
    timestamps: true
})

export class Chat{
    @Prop({
        trim: true
    })
    mail: string

    @Prop()
    password: string

    @Prop({
        trim: true
    })
    username: string

    @Prop()
    filename: File

    @Prop()
    chatBackground: String

    @Prop([Groups])
    groups: Groups[]

    @Prop([Contacts])
    contacts: Contacts[]
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
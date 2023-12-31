import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import mongoose from "mongoose";

export type ChatDocument = HydratedDocument<Chat>;

@Schema({
    timestamps: true
})

export class Messages{
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
    nameMember: String

    @Prop()
    lastnameMember: String

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

@Schema({
    timestamps: true
})

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
    password: String

    @Prop()
    filename: File

    @Prop([Groups])
    groups: Groups[]
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
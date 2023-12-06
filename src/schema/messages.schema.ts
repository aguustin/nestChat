import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose";

export type MessagesDocument = HydratedDocument<Contacts>;

@Schema({
    timestamps: true
})

class ContactMessages{  
    
    @Prop({
        trim:true
    })
    userA: String
    
    @Prop({
        trim:true
    })
    userB: String

    @Prop({
        trim: true
    })
    text: String

    @Prop({
        trim: true
    })
    multimedia: String
}

@Schema({
    timestamps: true
})

export class Contacts{

    @Prop({
        trim:true
    })
    userId: String

   @Prop()
   contactUsername: String

    @Prop({
        trim:true
    })
    conversationId: String

    @Prop({
        trim: true
    })
    contactId: String

    @Prop({
        trim: true
    })
    contactName: String

    @Prop([ContactMessages])
    contactMessages: ContactMessages[]
}

export const ContactsSchema = SchemaFactory.createForClass(Contacts);
import { IsEmail, IsNotEmpty, IsString, IsNumber, IsArray, ValidateNested, IsMongoId } from "class-validator";
import { Type } from "class-transformer";
import { ObjectId } from "mongoose";

export class MessagesDto{
    @IsString()
    usernameMessage: string

    @IsString()
    lastnameMessage: string

    @IsString()
    userPhotoMessage: string

    @IsString()
    messageBody: string

    @IsString()
    messageArchive: string

}

export class UsersInGroupDto{
    @IsMongoId()
    idMember: string

    @IsEmail()
    mailMember: string

    @IsString()
    nameMember: string

    @IsString()
    lastnameMember: string

    @IsString()
    memberFilename: string
}

class ContactMessagesDto{

    userA: string

    usernameA: string

    userB: string

    usernameB: string

    text: string

    multimedia: string
}

export class ContactsDto{
    @IsString()
    contactId: string

    @IsString()
    contactName: string

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => ContactMessagesDto)
    contactMessages: ContactMessagesDto[]
}

class Groups{
    
    @IsString()
    adminId: string

    @IsString()
    groupName: string

    @IsString()
    groupProfile: string

    @IsNumber()
    members: Number

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MessagesDto)
    MessagesDto: MessagesDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() =>  UsersInGroupDto)
    UsersInGroupDto:  UsersInGroupDto[];
}


export class ChatDto {

    @IsEmail()
    mail: string;

    @IsString()
    password: string;
    
    @IsString()
    username: string
    
    filename: File

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Groups)
    Groups: Groups[];

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => ContactsDto)
    Contacts: ContactsDto[];
}
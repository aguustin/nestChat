import { IsEmail, IsNotEmpty, IsString, IsNumber, IsArray, ValidateNested, IsMongoId } from "class-validator";
import { Type } from "class-transformer";
import { ObjectId } from "mongoose";

class MessagesDto{
    @IsMongoId()
    idMessage: ObjectId

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

class UsersInGroupDto{
    @IsMongoId()
    idMember: string

    @IsEmail()
    mailMember: string

    @IsString()
    nameMember: string

    @IsString()
    lastnameMember: string

    @IsString()
    photoMember: string
}

class AdminDto{
    adminId: string
}

class GroupsDto{

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AdminDto)
    AdminDto: AdminDto[];

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
    name: string

    @IsString()
    lastname: string

    @IsString()
    photo: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => GroupsDto)
    GroupsDto: GroupsDto[];
}
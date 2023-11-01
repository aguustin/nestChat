import { IsEmail, IsNotEmpty, IsString, IsNumber, IsArray, ValidateNested, IsMongoId } from "class-validator";
import { Type } from "class-transformer";
import { ObjectId } from "mongoose";

export class MessagesDto{
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

export class UsersInGroupDto{
    @IsMongoId()
    idMember: ObjectId

    @IsEmail()
    mailMember: string

    @IsString()
    nameMember: string

    @IsString()
    lastnameMember: string

    @IsString()
    photoMember: string
}

export class AdminDto{
    @IsString()
    adminId: string
}

export class GroupsDto{

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
    email: string;

    @IsNotEmpty()
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
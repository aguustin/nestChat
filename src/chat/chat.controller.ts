import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto, MessagesDto, UsersInGroupDto } from 'src/dto/chat.dto';


@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService){}

    @Get()
    findAll(){
        return this.chatService.findAll();
    }

    @Post('/createUser')
    create(@Body() body: ChatDto) {
        try {
            return this.chatService.create(body);
        } catch (error) {
            console.log(error);
        }
    }

    @Post('/loginUser')
    findOne(@Body() userInfo: string) {   
        const userInfoJson = JSON.stringify(userInfo);
        try{
            return this.chatService.getUser(userInfoJson);
        } catch (error) {
            console.log(error);
        }
    }

    @Put('/:id')
    async updateUser(@Param() id: string, @Body() userInfoUpdate: any){
        const idJson = JSON.stringify(id);
        const userInfoUpdateJson = JSON.stringify(userInfoUpdate);
        return this.chatService.updateUserService(id, userInfoUpdate);
    }
    
    @Post('/createGroup')
    async createGroup(@Body() createGroup: ChatDto){
        const createGroupJson = JSON.stringify(createGroup);
        return this.chatService.createGroupService(createGroupJson);
    }

    @Delete('/deleteGroup/:groupId')
    async deleteGroup(@Param() groupId: any){
        return this.chatService.deleteGroupService(groupId);
    }

    @Post('/getInUser')
    async getInUser(@Body() getInUser: UsersInGroupDto){
        const getInUserJson = JSON.stringify(getInUser);
        return this.chatService.getInUserService(getInUserJson);
    }

    @Delete('/deleteUser/:groupId/:idMember')
    async deleteUser(@Param() groupId: any, idMember: any){
        const deleteUserJson = JSON.stringify(groupId, idMember);
        return this.chatService.deleteUserService(deleteUserJson);
    }

    @Post('/searchUsers')
    async searchUser(@Body() username: any){
        //const searchUserJson = JSON.stringify(username);
        return this.chatService.searchUserService(username);
    }

    @Post('/sendMessage')
    async sendMessage(@Body() messageBody: MessagesDto){
        return this.chatService.sendMessageService(messageBody)
    }
    
}

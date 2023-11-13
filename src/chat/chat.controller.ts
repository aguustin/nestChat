import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto } from 'src/dto/chat.dto';


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
    async updateUser(@Param() id: string, @Body() userInfoUpdate: ChatDto){
        console.log(id);
        const idJson = JSON.stringify(id);
        const userInfoUpdateJson = JSON.stringify(userInfoUpdate);
        return this.chatService.updateUserService(idJson, userInfoUpdateJson);
    }
    
    @Post('/createGroup')
    async createGroup(@Body() createGroup: ChatDto){
        const createGroupJson = JSON.stringify(createGroup);
        return this.chatService.createGroupService(createGroupJson);
    }

    @Post('/getInUser')
    async getInUser(@Body() getInUser: ChatDto){
        const getInUserJson = JSON.stringify(getInUser);
        return this.chatService.getInUserService(getInUserJson);
    }
}

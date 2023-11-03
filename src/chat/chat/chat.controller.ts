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
    findOne(@Body() mail: string, @Body() password: string) {
        const m = JSON.stringify(mail);
        const p = JSON.stringify(password);
        console.log(password);
        try{
            return this.chatService.getUser(m, p);
        } catch (error) {
            console.log(error);
        }
    }
}

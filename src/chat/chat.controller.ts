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

    @Put('/updateUserInfo')  //----------------------------------------------------------- ARREGLAR, NO LLEGAN LOS DATOS POR POSTMAN
    async updateUser(@Body() mail: string, name: string, lastname: string, filename: File){
        console.log(mail);
        return this.chatService.updateUserService(mail, name, lastname, filename);
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

    @Post('/showGroups')                            //----------------------------------------- probar esta funcionalidad (deberia traer el documento entero en los que el id del usuario esta dentro de "usersIn")
    async showGroups(@Body() userId: string){
        return this.chatService.showGroupsService(userId);
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
    
    @Get('/search/:name')  //--------------------------------------------------------------traer una lista de los usuarios que coincidan con el nomobre ingresado en el buscador
    async getContact(@Param() name: string){
        return this.chatService.getContactsByName(name);
    }
    
}
